import random
import os
import logging
import pandas as pd
from fastapi import WebSocket
from datetime import datetime
from collections import defaultdict
from typing import List, Tuple, Dict
from langchain_openai import ChatOpenAI

from models import ReportStockData
from utils import execute_hbase_prepared_query
from exception import StockNewsEmptyException


# 로깅 설정
logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


# 쿼리 날리는 코드
def get_stock_news_title(stock_code: str, start_date: str, end_date: str) -> Tuple[str, Dict]:
    result = get_commapy_news(stock_code, start_date, end_date)

    # 뉴스가 하나도 없을 때, 예외처리 해주기
    if (len(result) == 0):
        raise StockNewsEmptyException(stock_code, start_date, end_date)

    weekly_data = convert_to_weekly_data(result)
    # 주마다 top10 뉴스 뽑기
    weekly_top10_data = pick_random_news(weekly_data, bulk_size=10)
    
    # 문자열로 변환
    news_str = convert_news_str(weekly_top10_data)
    # 관련 뉴스 뽑아내기 위함
    news_dict = convert_news_dict(weekly_top10_data)

    return news_str, news_dict

# HBase에서 데이터 받아오는 코드
def get_commapy_news(stock_code: str, start_date: str, end_date: str) -> List[Tuple]:
    query = """
            SELECT news_id, upload_datetime, title, sentiment, thumbnail, media
            FROM ph_stock_news psn
            JOIN (
                SELECT stock_news_id
                FROM ph_stock_news_stock_code
                WHERE stock_news_id_stock BETWEEN ? AND ?
                AND stock_code = ?
            ) AS subquery ON psn.news_id = subquery.stock_news_id
            WHERE psn.news_id BETWEEN ? AND ?
            AND score = ?
            """
    
    start_date_str, end_date_str = convert_date(start_date, end_date)
 
    params = [
                start_date_str, 
                end_date_str,
                stock_code,
                int(start_date_str),
                int(end_date_str),
                2
            ]

    result = execute_hbase_prepared_query(query, params)
    return result

# hbase에서 가져온 코드를 Dict로 바꿔주는 코드
def convert_to_weekly_data(query_result: List[Tuple[int, str, str]]):
    # 주차별 데이터 저장용 딕셔너리
    weekly_data = defaultdict(lambda: defaultdict(tuple))

    # 데이터 분류
    for data in query_result:

        news_id = data[0]
        upload_datetime = data[1]
        title = data[2]
        sentiment = data[3]
        thumbnail = data[4]
        media = data[5]

        # 날짜 객체 생성
        date_obj = datetime.strptime(upload_datetime, '%Y-%m-%d %H:%M:%S')
        # 주차 계산 (ISO 주차)
        week_number = date_obj.isocalendar()[1]
        year = date_obj.year

        # 연도와 주차를 키로 사용하여 newsId와 (upload_datetime, title) 추가
        weekly_data[(year, week_number)][news_id] = (upload_datetime, title, sentiment, thumbnail, media)

    return weekly_data

def pick_random_news(weekly_data: Dict[Tuple[int, int], Dict[int, Tuple[str, str]]], bulk_size: int = 10) -> Dict[Tuple[int, int], Dict[int, Tuple[str, str]]]:
    # 결과를 저장할 딕셔너리
    random_news_per_week = {}
    total_dict = {} # newsId가 key, 다른 정보가 value로 들어간 형식

    # 각 주차별로 랜덤으로 bulk_size개 뉴스 선택
    for week, news_list in weekly_data.items():
        # 고정된 seed 설정 (주차 기반으로 seed 설정)
        random.seed(f"{week[0]}-{week[1]}")
        
        # dict의 items()를 리스트로 변환
        news_items = list(news_list.items())

        if len(news_items) <= bulk_size:
            # 뉴스가 bulk_size개 이하일 경우, 가능한 모든 뉴스 선택
            random_news_per_week[week] = dict(news_items)
        else:
            # bulk_size개 랜덤 뉴스 선택
            sampled_news = dict(random.sample(news_items, bulk_size))
            random_news_per_week[week] = sampled_news

    return random_news_per_week

