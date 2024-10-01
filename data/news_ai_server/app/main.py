from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

from api.main import api_router
# from core.config import settings


# 기본 Setting
app = FastAPI(
    # title=settings.PROJECT_NAME,

)

# Set all CORS enabled origins
# if settings.all_cors_origins:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=settings.all_cors_origins,
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

# 라우터 추가
app.include_router(api_router)
