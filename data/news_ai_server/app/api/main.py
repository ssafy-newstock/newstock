from fastapi import APIRouter

# from api.routes import items, login, utils
from api.routes import similarity, summary, dummy
from fastapi import FastAPI, WebSocket
from starlette.websockets import WebSocketDisconnect
app = FastAPI(
    # title=settings.PROJECT_NAME,  # 주석 처리된 설정이 필요할 경우 주석 해제
)

api_router = APIRouter()

api_router.include_router(similarity.router, prefix="/api/newsai/similarity", tags=["similarity"])
api_router.include_router(summary.router, prefix="/api/newsai/summary", tags=["summary"])
api_router.include_router(dummy.router, prefix="/api/newsai/dummy", tags=["dummy"])

