# stock list가 있어야 다음 scraper 실행
import requests
import pandas as pd
import time
import concurrent.futures
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from tqdm import tqdm
from newstock_scraper.settings import Setting, LoggingConfig

# 로그 세팅

logger = LoggingConfig()
logger.setup_logging()

URL = f"https://finance.daum.net/content/news"
DEFAULT_PER_PAGE = 100
DEFAULT_CATEGORY = "economy"
CURRENT_DATE= datetime.now().strftime("%Y%m%d")


class StockNewsLimitScraper:
    def __init__(self):
        self.session = None
        self.engine = None
        self.stock_info_df = None
        self.set_session()
    
    # 0.
    def set_session(self):
        # 우선 MySQL 엔진 연결
        setting = Setting()
        engine = setting.get_engine()
        Session = sessionmaker(bind=engine)
        session = Session()

        self.session = session
        self.engine = engine
        logging.info("Session Successfully Created")
    
    # 1.
    def load_stock_code(self) -> None:
        # Fetch stock metadata with delisting = false
        try:
            sql = text("""SELECT stock_code
                        FROM stock_metadata
                        WHERE delisting = false;""")
            with self.engine.connect() as connection:
                result = connection.execute(sql)
                rows = [r[0] for r in result.fetchall()]
            
                return rows
        except:
            logging.error("stock code load failed")
            raise

    # start_date를 기준으로 start_date가 null값이 하나라도 존재하면 false 반환!
    def check_limit_exist(self) -> bool:
        sql = text("""
                    SELECT 
                    CASE 
                        WHEN COUNT(*) >= 1 THEN false 
                        ELSE true
                    END AS result
                    FROM stock_metadata
                    WHERE delisting = false
                    AND start_date IS NULL;""")    
        with self.engine.connect() as connection:
            result = connection.execute(sql).fetchone()[0]  # 한 행을 가져옴
            return result

    def set_stock_info_df(self, row):
        # 해당 뉴스가 어느 범위까지 수집할 수 있는지 요청하는 코드!
        stock_info_df = pd.DataFrame(columns=['stock_code', 'start_date', 'end_date', 'recent_news_id', 'old_news_id', 'last_searched_page'])

        # 기존 데이터프레임의 '종목코드'를 새로운 데이터프레임의 'stock_code'로 옮기기
        stock_info_df['stock_code'] = row
        stock_info_df['last_searched_page'] = 1

        self.stock_info_df = stock_info_df
        
    def set_all_date(self, stock_code, start_page):
        response_start = self.request_daum_stock(stock_code, start_page).json()
        # total page 가져오기
        end_page = response_start['totalPages']
        
        # 추출한 total page 가지고 끝 페이지 탐색
        response_end = self.request_daum_stock(stock_code, end_page).json()
        
        start_date_str = ""
        end_date_str = ""

        # 데이터가 100개가 초과되면 다른페이지로 넘어가므로
        if start_page != end_page:
            start_date_str = response_start['data'][0]['createdAt']
            end_date_str = response_end['data'][0]['createdAt']
        
        # 응답 데이터가 100개 이하여서 1페이지만 응답받을 수 있음
        else:
            start_date_str = response_start['data'][0]['createdAt']
            end_date_str = response_end['data'][-1]['createdAt']

        
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d %H:%M:%S").date()
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d %H:%M:%S").date()
        
        return start_date, end_date
    
    def request_daum_stock(self, stock_code, current_page):
        
        headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
        "Referer": "https://finance.daum.net/"

        }
        params = {
            "page": current_page,
            "perPage" : DEFAULT_PER_PAGE,
            "category" : DEFAULT_CATEGORY,
            "searchType": "all",
            "keyword": stock_code,
            "pagination": 'true'
        }
        

        response = requests.get(URL, headers=headers, params=params)
        return response
    
    def process_stock_code(self, index, stock_code):
        start_date, end_date = self.set_all_date(stock_code, 1)
        return index, start_date, end_date
    
    def get_stocknews_limit(self):
        # ThreadPoolExecutor를 사용하여 병렬 처리
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            # 작업을 제출하고 진행 상황을 tqdm으로 모니터링
            futures = {executor.submit(self.process_stock_code, idx, 'A' + str(row['stock_code'])): idx for idx, row in self.stock_info_df.iterrows()}
            for future in tqdm(concurrent.futures.as_completed(futures), total=len(futures), desc="Processing"):
                index, start_date, end_date = future.result()
                self.stock_info_df.at[index, 'start_date'] = start_date
                self.stock_info_df.at[index, 'end_date'] = end_date
                
                # 혹시 모를 과열을 위해서 이렇게 해놓자
                time.sleep(0.1)    
    
    def save_data(self):
        try:
            save_stmt = text("""
                UPDATE stock_metadata
                SET start_date = :start_date,
                    end_date = :end_date,
                    last_searched_page = :last_searched_page
                WHERE stock_code = :stock_code;
            """)

            # Prepare the data for bulk update
            data = [
                {
                    'start_date': row['start_date'],
                    'end_date': row['end_date'],
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
            logging.error(f"Error saving data to the database: {e}")
            raise

        finally:
            self.session.close()

    def get_news_limit(self):

        # stock code 데이터 불러오기
        rows = self.load_stock_code()
        # stock info df 설정
        self.set_stock_info_df(rows)
        # 데이터 수집
        self.get_stocknews_limit()
        # db에 저장
        self.save_data()

        logging.info("Getting Stock Limit date completed successfully.")
            
