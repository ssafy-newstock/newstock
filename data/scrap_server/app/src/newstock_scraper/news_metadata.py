import os
import json
import logging
import re
import time
from datetime import datetime, date, timedelta
from typing import List

import concurrent.futures
import pandas as pd
import requests
from bs4 import BeautifulSoup, Comment
from tqdm import tqdm
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from newstock_scraper.settings import Setting, S3Connection, LoggingConfig


URL = f"https://finance.daum.net/content/news"
DEFAULT_PER_PAGE = 100
DEFAULT_CATEGORY = "economy"
CURRENT_DATE= datetime.now().strftime("%Y%m%d")

# 로그 세팅
logger = LoggingConfig()
logger.setup_logging()


class StockNewsMetadataScraper:
    """
        종목 뉴스의 id, 키워드 등을 수집하여 Data Lake로 쓰이는 S3에 업로드
    """
    def __init__(self):
        # self.url = "https://finance.daum.net/content/news"
        # self.default_per_page = 100
        # self.default_category = "economy"
        self.session = None
        self.engine = None
        self.stock_info_df = None
        self.start_date = None
        self.end_date = None
        self.news_id_dict = {}
        self.current_datetime = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        self.bucket_name = 'newstock-stock-metadata'
    
    def set_session(self):
        # 우선 MySQL 엔진 연결
        setting = Setting()
        engine = setting.get_engine()
        Session = sessionmaker(bind=engine)
        session = Session()

        self.session = session
        self.engine = engine
        logging.info("Session Successfully Created")
    
    def _set_ranges(self, start_date, end_date):
        date_format = "%Y-%m-%d"  # Adjust format as needed

        # Convert string to datetime.date
        self.start_date = datetime.strptime(start_date, date_format).date()
        self.end_date = datetime.strptime(end_date, date_format).date()

    # 1.
    def load_stocknews_limit(self) -> None:
        # Fetch stock metadata with delisting = false
        sql = text("""SELECT
                        stock_code,
                        start_date,
                        end_date,
                        recent_news_id,
                        old_news_id,
                        last_searched_page
                     FROM stock_metadata
                     WHERE delisting = false""")
        result = self.session.execute(sql)
        
        # Fetch all rows and create a DataFrame
        rows = result.fetchall()
        columns = result.keys()  # Get column names from result
        self.stock_info_df = pd.DataFrame(rows, columns=columns)
    
    # 2.
    def fetch_news_for_all(self) -> None:
        stock_codes = self.stock_info_df['stock_code'].tolist()
        logging.info(len(stock_codes))
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            futures = {executor.submit(self.process_stock_code, stock_code): stock_code for stock_code in stock_codes}
            
            for future in tqdm(concurrent.futures.as_completed(futures), total=len(futures), desc="Processing"):
                stock_code = future.result()
                time.sleep(0.1)
    
    def process_stock_code(self, stock_code: str) -> str:
        self.get_news_list(stock_code)
        return stock_code
    
    def get_news_list(self, stock_code: str) -> None:
        # Extract row for the given stock_code
        df_row = self.stock_info_df[self.stock_info_df['stock_code'] == stock_code].squeeze()
        if self.can_scrap(df_row):
            current_page = df_row['last_searched_page']
            recent_news_id = df_row['recent_news_id']
            old_news_id = df_row['old_news_id']

            # 만약 지금 찾으려는 날짜가 db에 저장된 최신 데이터보다 크면
            date_format = "%Y%m%d"
            # 지금까지 수집한 것들 중 가장 최신 데이터의 날짜
            if not pd.isna(recent_news_id):
                recent_news_date = datetime.strptime(recent_news_id[:8], date_format).date()
            
            is_continued = True

            # db에 저장된 recent_id보다 더 최신의 데이터를 스크레이핑 하려 할 때
            if not pd.isna(recent_news_id) and self.end_date > recent_news_date :
                change_recent_id = False
                current_page = 1
                while is_continued:
                    
                    response = self.request_daum_stock(stock_code, current_page)

                    if response.status_code == 200:
                        response_json = response.json()
                        news_data = response_json.get('data', []) # 데이터 수집 결과
                        
                        if not news_data:
                            logging.info(f"No more news data available for {stock_code} on page {current_page}.")
                            break
                        
                        for news_item in news_data:
                            news_id = news_item['newsId'] # 수집된 뉴스 id
                            news_date = datetime.strptime(news_item['createdAt'], "%Y-%m-%d %H:%M:%S").date() # 수집된 뉴스 날짜
                            
                            # 수집한 날짜가 찾으려는 범위보다 오래 된 경우 => 종료
                            if news_date < self.end_date:
                                logging.info(f"Ending news search for {stock_code} as end_date exceeded.")
                                logging.info(f"my end_date : {self.end_date} / news_date : {news_date}.")
                                is_continued = False  # while문 종료
                                break # for문 종료

                            # 지금 데이터가 현재 수집하려고 시작하는 데이터보다 앞에 있는 데이터 => 무시
                            elif news_date > self.start_date:
                                continue

                            else:
                                # 만약 id를 바꾸지 않았다면 => 그걸로 갱신해준다.
                                if not change_recent_id and news_id > recent_news_id:
                                    change_recent_id = True
                                    recent_news_id = news_id
                                
                                # # 현재 수집하고 있는 news_id가 최근 뉴
                                # if recent_news_id <= news_id:
                                #     continue
                                if news_id in self.news_id_dict:
                                    self.news_id_dict[news_id]['stock_codes'].append(stock_code)
                                else:
                                    self.news_id_dict[news_id] = {
                                        'stock_codes': [stock_code],
                                        'keywords': news_item['keywords']
                                    }
                        
                        if is_continued:
                            current_page += 1
                    else:
                        logging.error(f"API request failed for {stock_code} with status code {response.status_code}.")
                        raise
                # recent만 갱신해준다.
                self.stock_info_df.loc[self.stock_info_df['stock_code'] == stock_code, 'recent_news_id'] = recent_news_id

            else:
                while is_continued:
                    response = self.request_daum_stock(stock_code, current_page)
                    if response.status_code == 200:
                        response_json = response.json()
                        news_data = response_json.get('data', [])
                        
                        if not news_data:
                            logging.info(f"No more news data available for {stock_code} on page {current_page}.")
                            break
                        
                        for news_item in news_data:
                            news_id = news_item['newsId']
                            news_date = datetime.strptime(news_item['createdAt'], "%Y-%m-%d %H:%M:%S").date()
                            
                            if news_date < self.end_date:
                                logging.info(f"Ending news search for {stock_code} as end_date exceeded.")
                                logging.info(f"my end_date : {self.end_date} / news_date : {news_date}.")

                                is_continued = False
                                break
                            elif news_date > self.start_date:
                                continue
                            else:
                                first_news_id = news_item['newsId']
                                if pd.isna(recent_news_id):
                                    recent_news_id = first_news_id
                                
                                if not pd.isna(old_news_id) and old_news_id <= news_id:
                                    continue
                                elif news_id in self.news_id_dict:
                                    self.news_id_dict[news_id]['stock_codes'].append(stock_code)
                                else:
                                    self.news_id_dict[news_id] = {
                                        'stock_codes': [stock_code],
                                        'keywords': news_item['keywords']
                                    }
                                old_news_id = news_id
                        
                        if is_continued:
                            current_page += 1
                    else:
                        logging.error(f"API request failed for {stock_code} with status code {response.status_code}.")
                        raise

                self.stock_info_df.loc[self.stock_info_df['stock_code'] == stock_code, 'recent_news_id'] = recent_news_id
                self.stock_info_df.loc[self.stock_info_df['stock_code'] == stock_code, 'old_news_id'] = old_news_id
                self.stock_info_df.loc[self.stock_info_df['stock_code'] == stock_code, 'last_searched_page'] = current_page
            logging.info(f"Completed news search for {stock_code}.")
        else:
            logging.info(f"{stock_code} cannot be scraped based on given criteria.")
    
    def can_scrap(self, df_row) -> bool:
        
        stock_start_date = df_row['start_date']
        stock_end_date = df_row['end_date']
        
        return self.start_date >= stock_start_date or stock_end_date <= self.end_date
    
    def request_daum_stock(self, stock_code: str, current_page: int) -> requests.Response:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
            "Referer": "https://finance.daum.net/"
        }
        params = {
            "page": current_page,
            "perPage": DEFAULT_PER_PAGE,
            "category": DEFAULT_CATEGORY,
            "searchType": "all",
            "keyword": 'A' + stock_code,
            "pagination": 'true'
        }
        
        response = requests.get(URL, headers=headers, params=params)
        return response
    
    def update_metadata(self):
        try:
            save_stmt = text("""
                UPDATE stock_metadata
                SET recent_news_id = :recent_news_id,
                    old_news_id = :old_news_id,
                    last_searched_page = :last_searched_page
                WHERE stock_code = :stock_code;
            """)

            # Prepare the data for bulk update
            data = [
                {
                    'recent_news_id': row['recent_news_id'],
                    'old_news_id': row['old_news_id'],
                    'last_searched_page': row['last_searched_page'],
                    'stock_code': row['stock_code']
                }
                for _, row in self.stock_info_df.iterrows()
            ]

            # Use `executemany()` to perform bulk updates
            self.session.execute(save_stmt, data)
            self.session.commit()

        except Exception as e:
            self.session.rollback()
            logging.error(f"Error updating metadata in the database: {e}")
            raise

        finally:
            self.session.close()

    def save_stock_news_metadata(self, with_s3=False):
        current_date = self.start_date
        end_date = self.end_date

        # 일자별로 뉴스 분리(key = 날짜, value = 뉴스들)
        news_by_date = {}

         # 각 뉴스의 날짜(키의 앞 8자리)를 기준으로 데이터를 분리
        for news_id, data in self.news_id_dict.items():
            news_date = news_id[:8]  # 키의 앞 8자리를 날짜로 사용 (예: '20240907')
            
            # 해당 날짜에 대한 데이터가 이미 있는지 확인하고 없으면 새로 생성
            if news_date not in news_by_date:
                news_by_date[news_date] = []

            # 날짜별로 뉴스를 추가
            news_by_date[news_date].append({
                'newsId': news_id,
                'stockCodes': data['stock_codes'],
                'keywords': data['keywords']
            })

        while current_date >= end_date:
            # Format the date as 'YYYYMMDD'
            date_str = current_date.strftime('%Y%m%d')
            
            total_dict = {
                'newsDate': date_str,
                'collectDate': self.current_datetime,
                'totalCnt': len(news_by_date[date_str]) if date_str in news_by_date else 0, # 없는 경우도 존재하므로
                'data': news_by_date.get(date_str, [])
            }

            
            logging.info(f"Date: {date_str}, data length: {total_dict['totalCnt']}")
            
            # Convert to JSON
            json_data = json.dumps(total_dict, ensure_ascii=False, indent=4)

            if with_s3:
                # S3 connection
                s3 = S3Connection()
                
                # S3 파일명 설정 (날짜별로 구분)
                s3_file_name = f'{date_str}.json'
                
                # S3에 업로드
                s3.upload_to_s3(json_data, self.bucket_name, s3_file_name)

                logging.info(f"{s3_file_name} 메타데이터 S3 저장 완료")

            else:
                # 로컬 저장 로직
                local_dir = f"data/tmp/{self.bucket_name}"
                
                # 폴더가 존재하지 않으면 생성
                os.makedirs(local_dir, exist_ok=True)

                # 로컬 파일명 설정 (날짜별로 구분)
                local_file_name = f'{date_str}.json'
                local_file_path = os.path.join(local_dir, local_file_name)
                
                # 로컬에 파일 저장
                with open(local_file_path, 'w', encoding='utf-8') as file:
                    file.write(json_data)

                logging.info(f"{local_file_name} 메타데이터 로컬 저장 완료")
            
                # Move to the next date
                current_date -= timedelta(days=1)

    # 한 번에 뉴스 메타데이터 다운로드하는 로직       
    def get_news_metadata(self, **kwargs):
        # Extract parameters from kwargs
        params = kwargs.get('params', {})
        start_date = params.get('start_date')
        end_date = params.get('end_date')
        
        
        # MySQL 메타데이터 연결 및 로드
        self.set_session() 
        self.load_stocknews_limit()

        # 날짜 설정
        self._set_ranges(start_date, end_date)
        logging.info("set_ranges")
        
        # 데이터 수집
        self.fetch_news_for_all()
        logging.info("fetch_news_for_all")

        # S3 저장
        self.save_stock_news_metadata()
        

        # MySQL에 메타데이터 저장
        self.update_metadata()
        logging.info("메타데이터 업데이트")

    

