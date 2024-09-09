# 베이스 이미지로 Python 3.8를 사용
FROM python:3.8-slim

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY requirements.txt .
COPY ./src /app/src

# 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 개발 모드로 setup.py 설치
COPY setup.py .
RUN pip install --no-cache-dir -e .

# 애플리케이션 코드 복사 (필요한 파일만)
COPY main.py .

# 포트 설정
EXPOSE 8000

# FastAPI 애플리케이션 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
