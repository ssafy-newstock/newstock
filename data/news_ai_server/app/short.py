from utils import execute_hbase_prepared_query
from typing import List, Tuple
from langchain_openai import ChatOpenAI
import logging
import os
from typing import Dict
from models import ShortNewsData
from exception import NewsArticleEmptyException

logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


# news_id로부터 값 가져오는 코드
def get_original_article(news_id: str, news_type: str) -> List[str]:

    query = ""
    # 시황 뉴스일 때
    if news_type == "industry":
        query = """
                SELECT article
                FROM ph_industry_news
                where news_id = ?
                """
        
    # 종목 뉴스일 때
    elif news_type == "stock":
            query = """
                SELECT article
                FROM ph_stock_news
                where news_id = ?
                """
    params = [
         news_id
    ]

    # List[Tuple] 형태로 반환
    result = execute_hbase_prepared_query(query, params)

    try:
        original_article = result[0][0]

    # 아무것도 없을 때
    except:
         raise NewsArticleEmptyException(news_id)

    # 문자열만 추출
    return original_article

def shortLLM(article: str) -> Dict[str, str]:

    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        openai_api_key=os.getenv('OPENAI_API_KEY'),
        max_retries=2,
    )

    # 사전에 정한 모양으로 나오게
    structured_llm = model.with_structured_output(ShortNewsData)
    
    prompt = f"""
    [YOUR ROLE] an expert on economic news summaries
    [YOUR WORK]
    You are an expert at summarizing economic news. Here's what you need to keep in summarizing the news.

    Please give me a three-line summary, and save each three-line summary one line in newsOne, newsTwo, and newsThree.
    People who read this news are beginners who don't know the terms of economic news. Please explain it easily
    Avoid difficult terms and make it easy for anyone to understand
    Cover the important part with <mark></mark>, only one tag per line
    Please answer in Korean
    [Article]
    {article}


    """
  
    logging.info("분석 시작")
    short_summary_result = structured_llm.invoke(prompt)
    logging.info("GPT로부터 AI뉴스 요약본 추론 완료")
    return short_summary_result