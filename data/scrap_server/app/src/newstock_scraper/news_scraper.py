import os
from bs4 import BeautifulSoup
from tqdm import tqdm
from datetime import datetime
import json
import logging
import time
from datetime import datetime, timedelta
from typing import List

import concurrent.futures
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

from newstock_scraper.utils import convert_date_to_str, set_ranges
from newstock_scraper.settings import S3Connection, LoggingConfig


class NewsScraper:
    def __init__(self):
        self.get_stock = False
        self.current_datetime = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        self.stock_news_bucket_name = "newstock-stock-news"
        self.industry_news_bucket_name = "newstock-industry-news"
        self.stock_metadata_bucket_name = 'newstock-stock-metadata'
        self.industry_metadata_bucket_name = 'newstock-industry-metadata'
        self.stock_news_id_dict = dict()
        self.stock_news_all = list() # 실제 저장될 데이터
        self.industry_news_id_dict = dict()
        self.start_date = ""
        self.end_date = ""

    @staticmethod
    def clear_tmp_folder():
        """Delete all files in the 'data/tmp' directory."""
        tmp_dir = 'data/tmp'
        if os.path.exists(tmp_dir):
            for file_name in os.listdir(tmp_dir):
                file_path = os.path.join(tmp_dir, file_name)
                if os.path.isfile(file_path):
                    os.remove(file_path)
            logging.info(f"Deleted all files in '{tmp_dir}'.")
    
    # s3 또는 로컬에서 시황 뉴스 메타데이터 가져옴
    def load_stock_news_id(self, date, with_s3=False):
        """
        Load stock news IDs either from S3 or from local directory based on the 'with_s3' flag.
        """
        if with_s3:
            # Load from S3
            s3 = S3Connection()

            s3_file_name = f"{date}.json"
            content = s3.download_from_s3(self.stock_metadata_bucket_name, s3_file_name)
            self.stock_news_id_dict = json.loads(content)['data']

            logging.info(f"Loaded {len(self.stock_news_id_dict)} records from S3 for date {date}.")
        
        else:
            # Load from local directory
            local_dir = f"data/tmp/{self.stock_metadata_bucket_name}"
            local_file_path = os.path.join(local_dir, f"{date}.json")
            
            if not os.path.exists(local_file_path):
                logging.error(f"File {local_file_path} not found in local directory.")
                return

            with open(local_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            self.stock_news_id_dict = json.loads(content)['data']
            logging.info(f"Loaded {len(self.stock_news_id_dict)} records from local storage for date {date}.")

    def load_industry_news_id(self, date, with_s3=False):
        """
        Load industry news IDs either from S3 or from local directory based on the 'with_s3' flag.
        """
        if with_s3:
            # Load from S3
            s3 = S3Connection()

            s3_file_name = f"{date}.json"
            content = s3.download_from_s3(self.industry_metadata_bucket_name, s3_file_name)
            temp = json.loads(content)['data']

            stock_news_all = []
            # 각 카테고리에 대해 'industry'와 'newsId'로 구성된 딕셔너리 생성
            for category, ids in temp.items():
                for item in ids:
                    news_dict = {"newsId": item, "industry": category}
                    stock_news_all.append(news_dict)

            self.stock_news_id_dict = stock_news_all
            logging.info(f"Loaded {len(stock_news_all)} records from S3 for date {date}.")
        
        else:
            # Load from local directory
            local_dir = f"data/tmp/{self.industry_metadata_bucket_name}"
            local_file_path = os.path.join(local_dir, f"{date}.json")
            
            if not os.path.exists(local_file_path):
                logging.error(f"File {local_file_path} not found in local directory.")
                return

            with open(local_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            temp = json.loads(content)['data']

            stock_news_all = []
            # 각 카테고리에 대해 'industry'와 'newsId'로 구성된 딕셔너리 생성
            for category, ids in temp.items():
                for item in ids:
                    news_dict = {"newsId": item, "industry": category}
                    stock_news_all.append(news_dict)

            self.stock_news_id_dict = stock_news_all
            logging.info(f"Loaded {len(stock_news_all)} records from local storage for date {date}.")

    def _set_ranges(self, start_date, end_date):
        date_format = "%Y-%m-%d"  # Adjust format as needed

        # Convert string to datetime.date
        self.start_date = datetime.strptime(start_date, date_format).date()
        self.end_date = datetime.strptime(end_date, date_format).date()
    # 다음 url로 바꿔주기

    def convet_to_url(self, news_id):
        return f"https://v.daum.net/v/{news_id}"
    
    # scraper
    def scrap_article(self, url):
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            article_info_dict = {
                        "title": "",
                        "subtitle" : "",
                        "media" : "",
                        "description" : "",
                        "thumbnail" : "" ,
                        "uploadDatetime" : "",
                        "article" : "",
                        }

            # 제목 수집
            title_view = soup.find('h3', {'class': 'tit_view'})
            if title_view:
                title_full_text = title_view.get_text(separator='\n', strip=True)
                article_info_dict['title'] = title_full_text
                
            # 부제목 수집
            subtitle_view = soup.find('strong', {'class': 'summary_view'})
            if subtitle_view:
                subtitle_full_text = subtitle_view.get_text(separator='\n', strip=True)
                article_info_dict['subtitle'] = subtitle_full_text

            # 언론사명 수집
            media_view = soup.find('a', {'id': 'kakaoServiceLogo'})
            if media_view:
                media_full_text = media_view.get_text(separator='\n', strip=True)
                article_info_dict['media'] = media_full_text

            # 게시 시간 수집
            upload_datetime_view = soup.find('span', {'class': 'num_date'})
            if upload_datetime_view:
                dt = upload_datetime_view.get_text(separator='\n', strip=True)
                upload_datetime_full_text = datetime.strptime(dt, "%Y. %m. %d. %H:%M").strftime("%Y-%m-%d %H:%M:%S")
                article_info_dict['uploadDatetime'] = upload_datetime_full_text
                        
            # 기사 본문 수집
            article_content = []
            description_content = []

            article_view = soup.find('div', {'class': 'article_view'})

            if article_view:
                # p 태그와 img 태그만 처리
                for tag in article_view.find_all(['p', 'img']):
                    if tag.name == 'p':
                        # p 태그의 텍스트를 수집
                        article_content.append(tag.get_text(separator='\n', strip=True))
                        description_content.append(article_content[-1])
                    elif tag.name == 'img':
                        # img 태그의 링크와 캡션을 수집
                        img_link = tag.get('src', '')
                        if img_link:
                            
                            # 썸네일 수집
                            if len(article_info_dict['thumbnail']) == 0:
                                thumbnail_full_text = img_link
                                article_info_dict['thumbnail'] = thumbnail_full_text
                                
                            # 이미지 custom tag 씌우기
                            img_link = f"<ImageTag>{img_link}</ImageTag>"
                            
                            # 이미지 설명
                            img_caption = tag.get('alt', '')
                            if img_caption:
                                img_link += '\n' + img_caption
                            article_content.append(img_link)

                            
                        
                article_full_text = "\n\n".join(article_content).strip()
                article_info_dict['article'] = article_full_text
                
                # description 수집
                description_full_text = "".join(description_content).strip()[:95]
                article_info_dict['description'] = description_full_text
                
                return article_info_dict
        else:
            logging.error(f"Failed to load {url}")
            raise
        
    # 멀티스레딩으로 뉴스 수집
    def scrape_news_multithread(self):
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            
            # stock_news_id_dict에서 뉴스 ID들을 가져와 멀티스레딩으로 처리
            future_to_news_id = {
                executor.submit(self.scrap_article, self.convet_to_url(news_info['newsId'])): news_info['newsId'] 
                for news_info in self.stock_news_id_dict
            }

            logging.info(f"수집데이터 : {len(future_to_news_id)}")
            
            for future in tqdm(concurrent.futures.as_completed(future_to_news_id), total=len(self.stock_news_id_dict)):
                news_id = future_to_news_id[future]
                try:
                    article_info_dict = future.result()
                    if article_info_dict:
                        # stock_news_id_dict에서 해당 뉴스 ID에 대한 추가 정보를 가져옴
                        news_info = next((item for item in self.stock_news_id_dict if item['newsId'] == news_id), None)
                        if news_info:
                            article_info_dict['newsId'] = news_id
                            # 만약 주식 뉴스를 수집한다면
                            if self.get_stock:
                                article_info_dict['stockCodes'] = news_info['stockCodes']
                                article_info_dict['keywords'] = news_info['keywords']
                            else:
                                article_info_dict['industry'] = news_info['industry']
                                
                        
                        # 수집된 기사 정보를 저장
                        self.stock_news_all.append(article_info_dict)
                        time.sleep(0.1)
                except Exception as e:
                    logging.error(f"Error handling news ID {news_id}: {e}")
                    raise

    
    # 저장하기
    def save_news(self, news_date: str):
        # 우선 총 개수 계산하기
        total_count = len(self.stock_news_all)
        
        total_dict = {
            'newsDate': news_date,
            'collectDate': self.current_datetime,
            'totalCnt': total_count,
            'data': self.stock_news_all
        }

        # JSON 데이터로 변환
        json_data = json.dumps(total_dict, ensure_ascii=False, indent=4)

        # 버킷 이름 설정
        bucket_name = ""
        if self.get_stock:
            bucket_name = self.stock_news_bucket_name
        else:
            bucket_name = self.industry_news_bucket_name

        # 로컬에 저장 우선 먼저 한다.
        local_dir = f"data/news/{bucket_name}"
        os.makedirs(local_dir, exist_ok=True)

        local_file_path = os.path.join(local_dir, f"{news_date}.json")
        
        with open(local_file_path, 'w', encoding='utf-8') as file:
            file.write(json_data)
        logging.info(f"Saved data locally in '{local_file_path}'.")

        # S3에 업로드
        s3 = S3Connection()
        
        s3_file_name = f'{news_date}.json'

        s3.upload_to_s3(json_data, bucket_name, s3_file_name)
        logging.info(f"Uploaded data to S3 bucket '{bucket_name}' with file name '{s3_file_name}'.")


    def get_news_article(self, get_stock, **kwargs):
        
        # 우선 종목 뉴스를 수집하는지 시황 뉴스를 수집하는지 확인
        self.get_stock = get_stock

        params = kwargs.get('params', {})
        start_date = params.get('start_date')
        end_date = params.get('end_date')
        

        self.start_date, self.end_date = set_ranges(start_date, end_date)
            
        pivot_date = self.start_date

        while pivot_date >= self.end_date:
            date = convert_date_to_str(pivot_date)
            # 만약 종목 뉴스를 수집한다면
            if self.get_stock:    
                self.load_stock_news_id(date)  # s3에서 뉴스 ID 수집
            
             # 시황 뉴스를 수집한다면
            else:
                self.load_industry_news_id(date)  # s3에서 뉴스 ID 수집
                
            self.stock_news_all = list()  # 매번 초기화
            # TODO : 여기 시황 뉴스 네이밍 바꾸기
            # 멀티스레딩으로 뉴스 데이터 수집
            self.scrape_news_multithread()
            
            # S3에 뉴스 저장
            self.save_news(date)
            
            pivot_date -= timedelta(days=1)

        if self.get_stock:
            logging.info(f"Stock news articles saved from {start_date} to {end_date}!")
        
        else:
            logging.info(f"Industry news articles saved from {start_date} to {end_date}!")
        
        # 임시 파일 삭제
        # NewsScraper.clear_tmp_folder()