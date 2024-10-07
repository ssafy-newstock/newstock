
from typing import Optional
from fastapi import APIRouter, Query, Depends, HTTPException
from short import shortLLM, get_original_article
from models import NewsShortResponse
from exception import InvalidParameterException
import logging

router = APIRouter()
date_pattern = r"^\d{4}-\d{2}-\d{2}$"

logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


class InvalidParameterException(HTTPException):
    def __init__(self, missing_param: str):
        detail = f"A required parameter '{missing_param}' is missing or invalid."
        super().__init__(status_code=422, detail=detail)

# Custom dependency to validate each parameter separately
def validate_news_id(news_id: Optional[int] = Query(None)) -> int:
    if news_id is None:
        raise InvalidParameterException("news_id")
    return news_id

def validate_news_type(news_type: Optional[str] = Query(None)) -> str:
    if news_type is None:
        raise InvalidParameterException("news_type")
    return news_type

# 우선 개발용으로 prompt를 입력할 수 있도록 함
@router.get("")
def get_news_short(
    news_id: int = Depends(validate_news_id),  # Use the custom dependency
    news_type: str = Depends(validate_news_type),  # Use the custom dependency
    prompt: Optional[str] = Query(
        None,
        description="Prompt"
    )
):
    # 뉴스 예외처리
    logging.info("news short api connected")
    original_article = get_original_article(news_id, news_type)
    logging.info(original_article)
    news_short = shortLLM(original_article, prompt)

    response = NewsShortResponse(
        newsShort=news_short,
        newsOriginal=original_article
    )
    return response