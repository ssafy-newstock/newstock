import uuid
from typing import Optional

from fastapi import APIRouter, Query
from similarity import calculate_similarity
from models import SimilarStockResponse


router = APIRouter()
date_pattern = r"^\d{4}-\d{2}-\d{2}$"

@router.get("/")
def get_similarity(
    base_stock_code: Optional[str] = Query(
        None,
        description="Stock code for similar search"
    ),
    start_date: Optional[str] = Query(
        None, 
        description="Start date for the similarity search.",
        regex=date_pattern
    ),
    end_date: Optional[str] = Query(
        None, 
        description="End date for the similarity search.",
        regex=date_pattern
    )
):
    base_similar, other_similarity_list = calculate_similarity(base_stock_code=base_stock_code,
                                                               start_date=start_date,
                                                               end_date=end_date)
    response = SimilarStockResponse(
        baseStock=base_similar,
        otherStock=other_similarity_list
    )
    return response