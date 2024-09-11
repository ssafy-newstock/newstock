from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
import requests
from datetime import timedelta

default_args = {
    'owner': 'airflow',
    'retries': 0,
    'retry_delay': timedelta(minutes=5),
}

def send_and_check_request(**kwargs):
    url = 'http://j11c207.p.ssafy.io:8000/test'
    # url = 'http://127.0.0.1:8000/test'

    
    try:
        response = requests.get(url)
        response.raise_for_status()  # HTTP 오류 발생 시 예외를 발생시킴

        if response.status_code == 200:
            # 성공 시 메시지를 출력
            result = response.json().get("message", "No message found")
            print(f"Request succeeded with message: {result}")
        else:
            # 실패 시 상태 코드를 출력
            print(f"Unhandled status code: {response.status_code}")
            response.raise_for_status()  # 상태 코드가 200이 아닐 때 예외를 발생시킴

    except requests.exceptions.HTTPError as http_err:
        # 500 에러 및 기타 HTTP 오류를 처리
        error_message = http_err.response.json().get("detail", "No detail provided")
        print(f"HTTP error occurred: {error_message}")
        raise
    except Exception as err:
        # 기타 오류를 처리
        print(f"Other error occurred: {err}")
        raise

with DAG(
    dag_id='http_request_check_single_task_dag',
    default_args=default_args,
    description='A DAG that sends an HTTP request and checks the response in a single task',
    schedule_interval=None,
    start_date=days_ago(1),
    catchup=False,
) as dag:

    send_and_check_task = PythonOperator(
        task_id='send_and_check_request',
        python_callable=send_and_check_request,
        provide_context=True,
    )

    send_and_check_task
