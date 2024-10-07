from utils import execute_hbase_prepared_query
from typing import List, Tuple
from langchain_openai import ChatOpenAI
import logging
import os
from models import ShortNewsData
from exception import NewsArticleEmptyException

logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


# news_id로부터 값 가져오는 코드
def get_original_article(news_id: str, news_type: str) -> str:

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

def shortLLM(article: str, prompt: str):

    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        openai_api_key=os.getenv('OPENAI_API_KEY'),
        max_retries=2,
    )

    # 사전에 정한 모양으로 나오게
    structured_llm = model.with_structured_output(ShortNewsData)
    
    # 개발 단계 기본 프롬프트
    if prompt == None:
        prompt = f"""
        [YOUR ROLE] 경제뉴스 뉴스 요약 전문가
        [YOUR WORK]
        너는 경제 뉴스를 요약하는 전문가야. 뉴스를 요약하면서 너가 지켜야 하는 것은 다음과 같아.
        1. 최대한 4줄 이상 넘어가지 않게 해줘.
        2. 이 뉴스를 읽는 사람들은 경제뉴스 용어를 잘 모르는 초보자야. 쉽게 설명해줘
        3. 어려운 용어는 지양하고 누구나 쉽게 이해할 수 있도록 해줘


    

        [Article]
        {article}


        """

    else:
        prompt += "\n" + article

  
    logging.info("분석 시작")
    short_summary_result = structured_llm.invoke(prompt)
    logging.info("GPT로부터 AI뉴스 요약본 추론 완료")
    
    return short_summary_result