def convert_date(start_date: str, end_date: str):
        # yyyy-mm-dd -> yyyymmdd000000000
        start_date_str =  datetime.strptime(start_date, "%Y-%m-%d").strftime("%Y%m%d") + "000000000"
        # yyyy-mm-dd -> yyyymmdd999999999
        end_date_str =  datetime.strptime(end_date, "%Y-%m-%d").strftime("%Y%m%d") + "999999999"

        return start_date_str, end_date_str

def convert_news_str(news_dict:defaultdict):
    final_result = []

    for key, week_data in news_dict.items():

        for news_id, news_data in week_data.items():
        #  id, 날짜, 시황
            
            data = f"{news_id} / {news_data[0]} / {news_data[1]}"
            final_result.append(data)

    return "\n".join(final_result)

def convert_news_dict(news_dict:defaultdict) -> Dict:
    final_result_dict = {}

    for key, week_data in news_dict.items():

        for news_id, news_data in week_data.items():
        #  id, 날짜, 시황
            final_result_dict[news_id] = news_data

    return final_result_dict

def df_to_string(df: pd.DataFrame) -> str:
        # Drop the 'stock_code' column
    df = df.drop(columns=['stock_code'])

    # Convert the DataFrame to a string format
    return df.to_string(index=False)

async def summaryLLM_socket(websocket: WebSocket,
                        stock_code:str,
                        start_date:str,
                        end_date: str,
                        news_str: str,
                        news_info_dict:Dict,
                        stock_price_df: pd.DataFrame):

    # 주시 가격 데이터 프롬프트에 넣을 수 있게 전처리
    stock_price_str = df_to_string(stock_price_df)

    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        openai_api_key=os.getenv('OPENAI_API_KEY'),
        max_retries=2,
    )

    # 사전에 정한 모양으로 나오게
    structured_llm = model.with_structured_output(ReportStockData)
    related_news_list = []

    prompt = f"""
    [YOUR ROLE] 시황 보고서 작성 애널리스트
    [YOUR WORK]
   너는 내가 준 대한민국 코스피의 {start_date} ~ {end_date} 기간 내 {stock_code} 종목을 내가 준 뉴스 및 의 주가 가격을 고려해서 시황 및 종목 분석 보고서를 작성해 줘야해.
    분석할 때는 다음과 같은 상황을 지켜야 해
    [Required]
    0. 보고서 분석의 메인은 뉴스 기반이야. 뉴스 정보가 보고서에 많이 들어갔으면 좋겠어
    1. 무조건 한국어로 보고서를 적어줘. 최대산 상세하게, 글자수는 한국어 기준으로 600자 이상
    2. 너가 보고서를 작성할 때는 두 단락으로 나누어. 각각의 단락은 소제목이 있어야 하고, 단락은 엔터로 나눠.
    3.  첫 번째는 거시적인 흐름, 전체적은 주식장의 흐름과 연관을 지어서 분석해줘
    4. 두 번째는 해당 회사와 관련된 요소만을 중심으로 연관을 지어서 분석해 줘.
    5. 주식 가격을 예측하려고 하지 마.
    6. 최대한 주어진 뉴스에 대한 주가의 영향을 연결지어서 심층적으로 분석해줘.
    7. 마지막으로 너가 시황분석, 요약한 것과 가장 관련 있는, 도움이 많이 되었던 뉴스 4개를 뽑아줘. 주의해야 할 점은 뉴스 id만 가져와.
    7.1 뉴스 id는 리스트에 담아줘 (ex. [20240101000000001, 20240102000000012, 20240102000000013, 20240102000000012]


    관련 기사 목록
    [News Title]
    {news_str}

    [{stock_code} price]
    {stock_price_str}


    """

  

    full = ""
    start = 0
    end = 0
    for chunk in structured_llm.stream(prompt):
        # chunk에서 summary 및 관련 뉴스 처리
        if 'report' in chunk and not 'related_news' in chunk:
            end = len(chunk['report'])
            # 클라이언트에 요약을 전송
            await websocket.send_text(f"{chunk['report'][start:end]}")
            full += chunk['report'][start:end]
            start = end
        
        # masterpiece가 포함된 경우
        if 'related_news' in chunk:
            related_news_list = chunk['related_news']

    # 최종 관련 뉴스 출력
    if related_news_list:
        # await websocket.send_text(f"Final related_news: {related_news_list}")
        logging.info('find related_news_list')
        related_news_json = get_related_news_from_id(related_news_list, news_info_dict)
        await websocket.send_json(related_news_json)
    else:
        await websocket.send_json({"related_news" : []})

