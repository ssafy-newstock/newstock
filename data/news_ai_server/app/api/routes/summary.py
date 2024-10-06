
from typing import Optional
from fastapi import APIRouter, Query
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from summary import get_stock_news_title, summaryLLM
from models import StockSummaryResponse
from utils import get_stock_data
import json

router = APIRouter()
date_pattern = r"^\d{4}-\d{2}-\d{2}$"




@router.get("")
def get_summary(
    base_stock_code: Optional[str] = Query(
        None,
        description="Stock code for summary."
    ),
    base_stock_name: Optional[str] = Query(
        None,
        description="Stock name for summary."
    ),
    start_date: Optional[str] = Query(
        None, 
        description="Start date for the summary.",
        regex=date_pattern
    ),
    end_date: Optional[str] = Query(
        None, 
        description="End date for summary.",
        regex=date_pattern
    )
):
    # 주가 데이터 가져오기
    stock_price_df = get_stock_data(base_stock_code, start_date, end_date)

#    타이틀 가져오기
    news_titles, news_info_dict = get_stock_news_title(base_stock_code, start_date, end_date)

    macro_report_summary, micro_resport_summary, related_news_json = summaryLLM(base_stock_code, base_stock_name, start_date, end_date, news_titles, news_info_dict, stock_price_df)


    response = StockSummaryResponse(
        macroReport=macro_report_summary,
        microReport=micro_resport_summary,
        relatedNews=related_news_json
    )
    return response


# websocket depreciated
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # JSON 문자열 수신
            request = await websocket.receive_text()
            # JSON 문자열을 Python 딕셔너리로 변환
            request_data = json.loads(request)

            # 각 값 추출
            base_stock_code = request_data.get('base_stock_code')
            start_date = request_data.get('start_date')
            end_date = request_data.get('end_date')

            # 데이터 가져오기
            stock_price_df = get_stock_data(base_stock_code, start_date, end_date)

            # TODO: Date Pattern 어긋나면 예외처리

            # 타이틀 가벼오기
            news_titles, news_info_dict = get_stock_news_title(base_stock_code, start_date, end_date)
            print("get title")

            await summaryLLM(websocket, base_stock_code, start_date, end_date, news_titles, news_info_dict, stock_price_df)

            
            # # # 메시지를 보낸 후 연결 종료
            # await websocket.close()
    except WebSocketDisconnect:
        print("Client disconnected")