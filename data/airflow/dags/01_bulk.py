# from airflow import DAG
# from airflow.providers.http.operators.http import SimpleHttpOperator
# from airflow.operators.python import PythonOperator
# from airflow.utils.dates import days_ago
# from datetime import timedelta
# import logging

# # 최대 재시도 횟수
# MAX_RETRIES = 3

# # """
# # default_args의 on_failure_callback:

# #     on_failure_callback에 실패 시 호출할 콜백 함수를 설정합니다.
# #     log_failed_http_response 함수는 태스크가 실패했을 때 HTTP 응답의 상태 코드와 메시지를 로깅합니다.

# # log_failed_http_response 함수:

# #     context를 통해 task_instance를 가져옵니다.
# #     xcom_pull 메서드를 사용하여 SimpleHttpOperator 태스크의 응답을 가져옵니다.
# #     응답이 존재하면 상태 코드와 메시지를 로깅합니다.
# # """

# default_args = {
#     'owner': 'airflow',
#     'retries': 0,  # check_table_task의 최대 재시도 횟수
#     'retry_delay': timedelta(minutes=5),  # 재시도 사이의 대기 시간
# }

# # 테이블 생성 성공 시 호출되는 함수
# def print_success():
#     print("Table exists or created successfully!")

# with DAG(
#     dag_id='bulk',
#     default_args=default_args,
#     description='A DAG that gets bulk data and manages table creation',
#     schedule_interval=None,
#     start_date=days_ago(1),
#     catchup=False,
# ) as dag:

#     # 테이블 존재 여부 체크 태스크
#     check_table_task = SimpleHttpOperator(
#         task_id='check_stockmetadata_table',
#         http_conn_id='http_bulk',  # Airflow Connection ID for the HTTP server
#         endpoint='check',
#         method='GET',
#         response_check=lambda response: response.status_code == 200,
#         retries=0,  # 최대 재시도 설정
#         retry_delay=timedelta(minutes=1),  # 재시도 대기 시간
#     )

#     # 테이블 생성 태스크 (이전 태스크가 실패했을 때만 실행)
#     create_table_task = SimpleHttpOperator(
#         task_id='create_stockmetadata_table',
#         http_conn_id='http_bulk',
#         endpoint='create',
#         method='POST',
#         trigger_rule='one_failed',  # check_table_task가 실패할 때만 실행
#     )

#     # 성공 시 출력 태스크
#     print_success_task = PythonOperator(
#         task_id='print_success_task',
#         python_callable=print_success,
#         trigger_rule='none_failed',  # 실패가 없을 때 실행
#     )

#     # DAG 구성
#     check_table_task >> create_table_task >> print_success_task
#     create_table_task >> print_success_task

from airflow import DAG
from airflow.operators.http_operator import SimpleHttpOperator
from airflow.operators.python_operator import PythonOperator, BranchPythonOperator
from airflow.utils.dates import days_ago
from airflow.utils.log.logging_mixin import LoggingMixin
from datetime import timedelta
import json
import logging
import requests


# 기본 설정
default_args = {
    'owner': 'airflow',
    'retries': 0,  # check_table_task의 최대 재시도 횟수
    'retry_delay': timedelta(minutes=5),  # 재시도 사이의 대기 시간
}


def check_table(**kwargs):
    response = requests.get(
        url='http://j11c207.p.ssafy.io:8000/check',  # Use the appropriate endpoint URL here
    )    
    return response.json()



# 테이블 생성 성공 시 호출되는 함수
def print_success():
    print("Table exists or created successfully!")

# 브랜칭 결정을 위한 함수
def branch_decision(**kwargs):
    ti = kwargs['task_instance']
    response = ti.xcom_pull(task_ids='check_stockmetadata_table')
    
    logging.info(f"Response JSON: {response}")

    # 상태 코드 확인
    status_code = response.get('status_code', 500)  # 기본값 500으로 설정
    if status_code == 200:
        return 'print_success_task'
    else:
        return 'create_stockmetadata_table'

with DAG(
    dag_id='bulk',
    default_args=default_args,
    description='A DAG that gets bulk data and manages table creation',
    schedule_interval=None,
    start_date=days_ago(1),
    catchup=False,
) as dag:

    # 테이블 존재 여부 체크 태스크를 PythonOperator로 변경
    check_table_task = PythonOperator(
        task_id='check_stockmetadata_table',
        python_callable=check_table,
        provide_context=True,
        do_xcom_push=True,
    )

    # 테이블 생성 태스크
    create_table_task = SimpleHttpOperator(
        task_id='create_stockmetadata_table',
        http_conn_id='http_bulk',
        endpoint='create',
        method='POST',
    )

    # BranchPythonOperator로 경로 선택
    branch_task = BranchPythonOperator(
        task_id='branch_task',
        python_callable=branch_decision,
        provide_context=True,
    )

    # 성공 시 출력 태스크
    print_success_task = PythonOperator(
        task_id='print_success_task',
        python_callable=print_success,
    )

    # DAG 구성
    check_table_task >> branch_task
    branch_task >> [create_table_task, print_success_task]
    create_table_task >> print_success_task
