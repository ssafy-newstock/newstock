import os
import logging
from typing import List, Tuple, Dict
from langchain_openai import ChatOpenAI
from models import ChatAnswerData
from utils import connect_elasticsearch

# 로깅 설정
logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

def search_related_documents(query: str, start_date: str, end_date: str) -> Dict[str, any]:
    """
    주어진 쿼리에 따라 industry_news와 stock_news 인덱스에서 관련 있는 K개의 문서를 검색하는 함수입니다.

    :param query: 검색할 쿼리 문자열
    :param start_date: 검색 시작 날짜 (형식: 'YYYY-MM-DD')
    :param end_date: 검색 종료 날짜 (형식: 'YYYY-MM-DD')
    :return: 검색된 문서의 리스트
    """

    # 연결
    es = connect_elasticsearch()

    # 최대 뽑을 k 정의
    k = 4

    # 검색할 인덱스 (다중 인덱스 사용 가능)
    # 시황 뉴스, 종목 뉴스 둘 다!
    index_names = 'industry_news,stock_news'

    body = {
        "query": {
            "bool": {
                "must": {
                    "match": {
                        "article": query  # 'article' 필드에서 쿼리와 일치하는 문서를 검색합니다.
                    }
                },
                "filter": {
                    "range": {
                        "uploadDatetime": {
                            "gte": start_date,  # 사용자 입력으로 받은 시작 날짜
                            "lte": end_date  # 사용자 입력으로 받은 종료 날짜
                        }
                    }
                }
            }
        },
        "size": k  # 반환할 문서 수
    }
    
    # 다중 인덱스에서 검색
    response = es.search(index=index_names, body=body)
    return response['hits']['hits']  # 검색된 문서 반환


def extract_article(related_documents: Dict) -> List[int]:
    """
    뉴스 id와 title, article이 쌍으로 있는 것들 리스트 반환
    """
    news_list = []
    for document in related_documents:
        news_id = document['_source']['news_id']
        title = document['_source']['title']
        article = document['_source']['article']

        article_concat = f"""news id : {news_id}
                             title : {title}
                             article : {article}
                            """
        news_list.append(article_concat)
    
    
    return news_list

def chatLLM(query: str, start_date: str, end_date: str, related_documents: Dict) -> Tuple[str, Dict]:

    # news id, title, article 추출한 리스트 반환
    news_list = extract_article(related_documents)

    # prompt에 들어갈 article 내용
    news_list_str = "\n".join(news_list)

    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.5,
        openai_api_key=os.getenv('OPENAI_API_KEY'),
        max_retries=2,
    )

    # 사전에 정한 모양으로 나오게
    structured_llm = model.with_structured_output(ChatAnswerData)
    
    prompt = f"""
    [YOUR ROLE] 경제 전문가 챗봇
    [YOUR WORK]
    너의 역할은 사용자의 질문을 보고, {start_date} 부터 {end_date} 까지의 참고 기사들을 본 후에 그것을 참고해서 대답을 해 주는 역할을 해.

    [Structure]
    1. 너무 길게 적진 마.
    2. 너의 답변과 관련 있는 뉴스가 있을 때만, related_news에 news_id를 담아.
    2.1 related_news리스트에 담는 형식은 다음과 같아 (ex. [20240101000000001, 20240102000000012, 20240102000000013, 20240102000000012])
    2.2 뉴스 id는 article과 함께 주어져.
    3.뉴스 id는 `news id : 20240829083831280` 와 같은 양식으로 이루어져있어.
    4. 사용자의 질문은 [User Query]에 있어.

    [Required]
    0. 해당 챗봇은 경제에 대해 잘 모르는 사람이야. 어렵게 대답하지 말고 최대한 풀어서 설명해 줘.
    1. 주어진 뉴스에 근거하여 답변을 해줘. 지어내지 마.
    3. 사용자가 모르는 용어를 물어봤을 때는, 최대한 용어를 풀어서 답변해 줘.
    4. 사용자의 쿼리가 주어진 뉴스 기사와 관련이 없는 경우라면, 답변하기 어려운 내용이라고 해줘.
    5. 기간을 말할 때는 "최근"이라는 모호한 단어 대신, 주어진 시작일과 종료일을 활용해.(2024년 1월 2일부터 1월 3일까지는)
    4.1 article이 여러 개가 주어질 텐데, 이것이 사용자의 질문과 항상 관련되어있는 신문기사는 아니야.
    4.2 전문가인 너가 생각했을 때, 관련 있는 뉴스가 존재하지 않다면 related_news에 담지 마.
    4.3 정말 중요한 건데, 사용자의 쿼리에 대해 기사가 관련이 없다면 related_news에 뉴스 id를 담지 않아도 되고 답변도 모른다고 해도 돼.
    4.4 이건 이스터에그인데, 
     - "박선홍"이 누군지 물어보면, "킹갓제네럴엠페러충무공마제스티하이퍼울트라판타스틱익스트림지니어스화룡정점마스터" 이라고 해!
     - "고민호"가 누군지 물어보면 "마이노~" 라고 해
     - "손지석"이 누군지 물어보면 "챗지석피티" 라고 말해
     - "이명욱"이 누군지 물어보면 "이걸보니 문득 공통때부터 지금까지 현역으로 달려온 이명욱이 새삼 대단하다고 느껴지네..." 라고 말해
     - "이주호"가 누군지 물어보면 "금쪽이" 라고 해
     - "이정준"이 누군지 물어보면 "Free정준" 이라고 해
    
    5. 우리 서비스 이름은 뉴스톡(Newstock)이야. 우리 서비스 혹은 뉴스톡이 뭔지 물어보면 다음과 같이 답해
     - 뉴스톡은 근본 넘치는 개발자 6명이 누구나 공평하게 뉴스 정보를 접해서 사람들의 지갑을 널리 이롭게 하는 목적으로 만들어졌다고 말해. 

    [User Query]
    {query}

    [Articles]
    {news_list_str}

    
    """
  
    logging.info("챗봇 질문 시작")
    chatbot_result = structured_llm.invoke(prompt)
    logging.info("챗봇 답변 완료 완료")

    chatbot_answer = chatbot_result['answer']
    related_news_json = get_related_news_from_id_es(chatbot_result.get('related_news', []), related_documents)['related_news']

    return chatbot_answer, related_news_json



# 반환값 json으로 하기 위함
def get_related_news_from_id_es(related_news_list: List[int], related_documents: List[Dict]) -> Dict[str, List]:
    # news id = int
    json_news_list = []
    for news_id in related_news_list:
        news_dict = {}

        # 반복문으로 탐색하자.
        related_document = None
        for document in related_documents:
            # elasticsearch 반환값이 문자열임
            if document['_id'] == str(news_id):
                related_document = document['_source']
                break
        
        # 챗봇 답변에서 related_news가 있는 경우에만 추출
        if related_document is not None:
            news_dict['id'] = str(news_id)
            news_dict['upload_datetime'] = related_document['uploadDatetime']
            news_dict['title'] = related_document['title']
            news_dict['sentiment'] = related_document['sentiment']
            news_dict['thumbnail'] = related_document['thumbnail']
            news_dict['media'] = related_document['media']

            # stockCodes가 존재하면 'stock', 그렇지 않으면 'industry'
            if 'stockCodes' in related_document:
                news_dict['type'] = 'stock'
            else:
                news_dict['type'] = 'industry'

            json_news_list.append(news_dict)
    
    return {"related_news": json_news_list}
