from fastapi import FastAPI
from newstock_scraper.test import *

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()

# 기본 엔드포인트 정의
@app.get("/")
def read_root():
    return {"message": f"{check()}"}

# /items/{item_id} 엔드포인트 정의
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
