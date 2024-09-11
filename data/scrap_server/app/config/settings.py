from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # 환경 변수 설정
    model_config = SettingsConfigDict(env_file=".env")

    TITLE: str = "FASTAPI Backend API"
    DESCRIPTION: str = "For Scraping"

    DB_URL: str
    ECHO_SQL: bool = False


@lru_cache
def get_settings() -> Settings:
    load_dotenv()
    return Settings()


settings = get_settings()