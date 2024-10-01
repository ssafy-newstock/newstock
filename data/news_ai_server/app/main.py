import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from exception import StockInfoEmptyException
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
# if settings.all_cors_origins:
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # 특정 출처를 지정할 수 있습니다
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

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
