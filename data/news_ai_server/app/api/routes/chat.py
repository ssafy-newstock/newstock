import logging
from typing import Optional
from fastapi import APIRouter, Query

from utils import get_stock_data
from chat import search_related_documents, chatLLM
from models import ChatResponse

router = APIRouter()
date_pattern = r"^\d{4}-\d{2}-\d{2}$"


# 로깅 설정
logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

@router.get("")
def chat(
    query: Optional[str] = Query(
        None,
        description="A user query for chatbot."
    ),
    start_date: Optional[str] = Query(
        None, 
        description="Start date for chatbot.",
        regex=date_pattern
    ),
    end_date: Optional[str] = Query(
        None, 
        description="End date for chatbot.",
        regex=date_pattern
    )
):
    # 주가 데이터 가져오기
    related_documents = search_related_documents(query, start_date, end_date)
    chatbot_answer, related_news_json = chatLLM(query, start_date, end_date, related_documents)

    response = ChatResponse(
        answer = chatbot_answer,
        relatedNews = related_news_json
    )
    
    return response

