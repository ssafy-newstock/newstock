# 우선 데이터를 수집해보자
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
from newstock_scraper.settings import S3Connection

# 로그 설정
logging.basicConfig(
    level=logging.INFO,  # 로그 레벨을 INFO로 설정
    format="%(asctime)s - %(levelname)s - %(message)s",  # 로그 출력 포맷
    handlers=[
        logging.StreamHandler()  # 콘솔에 로그를 출력하기 위한 핸들러
    ]
)

class StockNewsScraper:
    def __init__(self):
        self.current_datetime = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        self.stock_news_bucket_name = "newstock-stock-news"
        self.stock_metadata_bucket_name = 'newstock-stock-metadata'
        self.stock_news_id_dict = dict()
        self.stock_news_all = list() # 실제 저장될 데이터
        self.start_date = ""
        self.end_date = ""
    
    # s3에서 주식 관련 뉴스 수집함
    def load_stock_news_id(self, date):
        s3 = S3Connection()
        s3.connect_to_s3()

        s3_file_name = f"{date}.json"
        content = s3.download_from_s3(self.stock_metadata_bucket_name, s3_file_name)
        self.stock_news_id_dict = json.loads(content)['data']
    
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
            
            for future in tqdm(concurrent.futures.as_completed(future_to_news_id), total=len(self.stock_news_id_dict)):
                news_id = future_to_news_id[future]
                try:
                    article_info_dict = future.result()
                    if article_info_dict:
                        # stock_news_id_dict에서 해당 뉴스 ID에 대한 추가 정보를 가져옴
                        news_info = next((item for item in self.stock_news_id_dict if item['newsId'] == news_id), None)
                        if news_info:
                            article_info_dict['stockId'] = news_id
                            article_info_dict['stockCodes'] = news_info['stockCodes']
                            article_info_dict['keywords'] = news_info['keywords']
                        
                        # 수집된 기사 정보를 저장
                        self.stock_news_all.append(article_info_dict)
                        time.sleep(0.1)
                except Exception as e:
                    logging.error(f"Error handling news ID {news_id}: {e}")
                    raise

    
    # 저장하기
    def save_stocknews(self, news_date: str):
        # 우선 총 개수 계산하기
        total_count = len(self.stock_news_all)
        
        # s3 connection
        s3 = S3Connection()
        s3.connect_to_s3()
        
        total_dict = {
            'newsDate' : news_date,
            'collectDate': self.current_datetime,
            'totalCnt': total_count,
            'data': self.stock_news_all 
        }

        # JSON 데이터로 변환
        json_data = json.dumps(total_dict, ensure_ascii=False, indent=4)

        # S3 파일명 설정 (날짜별로 구분)
        s3_file_name = f'{news_date}.json'
        
        # S3에 업로드
        s3.upload_to_s3(json_data, self.stock_news_bucket_name, s3_file_name)
    
    def get_news_article(self, **kwargs):
        params = kwargs.get('params', {})
        start_date = params.get('start_date')
        end_date = params.get('end_date')
        
        scraper = StockNewsScraper()

        scraper.start_date, scraper.end_date = set_ranges(start_date, end_date)
            
        pivot_date = scraper.start_date
        
        while pivot_date >= scraper.end_date:
            date = convert_date_to_str(pivot_date)
            scraper.load_stock_news_id(date)  # s3에서 뉴스 ID 수집
            
            scraper.stock_news_all = list()  # 매번 초기화
            
            # 멀티스레딩으로 뉴스 데이터 수집
            scraper.scrape_news_multithread()
            # 데이터 저장
            scraper.save_stocknews(date)
            
            pivot_date -= timedelta(days=1)
            
        logging.info(f"News articles saved from {start_date} to {end_date}!")
        
        