# 반환값 json으로 하기 위함
def get_related_news_from_id(related_news_list: List[int], news_info_dict: Dict[int, Tuple]) -> Dict[str, List]:
    # news id = int
    json_news_list = []
    for news_id in related_news_list:
        news_dict = {}
        news_data = news_info_dict[news_id]

        news_dict['id'] = news_id
        news_dict['upload_datetime'] = news_data[0]
        news_dict['title']  = news_data[1]
        news_dict['sentiment']  = news_data[2]
        news_dict['thumbnail']  = news_data[3]
        news_dict['media']  = news_data[4]

        json_news_list.append(news_dict)
    
    return {"related_news" : json_news_list}

def summaryLLM(
                stock_code:str,
                stock_name: str,
                start_date:str,
                end_date: str,
                news_str: str,
                news_info_dict:Dict,
                stock_price_df: pd.DataFrame):

    # 주시 가격 데이터 프롬프트에 넣을 수 있게 전처리
    stock_price_str = df_to_string(stock_price_df)

    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        openai_api_key=os.getenv('OPENAI_API_KEY'),
        max_retries=2,
    )

    # 사전에 정한 모양으로 나오게
    structured_llm = model.with_structured_output(ReportStockData)
    

    prompt = f"""
    [YOUR ROLE] 시황 보고서 작성 애널리스트
    [YOUR WORK]
   너는 내가 준 대한민국 코스피의 {start_date} ~ {end_date} 기간 내 {stock_code} 종목을 내가 준 뉴스 및 의 주가 가격을 고려해서 시황 및 종목 분석 보고서를 작성해 줘야해.
    분석할 때는 다음과 같은 조건을 지켜야 해

    [Structure]
    1. MacroReport, MicroReport에는 다음 내용을 적용해줘.
    1.1. 문장은 꼭 <br>태그로 구분해줘. 즉, 문장에 온점(.)이; 들어가면 무조건 추가해 제발
    1.2. 중요한 내용은 <mark></mark> 태그로 감싸줘

    [Required]
    0. 보고서 분석의 메인은 뉴스 기반이야. 뉴스 정보가 보고서에 많이 들어갔으면 좋겠어
    1. 해당 보고서를 읽는 사람은 경제에 대해 아무것도 모르는 사람이야. 아주 쉽게 요약해줘.
    2. 무조건 한국어로 보고서를 적어줘. 핵심적인 내용 위주로, 글자 수는 한 단락당 공백 포함 300자 이내로 해줘.
    3. 너가 보고서를 작성할 때는 두 단락으로 나누어. 각각의 단락은 소제목이 있어야 해.
    4. 첫 번째는 거시적인 흐름, 전체적인 주식장의 흐름과 연관을 지어서 분석해줘
    5. 두 번째는 해당 회사와 관련된 요소만을 중심으로 연관을 지어서 분석해 줘.
    6. 주식 가격을 예측하려고 하지 마.
    7. 최대한 주어진 뉴스에 대한 주가에 미치는 영향, 주가의 변화를 심층적으로 분석해줘.
    8. 웬만하면 똑같은 뉴스 주제로 분석하지 말고, 최대한 다양한 뉴스로 분석해줘.
    9. 마지막으로 너가 시황분석, 요약한 것과 가장 관련 있는, 도움이 많이 되었던 뉴스 4개를 뽑아줘. 주의해야 할 점은 뉴스 id만 가져와.
    10. MacrRreport, MicroReport에서 뉴스 ID는 절대로 언급하지마
    9.1 뉴스 id는 리스트에 담아줘 (ex. [20240101000000001, 20240102000000012, 20240102000000013, 20240102000000012]



    관련 기사 목록
    [News Title]
    {news_str}

    [{stock_code} price]
    {stock_price_str}


    """

  
    logger.info("GPT 한달 요약 분석 시작")
    summary_result = structured_llm.invoke(prompt)
    logger.info("GPT로부터 한달 요약 추론 완료")
    macro_report_summary = summary_result['macro_report']
    micro_resport_summary = summary_result['micro_report']

    related_news_json = get_related_news_from_id(summary_result['related_news'], news_info_dict)['related_news']
    return macro_report_summary, micro_resport_summary, related_news_json
