from fastapi import FastAPI, HTTPException, status
from config.settings import settings

from newstock_scraper.test import *
from newstock_scraper.stock_list import StockListScraper
from newstock_scraper.stock_limit import StockNewsLimitScraper
from newstock_scraper.news_metadata import StockNewsMetadataScraper, IndustryNewsMetadataScraper
from newstock_scraper.news_scraper import NewsScraper
from newstock_scraper.settings import Setting
from pydantic import BaseModel, validator
from datetime import datetime


# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI(
    title=settings.TITLE,
    description=settings.DESCRIPTION,
)

# 기본 엔드포인트 정의
@app.get("/")
def read_root():
    return {"message": f"{check()}"}


# TODO : URI 바꾸기 => /check/table
@app.get("/check")
def check_table():
    setting = Setting()
    table_name = "stock_metadata"
    table_exists = setting.is_table_exist(table_name)
    
    if table_exists:
        return create_response("success", status.HTTP_200_OK, "Table exists")
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Table not found")

    # except Exception as e:
    #     raise_error_response(status.HTTP_500_INTERNAL_SERVER_ERROR, "An internal server error occurred")


# stock_metadata table을 create하는 함수
@app.post("/create")
def create_table():
    setting = Setting()
    table_name = "stock_metadata"
    create_result = setting.create_metadata_table(table_name)

    if create_result:
        return create_response("success", status.HTTP_200_OK, "Successfully Created")
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Failed to create {table_name}")
    
# stock list를 매번 krx에서 얻어오는 함수
@app.post("/download")
def download_stock_list():
    scraper = StockListScraper()
    
    try:
        scraper.get_stock_list()
        create_response("success", status.HTTP_200_OK, "Successfully Downloaded Stock List")

    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to Downloaded Stock List with error {e}")


@app.get('/limit/check')
def check_limit_date():
    scraper = StockNewsLimitScraper()

    try:
        check_result = scraper.check_limit_exist()
        if check_result:
            return create_response("success", status.HTTP_200_OK, "Start date, end date limit exist")
        else:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"Start date, end date limit not found")
        
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to Check Stock limit with error {e}")

# 뉴스 검색 범위인 start_date, end_date 검색 여부 확인
@app.post('/limit/download')
def check_date():
    scraper = StockNewsLimitScraper()

    try:
        scraper.get_news_limit()
        return create_response("success", status.HTTP_200_OK, "Successfully Downloaded Stock List")
    
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to Downloaded Stock List with error {e}")


# 요청 본문을 정의하는 Pydantic 모델
class StockMetadataRequest(BaseModel):
    start_date: str
    end_date: str

    @validator('start_date', 'end_date')
    def check_date_format(cls, value):
        try:
            print(value)
            datetime.strptime(value, '%Y-%m-%d')
        except ValueError:
            raise ValueError('Incorrect date format, should be YYYY-MM-DD')
        return value

# 종목뉴스 메타데이터 스크래핑
@app.post('/stock/metadata')
def scrap_stock_metadata(request: StockMetadataRequest):
    scraper = StockNewsMetadataScraper()

    # start_date와 end_date를 파라미터로 전달
    try:
        scraper.get_news_metadata(params={"start_date": request.start_date, "end_date": request.end_date})
        return create_response("success", status.HTTP_200_OK, "Successfully scrapped Stock Metadata")
    
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to scrap Stock Metadata with error {e}")

# 시황뉴스 메타데이터 스크래핑
@app.post('/industry/metadata')
def scrap_stock_metadata(request: StockMetadataRequest):
    scraper = IndustryNewsMetadataScraper()

    # start_date와 end_date를 파라미터로 전달
    try:
        scraper.get_industry_news_metadata(params={"start_date": request.start_date, "end_date": request.end_date})
        return create_response("success", status.HTTP_200_OK, "Successfully scrapped Industry Metadata")
    
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to scrap Industry Metadata with error {e}")

# 종목뉴스 본문 스크레이핑
@app.post('/stock/news')
def scrap_stock_metadata(request: StockMetadataRequest):
    scraper = NewsScraper()

    try:
    # start_date와 end_date를 파라미터로 전달
        scraper.get_news_article(get_stock=True,
                                 params={"start_date": request.start_date, "end_date": request.end_date})
        
        return create_response("success", status.HTTP_200_OK, "Successfully scrapped Stock Metadata")
    
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to scrap Stock Metadata with error {e}")

# 시황뉴스 본문 스크레이핑
@app.post('/industry/news')
def scrap_stock_metadata(request: StockMetadataRequest):
    scraper = NewsScraper()

    try:
    # start_date와 end_date를 파라미터로 전달
        scraper.get_news_article(get_stock=False,
                                 params={"start_date": request.start_date, "end_date": request.end_date})
        
        return create_response("success", status.HTTP_200_OK, "Successfully scrapped Stock Metadata")
    
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to scrap Stock Metadata with error {e}")

def create_response(status: str, code: int, message: str, data=None):
    return {
        "status": status,
        "code": code,
        "message": message,
        "data": data
    }

# TODO : 개발 단계 끝나면 적용 예정
def raise_error_response(code: int, message: str, exception: str = None):
    # detail에 문자열을 넣어야 함
    error_detail = create_response("error", code, message, exception)
    raise HTTPException(
        status_code=code,
        detail=error_detail["message"]  # detail에는 문자열만 넣음
    )
