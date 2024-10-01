from fastapi import APIRouter

# from api.routes import items, login, utils
from api.routes import similarity

api_router = APIRouter()

api_router.include_router(similarity.router, prefix="/similarity", tags=["similarity"])
