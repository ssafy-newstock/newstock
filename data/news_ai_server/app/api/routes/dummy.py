import uuid
from typing import Optional

from fastapi import APIRouter, Query
from utils import connect_jdbc


router = APIRouter()
date_pattern = r"^\d{4}-\d{2}-\d{2}$"

@router.get("")
def get_dummy():
    print("Dummy Controller")
    print("Dummy Connect Success")
    
    connect_jdbc()

    return "Dummy Success"