from pydantic import BaseModel, Field
from typing import List, Optional
import datetime
from typing_extensions import Annotated, TypedDict

# 각각의 candle data
class CandleData(BaseModel):
    date: datetime.date = Field(..., description="The date of the candle data.")
    open: int = Field(..., description="Opening price.")
    close: int = Field(..., description="Closing price.")
    high: int = Field(..., description="Highest price.")
    low: int = Field(..., description="Lowest price.")


# 전체 stock_data
class StockData(BaseModel):
    stockCode: str = Field(..., description="Stock code identifier.")
    similarityScore: float = Field(..., description="Similarity score between stock patterns.")
    startDate: datetime.date = Field(..., description="Start date of the stock data.")
    endDate: datetime.date = Field(..., description="End date of the stock data.")
    candleData: List[CandleData] = Field(..., description="List of candle data for the stock.")

# 관련 뉴스
class RelatedNewsData(BaseModel):
    id: int = Field(..., description="The unique identifier of the news article.")
    upload_datetime: str = Field(..., description="The upload date and time of the news article.")
    title: str = Field(..., description="The title of the news article.")
    sentiment: int = Field(..., description="The sentiment analysis score of the article. Typically, 1 for positive, -1 for negative, 0 for neutral.")
    thumbnail: Optional[str] = Field(None, description="The thumbnail image URL of the news article.")
    media: str = Field(..., description="The media source of the news article.")

# summary 반환 객체
class StockSummaryResponse(BaseModel):
    macroReport: str = Field(..., description="The stock analysis with macro and industry analysis.")
    microReport: str = Field(..., description="The stock analysis with specific firm issue.")
    relatedNews: List[RelatedNewsData] = Field(..., description="The related top 4 news of the report")

# similarity 반환 객체
class SimilarStockResponse(BaseModel):
    baseStock: StockData = Field(..., description="Most similar base stock range.")
    otherStock: List[StockData] = Field(..., description="5 most similar stock to base stock range.")

# LLM structured
class ReportStockData(TypedDict):
    """Report of News for specific stock code"""
    macro_report: Annotated[str, ..., "The stock analysis with macro and industry analysis "]
    micro_report: Annotated[str, ..., "The stock analysis with specific firm issue"]
    # macro_summary: Annotated[str, ..., "The summary for specific stock news"]
    related_news: Annotated[List[int], ..., "The related top 4 news of the report"]

# 단일 뉴스 요약본
class NewsShortResponse(TypedDict):
    newsOne: str = Field(..., description="News short summary row 1")
    newsTwo: str = Field(..., description="News short summary row 2")
    newsThree: str = Field(..., description="News short summary row 3")

# 단일 뉴스 요약 structure
class ShortNewsData(TypedDict):
    """Structured news input"""
    newsOne: str = Field(..., description="News short summary row 1")
    newsTwo: str = Field(..., description="News short summary row 2")
    newsThree: str = Field(..., description="News short summary row 3")

# 챗봇 LLM structure
class ChatAnswerData(TypedDict):
    answer: str = Field(..., description="Chatbot answer for user query")
    related_news: Annotated[List[int], ..., "The related top 3 news for query and answer"]

# 챗봇 저장
class RelatedChatNewsData(BaseModel):
    id: str = Field(..., description="The unique identifier of the news article.")
    upload_datetime: str = Field(..., description="The upload date and time of the news article.")
    title: str = Field(..., description="The title of the news article.")
    sentiment: int = Field(..., description="The sentiment analysis score of the article. Typically, 1 for positive, -1 for negative, 0 for neutral.")
    thumbnail: Optional[str] = Field(None, description="The thumbnail image URL of the news article.")
    media: str = Field(..., description="The media source of the news article.")
    type: str = Field(..., description="The type of news(Industry or Stock)")


# 챗봇 답변 반환 객체
class ChatResponse(BaseModel):
    answer: str = Field(..., description="Chatbot answer for user query")
    relatedNews: List[RelatedChatNewsData] = Field(..., description="The related news of the user query and answer")


