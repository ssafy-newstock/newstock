import logging
from utils import connect_jdbc

logging.basicConfig(level=logging.INFO,
                    format='%(levelname)s:  %(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


def dummy_count():
    
    query = """
        SELECT COUNT(*)
        FROM ph_stock_news
        where news_id = 20190903100147907
        """
 
    # JayDeBeAPI를 사용하여 Phoenix에 연결
    connection = connect_jdbc()
    cursor = None
    try:
        cursor = connection.cursor()

        # PreparedStatement 실행
        cursor.execute(query)  # 쿼리와 함께 매개변수 전달
        results = cursor.fetchall()  # 결과 가져오기

        # 결과 반환
        return results

    except Exception as e:
        logger.error(f"Error executing query: {e}")
        return None

    finally:
        # 커밋 및 연결 종료
        if cursor:
            cursor.close()
        if connection:
            connection.commit()
            connection.close()
        logger.info("Connection closed successfully!")