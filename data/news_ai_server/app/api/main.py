from fastapi import APIRouter

# from api.routes import items, login, utils
from api.routes import similarity

api_router = APIRouter()
# api_router.include_router(login.router, tags=["login"])
api_router.include_router(similarity.router, prefix="/similarity", tags=["similarity"])
# api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
# api_router.include_router(items.router, prefix="/items", tags=["items"])
