import logging
from fastapi import FastAPI, WebSocket
from starlette.websockets import WebSocketDisconnect
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from exception import StockInfoEmptyException, StockNewsEmptyException
from api.main import api_router

# 로깅 설정
logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s: %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

# 기본 Setting
app = FastAPI(
    # title=settings.PROJECT_NAME,  # 주석 처리된 설정이 필요할 경우 주석 해제
)


# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5500", "https://newstock.info"],  # 모든 도메인 허용 (보안을 위해 실제 도메인으로 변경해야 함)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# 라우터 추가
app.include_router(api_router)

# 예외 처리기 등록
@app.exception_handler(StockInfoEmptyException)
async def stock_info_empty_exception_handler(request, exc: StockInfoEmptyException):
    logger.error(f"HTTP Exception: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

@app.exception_handler(StockNewsEmptyException)
async def stock_news_empty_exception_handler(request, exc: StockNewsEmptyException):
    logger.error(f"HTTP Exception: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )
