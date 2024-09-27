from fastapi import FastAPI
import traceback
import logging
from config.settings import settings
from datetime import datetime


# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI(
    title=settings.TITLE,
    description=settings.DESCRIPTION,
)

# 기본 엔드포인트 정의
@app.get("/")
def read_root():
    return {"message": "preprocess_server"}