class IndustryNewsMetadataScraper:
    def __init__(self):
        self.url = "https://news.daum.net/breakingnews/economic/"
        self.subsection = ["finance", "industry", "employ", "autos", "stock", "estate", "consumer", "worldeconomy", "coin", "pension", "policy", "startup"]
        self.news_id_dict = {}
        self.news_id_set = set()
        self.current_datetime = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        self.stock_bucket_name = 'newstock-stock-metadata'
        self.industry_bucket_name = 'newstock-industry-metadata'
        self.start_date = None
        self.end_date = None
    
    def get_total_metadata_size(self, date: str) -> int:
        logging.info(f"Metadata size for date: {date}")
        total_count = 0

        # Loop through each section in subsection
        for section in self.subsection:
            # Check how many news IDs are stored for the section
            count = len(self.news_id_dict.get(section, []))
            total_count += count
            logging.info(f"Section: {section}, Count: {count}")
        
        logging.info(f"Total metadata count across all sections: {total_count}")
        return total_count
    
    # "date(2024-09-01)" => "20240901"
    def convert_date_to_str(self, date: datetime.date) -> str:
        return date.strftime("%Y%m%d")

    def _set_ranges(self, start_date, end_date):
        date_format = "%Y-%m-%d"  # Adjust format as needed

        # Convert string to datetime.date
        self.start_date = datetime.strptime(start_date, date_format).date()
        self.end_date = datetime.strptime(end_date, date_format).date()
    
    def load_stock_metadata(self, date: str, with_s3=False) -> None:
        """
        Load stock metadata either from S3 or from local directory based on the 'from_s3' flag.
        """
        if with_s3:
            # S3에서 로드하는 로직
            s3 = S3Connection()

            s3_file_name = f"{date}.json"
            content = s3.download_from_s3(self.stock_bucket_name, s3_file_name)
            content_data = json.loads(content)['data']
            
            logging.info(f"Loaded {len(content_data)} records from S3 for date {date}.")
        else:
            # 로컬에서 로드하는 로직
            local_dir = f"data/tmp/{self.stock_bucket_name}"
            local_file_path = os.path.join(local_dir, f"{date}.json")
            
            if not os.path.exists(local_file_path):
                logging.error(f"File {local_file_path} not found in local directory.")
                return

            # 로컬에서 JSON 파일 읽기
            with open(local_file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            content_data = json.loads(content)['data']
            logging.info(f"Loaded {len(content_data)} records from local storage for date {date}.")

        # 중복 체크를 위해 news_id_set에 저장
        self.news_id_set = set([data['newsId'] for data in content_data])
        logging.info(f"Total unique news IDs loaded: {len(self.news_id_set)}")
    
    def request_daum_news(self, url: str, date: str, params: dict) -> requests.Response:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
            "Referer": "https://finance.daum.net/"
        }
        
        response = requests.get(url, headers=headers, params=params)
        return response
    
    # 데이터가 아예 없는 경우도 있음(코인 등)
    def check_empty_page(self, soup):
        none_tag = soup.find('p', {'class': 'txt_none'})
        
        return none_tag != None

    def check_same_page(self, req_page, soup, section):
        # 현재 parsing상 페이지
        page_tag = soup.find('em', {'class': 'num_page'})
        if page_tag:
            # <em> 태그의 모든 텍스트를 가져오고, 공백을 제거
            text = page_tag.get_text(strip=True)
            
            # 숫자만 추출하기 위해 정규 표현식 사용
            match = re.search(r'\d+', text)
            
            if match:
                # 추출된 숫자 문자열을 정수로 변환하여 반환
                now_page = int(match.group())
                return req_page == now_page
            
            else:
                logging.info(f"{section} 페이지 번호를 추출할 수 없습니다.")
                return False
        else:
            logging.info(f"{section} 지정된 <em> 태그를 찾을 수 없습니다.")
            return False
    
    # 기존에 주식 뉴스 기사랑 새롭게 수집하려는 산업 기사랑 겹치는지 확인
    def compare_metadata(self, soup, section: str)-> None:
        # list_allnews라는 이름을 가진 ul에서 모든 li를 찾음
        list_items = soup.find('ul', {'class': 'list_allnews'}).find_all('li')
        
        for item in list_items:
            # 링크 추출
            link_tag = item.find('a', {'class': 'link_txt'})
            
            # 만약 link_tag가 없거나 'href' 속성이 없으면 건너뜀
            if not link_tag or 'href' not in link_tag.attrs:
                continue

            news_id = link_tag['href'].split('/')[-1]

            # 만약 그 id가 이미 존재하다면
            if news_id in self.news_id_set:
                continue
            
            # 존재하지 않는 경우만 넣음
            self.news_id_dict[section].append(news_id)
            
    def scraping_news_metadata(self, url: str, params: dict, section: str) -> bool:
    # URL에 요청을 보냄
        response = self.request_daum_news(url, date, params)

        # 응답 상태 코드가 200일 때 처리
        if response.status_code == 200:
            # 응답의 콘텐츠 타입 확인
            content_type = response.headers.get('Content-Type')
            

            # HTML 데이터일 경우
            if 'text/html' in content_type or 'application/xhtml+xml' in content_type:
                # 인코딩을 EUC-KR로 지정 (필요한 경우에만)
                # response.encoding = 'euc-kr'
                html_data = response.text

                # BeautifulSoup 객체로 변환
                soup = BeautifulSoup(html_data, 'html.parser')

                # 만약 페이지에 아무것도 없다면
                if self.check_empty_page(soup):
                    logging.info(f"{section}페이지는 정보가 없습니다")
                    return False
                
                # 만약 페이지 한계에 다다랐을 경우
                if not self.check_same_page(params['page'], soup, section):
                    logging.info(f"{section} 마지막 페이지 도달")
                    return False

                # 기존에 이미 있나 확인
                self.compare_metadata(soup, section)

                return True
            
            # 그 외 다른 바이너리 데이터일 경우
            else:
                logging.error("Unknown content type or binary data received")
                raise
        else:
            logging.error("Error: ", response.status_code)
            raise
        
    # 함수: 특정 섹션의 모든 페이지를 크롤링하는 함수
    def crawl_section(self, section, now_date):
        page = 1
        # result_lists = []
        
        while True:
            url = self.url + section
            params = {
                "page": page,
                "regDate": now_date,
            }
            can_scrap = self.scraping_news_metadata(url, params, section)
            
            # 더 이상 진행하기 힘들 경우 그만하기!
            if not can_scrap:
                break;
            
            page += 1
            
            if page % 31 == 0:
                time.sleep(5)
    
    # 멀티스레딩으로 각 section별. 날짜별 크롤링
    def fetch_news_for_industry(self, now_date: str):
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            future_to_section = {executor.submit(self.crawl_section, section, now_date): section for section in self.subsection}
            
            while future_to_section:
                # 완료된 작업들을 확인하고 결과 처리
                for future in concurrent.futures.as_completed(future_to_section):
                    section = future_to_section.pop(future)
                    try:
                        future.result()

                    except Exception as e:
                        logging.error(f"{section} 크롤링 중 오류 발생: {e}")
                        raise
    # 저장하기
    def save_industry_news_metadata(self, news_date: str, with_s3 = False):
        # 우선 총 개수 계산하기
        total_count = self.get_total_metadata_size(news_date)

        # JSON 데이터로 변환할 dict 생성
        total_dict = {
            'newsDate': news_date,
            'collectDate': self.current_datetime,
            'totalCnt': total_count,
            'data': self.news_id_dict
        }

        # JSON 데이터로 변환
        json_data = json.dumps(total_dict, ensure_ascii=False, indent=4)

        # 파일명을 날짜별로 구분하여 설정
        s3_file_name = f'{news_date}.json'
        local_file_name = f'{news_date}.json'

        if with_s3:
            # s3 connection
            s3 = S3Connection()
            
            # S3에 업로드
            s3.upload_to_s3(json_data, self.industry_bucket_name, s3_file_name)
            logging.info(f"{s3_file_name} uploaded to S3 bucket {self.industry_bucket_name}.")
        else:
            # 로컬에 저장
            local_dir = f"data/tmp/{self.industry_bucket_name}"
            os.makedirs(local_dir, exist_ok=True)  # 폴더가 없으면 생성
            
            local_file_path = os.path.join(local_dir, local_file_name)
            
            with open(local_file_path, 'w', encoding='utf-8') as file:
                file.write(json_data)
            
            logging.info(f"{local_file_name} saved locally to {local_file_path}.")

    def get_industry_news_metadata(self, **kwargs):

        params = kwargs.get('params', {})
        start_date = params.get('start_date')
        end_date = params.get('end_date')
        
        scraper = IndustryNewsMetadataScraper()
        # start_date부터 end_date까지 모두 순회하면서
        scraper._set_ranges(start_date, end_date)

        
        pivot_date = scraper.start_date
        while pivot_date >= scraper.end_date:
            logging.info(f"{pivot_date} 수집 시작")
            date = scraper.convert_date_to_str(pivot_date)
            # s3에서 메타데이터 가져와서 self.news_id_set 매번 초기화
            scraper.load_stock_metadata(date)
            
            # 여기서부터 다음 뉴스 스크레이핑을 section별로 진행한다.
            # 매번 id_dict 초기화
            scraper.news_id_dict = {section: [] for section in scraper.subsection} # Key : 산업, Value : 해당 산업에 대한 news_id
            
            # 멀티스레딩으로 메타데이터데이터 수집
            scraper.fetch_news_for_industry(date)
            
            # 수집이 끝났으면 데이터 저장
            scraper.save_industry_news_metadata(date)
            
            
            # Decrement the current_date by one day
            pivot_date -= timedelta(days=1)
            
        logging.info(f"metadata save from {start_date} to {end_date} completed!")
        