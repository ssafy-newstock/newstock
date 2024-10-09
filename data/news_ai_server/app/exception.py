from fastapi import HTTPException
import logging

# 로깅 설정
logger = logging.getLogger(__name__)

# 유효하지 않은 stock 정보일 때
class StockInfoEmptyException(HTTPException):
    def __init__(self, stock_code: str, start_date: str = None, end_date: str = None):
        detail = f"No data found for stock_code: {stock_code}, start_date: {start_date}, end_date: {end_date}"
        super().__init__(status_code=404, detail=detail)

class StockNewsEmptyException(HTTPException):
    def __init__(self, stock_code: str, start_date: str = None, end_date: str = None):
        detail = f"Stock News is Empty: {stock_code}, start_date: {start_date}, end_date: {end_date}"
        super().__init__(status_code=404, detail=detail)

class InvalidParameterException(HTTPException):
    def __init__(self):
        detail = f"A required parameter is missing or invalid."
        super().__init__(status_code=422, detail=detail)

class NewsArticleEmptyException(HTTPException):
    def __init__(self, stock_code: int):
        detail = f"There is no news corresponding to your news_id: {stock_code}"
        super().__init__(status_code=404, detail=detail)
