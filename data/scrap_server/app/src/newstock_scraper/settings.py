# TODO : 클래스명 등 리팩토링 진행하기

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import boto3
import logging

# .env 파일을 로드합니다.
load_dotenv()

# 환경 변수를 가져옵니다.
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DATABASE = os.getenv('MYSQL_DATABASE')
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_PORT = os.getenv('MYSQL_PORT')

# SQLAlchemy 엔진을 위한 URL 설정
DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"

class Setting:
    def __init__(self):
        self.engine = create_engine(DATABASE_URL)

    def get_engine(self):
        return self.engine

    # 테이블이 존재하는지 확인하는 함수
    def is_table_exist(self, table_name: str) -> None:
        check_table_sql = text(f"""
            SELECT 
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM INFORMATION_SCHEMA.TABLES 
                        WHERE TABLE_SCHEMA = '{MYSQL_DATABASE}' 
                        AND TABLE_NAME = '{table_name}'
                    ) 
                    THEN TRUE 
                    ELSE FALSE 
                END AS table_exists;
        """)

        with self.engine.connect() as connection:
            result = connection.execute(check_table_sql).scalar()
            return bool(result)

    def create_metadata_table(self, table_name: str) -> bool:
        # SQL to create 'stock_metadata' table if it doesn't exist
        create_table_sql = text(f"""
            CREATE TABLE IF NOT EXISTS {table_name}(
                stock_code VARCHAR(20) NOT NULL PRIMARY KEY,
                stock_name VARCHAR(255) NOT NULL,
                market VARCHAR(50),
                industry VARCHAR(100),
                close_price INT,
                price_change INT,
                price_change_percent FLOAT,
                market_capitalization BIGINT,
                start_date DATE,
                end_date DATE,
                recent_news_id CHAR(17),
                old_news_id CHAR(17),
                last_searched_page INT,
                created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                delisting BOOLEAN DEFAULT FALSE
            );
        """)

        try:
            # Execute the SQL statement
            with self.engine.connect() as connection:
                connection.execute(create_table_sql)
            return True  # 성공하면 True 반환
        except Exception as e:
            print(f"Error creating table {table_name}: {e}")
            return False  # 실패하면 False 반환

class S3Connection:
    def __init__(self):
        self.connection = self.connect_to_s3()
        
    def connect_to_s3(self):
        try:
            # s3 클라이언트 생성
            s3 = boto3.client(
                service_name="s3",
                region_name= os.getenv('REGION_NAME'),
                aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            )
        except Exception as e:
            logging.error("Failed to connect to s3")
            raise
        logging.info("s3 bucket connected!") 
        return s3
    
    def upload_to_s3(self, file_content, bucket_name, s3_file_name):
        try:
            # 파일을 S3에 업로드
            self.connection.put_object(
                Bucket=bucket_name,
                Key=s3_file_name,
                Body=file_content,
                ContentType='application/json'
            )
            logging.info(f"File {s3_file_name} successfully uploaded to S3 bucket {bucket_name}.")
        except Exception as e:
            logging.error(f"Failed to upload {s3_file_name} to S3: {e}")
            raise
        
    def download_from_s3(self, bucket_name, s3_file_name):
        try:
            # S3에서 파일 다운로드
            response = self.connection.get_object(
                Bucket=bucket_name,
                Key=s3_file_name
            )
            file_content = response['Body'].read().decode('utf-8')
            logging.info(f"File {s3_file_name} successfully downloaded from S3 bucket {bucket_name}.")
            return file_content
        except Exception as e:
            logging.error(f"Failed to download {s3_file_name} from S3: {e}")
            raise

# 사용 예시
if __name__ == "__main__":
    # MySQL
    # setting = Setting()
    # table_name = "stock_metadata"
    # table_exists = setting.is_table_exist(table_name)
    # print(f"Table '{table_name}' exists: {table_exists}")

    # S3 예시
    s3 = S3Connection()
    s3.connect_to_s3()