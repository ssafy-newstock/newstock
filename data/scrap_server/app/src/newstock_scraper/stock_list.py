from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import logging
import requests
import pandas as pd
from datetime import datetime, timedelta
from io import StringIO
import base64
from newstock_scraper.settings import Setting, LoggingConfig

# 로그 세팅
logger = LoggingConfig()
logger.setup_logging()

class StockListScraper:
    def __init__(self) -> None:
        self.headers = {
            'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        }

    def get_yesterday_date(self):
        yesterday = datetime.now() - timedelta(1)
        date_str = yesterday.strftime('%Y%m%d')
        return date_str

    def fetch_otp(self, trdDd):
        logging.info(f"Fetching OTP for date: {trdDd}")
        otp_url = "https://data.krx.co.kr/comm/fileDn/GenerateOTP/generate.cmd"
        
        otp_form_data = {
            'locale': 'ko_KR',
            'mktId': 'STK',
            'trdDd': trdDd,
            'money': '1',
            'csvxls_isNo': 'false',
            'name': 'fileDown',
            'url': 'dbms/MDC/STAT/standard/MDCSTAT03901'
        }
        response = requests.post(otp_url, headers=self.headers, data=otp_form_data)
        response.raise_for_status()
        otp_encoded = base64.b64encode(response.content).decode('utf-8')
        logging.info("OTP fetched successfully.")
        return otp_encoded

    def download_and_save_to_db(self, trdDd, otp_encoded):
        # Download CSV
        logging.info("Downloading CSV file using OTP.")
        otp = base64.b64decode(otp_encoded)
        csv_url = 'http://data.krx.co.kr/comm/fileDn/download_csv/download.cmd'
        response = requests.post(csv_url, headers=self.headers, params={'code': otp})
        response.raise_for_status()
        response.encoding = 'EUC-KR'
        csv_data = response.text

        logging.info("Converting CSV data to DataFrame.")
        csv_buffer = StringIO(csv_data)
        df = pd.read_csv(csv_buffer)

        df.rename(columns={
            "종목코드": "stock_code",
            "종목명": "stock_name",
            "시장구분": "market",
            "업종명": "industry",
            "종가": "close_price",
            "대비": "price_change",
            "등락률": "price_change_percent",
            "시가총액": "market_capitalization"
        }, inplace=True)

        # Convert NaN values to None
        df = df.replace({float('nan'): None})

        # Save DataFrame to MySQL database
        logging.info("Saving DataFrame to MySQL database.")

        # 우선 MySQL 엔진 연결
        setting = Setting()
        engine = setting.get_engine()
        Session = sessionmaker(bind=engine)
        session = Session()
        
        try:
            existing_stock_codes = set(
                row[0] for row in session.execute(
                    text("SELECT stock_code FROM stock_metadata WHERE delisting = FALSE")
                ).fetchall()
            )
            
            # Convert DataFrame stock_code to set for comparison
            df_stock_codes = set(df['stock_code'])
            
            # Calculate the updates, inserts, and deletes
            to_update = df[df['stock_code'].isin(existing_stock_codes)]
            to_insert = df[~df['stock_code'].isin(existing_stock_codes)]
            to_delete = existing_stock_codes - df_stock_codes
            
            logging.info(f"현재 DB에 존재하는 개수 : {len(existing_stock_codes)}")
            logging.info(f"현재 update 대상 : {len(to_update)}")
            logging.info(f"현재 insert 대상 : {len(to_insert)}")
            logging.info(f"존재하는 코드 : {existing_stock_codes}")
            logging.info(f"삭제될 코드 : {to_delete}")
            logging.info(f"현재 delete 대상 : {len(to_delete)}")
            
            if not to_update.empty:
                update_stmt = text("""
                    UPDATE stock_metadata
                    SET stock_name = :stock_name,
                        market = :market,
                        industry = :industry,
                        close_price = :close_price,
                        price_change = :price_change,
                        price_change_percent = :price_change_percent,
                        market_capitalization = :market_capitalization,
                        delisting = FALSE
                    WHERE stock_code = :stock_code
                """)
                for _, row in to_update.iterrows():
                    session.execute(
                        update_stmt,
                        {
                            'stock_code': row['stock_code'],
                            'stock_name': row['stock_name'],
                            'market': row['market'],
                            'industry': row['industry'],
                            'close_price': row['close_price'],
                            'price_change': row['price_change'],
                            'price_change_percent': row['price_change_percent'],
                            'market_capitalization': row['market_capitalization'],
                        }
                    )

            if not to_insert.empty:
                to_insert_stmt = text("""
                    INSERT INTO stock_metadata (
                        stock_code, stock_name, market, industry, 
                        close_price, price_change, price_change_percent, 
                        market_capitalization, created_date, delisting
                    )
                    VALUES (
                        :stock_code, :stock_name, :market, :industry, 
                        :close_price, :price_change, :price_change_percent, 
                        :market_capitalization, :created_date, :delisting
                    )
                """)
                to_insert_records = [
                    {
                        'stock_code': row['stock_code'],
                        'stock_name': row['stock_name'],
                        'market': row['market'],
                        'industry': row['industry'],
                        'close_price': row['close_price'],
                        'price_change': row['price_change'],
                        'price_change_percent': row['price_change_percent'],
                        'market_capitalization': row['market_capitalization'],
                        'created_date': datetime.now(),
                        'delisting': False
                    } for _, row in to_insert.iterrows()
                ]
                session.execute(to_insert_stmt, to_insert_records)

            if to_delete:
                delisting_stmt = text("""
                    UPDATE stock_metadata
                    SET delisting = TRUE
                    WHERE stock_code IN :stock_codes
                    AND delisting = FALSE
                """)
                session.execute(
                    delisting_stmt,
                    {'stock_codes': tuple(to_delete)}
                )

            session.commit()
            logging.info("Data saved successfully to the database.")

        except Exception as e:
            session.rollback()
            logging.error(f"Error saving data to the database: {e}")
            raise

        finally:
            session.close()

    def get_stock_list(self):

        # Get yesterday's date
        trdDd = self.get_yesterday_date()
        logging.info(f"Obtained date: {trdDd}")

        # Fetch OTP
        otp_encoded = self.fetch_otp(trdDd)
        logging.info("OTP fetched.")

        # Download and save data to DB
        self.download_and_save_to_db(trdDd, otp_encoded)
        logging.info("Data processing completed successfully.")
