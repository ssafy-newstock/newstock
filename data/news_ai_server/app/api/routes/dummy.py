import logging

from fastapi import APIRouter, Query
from dummy import dummy_count


logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


router = APIRouter()
date_pattern = r"^\d{4}-\d{2}-\d{2}$"

@router.get("")
def get_dummy():
    result = logging.info("Dummy Controller")
    
    
    result = dummy_count()
    logging.info("Dummy Connect Success")
    return result