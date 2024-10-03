from fastapi import APIRouter

# from api.routes import items, login, utils
from api.routes import similarity, summary
from fastapi import FastAPI, WebSocket
from starlette.websockets import WebSocketDisconnect
app = FastAPI(
    # title=settings.PROJECT_NAME,  # 주석 처리된 설정이 필요할 경우 주석 해제
)

api_router = APIRouter()

api_router.include_router(similarity.router, prefix="/similarity", tags=["similarity"])
api_router.include_router(summary.router, prefix="/summary", tags=["summary"])
