from pydantic import BaseModel, Field
from typing import List, Dict
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


# similarity 반환 객체
class SimilarStockResponse(BaseModel):
    baseStock: StockData = Field(..., description="Most similar base stock range.")
    otherStock: List[StockData] = Field(..., description="5 most similar stock to base stock range.")

class ReportStockData(TypedDict):
    """Report of News for specific stock code"""

    report: Annotated[str, ..., "The stock analysis with macro and microeconomic analysis "]
    # macro_summary: Annotated[str, ..., "The summary for specific stock news"]
    related_news: Annotated[List[int], ..., "The related top 4 news of the report"]