from fastapi import FastAPI, HTTPException, status
from config.settings import settings

from newstock_scraper.test import *
from newstock_scraper.settings import Setting

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI(
    title=settings.TITLE,
    description=settings.DESCRIPTION,
)

# 기본 엔드포인트 정의
@app.get("/")
def read_root():
    return {"message": f"{check()}"}

@app.get("/test")
def read_root():
    try:
        result = "Good"
        # 응답 성공 시 200 상태 코드와 메시지 반환
        return {"message": result}
    except Exception as e:
        # 예외 발생 시 500 상태 코드와 에러 메시지 반환
        raise HTTPException(status_code=500, detail="An internal server error occurred")

@app.get("/check")
def check_table():
    setting = Setting()
    table_name = "stock_metadata"
    table_exists = setting.is_table_exist(table_name)
    
    if table_exists:
        return create_response("success", status.HTTP_200_OK, "Table exists")
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Table not found")

    # except Exception as e:
    #     raise_error_response(status.HTTP_500_INTERNAL_SERVER_ERROR, "An internal server error occurred")


# stock_metadata table을 create하는 함수
@app.post("/create")
def create_table():
    setting = Setting()
    table_name = "stock_metadata"
    create_result = setting.create_metadata_table(table_name)

    if create_result:
        return create_response("success", status.HTTP_200_OK, "Successfully Created")
    else:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to create {table_name}")



def create_response(status: str, code: int, message: str, data=None):
    return {
        "status": status,
        "code": code,
        "message": message,
        "data": data
    }

# TODO : 개발 단계 끝나면 적용 예정
def raise_error_response(code: int, message: str, exception: str = None):
    # detail에 문자열을 넣어야 함
    error_detail = create_response("error", code, message, exception)
    raise HTTPException(
        status_code=code,
        detail=error_detail["message"]  # detail에는 문자열만 넣음
    )
