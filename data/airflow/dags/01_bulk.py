from airflow import DAG
from airflow.operators.http_operator import SimpleHttpOperator
from airflow.operators.python_operator import PythonOperator, BranchPythonOperator
from airflow.utils.dates import days_ago
from airflow.utils.log.logging_mixin import LoggingMixin
from datetime import timedelta
import requests

# 기본 설정
"""
default_args의 on_failure_callback:

    on_failure_callback에 실패 시 호출할 콜백 함수를 설정합니다.
    log_failed_http_response 함수는 태스크가 실패했을 때 HTTP 응답의 상태 코드와 메시지를 로깅합니다.

log_failed_http_response 함수:

    context를 통해 task_instance를 가져옵니다.
    xcom_pull 메서드를 사용하여 SimpleHttpOperator 태스크의 응답을 가져옵니다.
    응답이 존재하면 상태 코드와 메시지를 로깅합니다.
"""
default_args = {
    'owner': 'airflow',
    'retries': 0,
    'retry_delay': timedelta(minutes=5),
}

# 테이블 체크 함수
def check_table(**kwargs):
    response = requests.get(
        url='http://j11c207.p.ssafy.io:8000/check',  # 적절한 엔드포인트로 변경 필요
    )
    return {
        'status_code': response.status_code,
        'response_body': response.json()
    }

# limit 체크 함수
def check_limit(**kwargs):
    response = requests.get(
        url='http://j11c207.p.ssafy.io:8000/limit/check',  # 적절한 엔드포인트로 변경 필요
    )
    return {
        'status_code': response.status_code,
        'response_body': response.json()
    }

# 테이블 생성 성공 시 호출되는 함수
def print_success():
    print("Table exists or created successfully!")

# 테이블 존재 여부에 따라 분기 결정
def branch_decision(**kwargs):
    ti = kwargs['task_instance']
    result = ti.xcom_pull(task_ids='check_table_task')
    
    status_code = result.get('status_code', 500)  # 기본값 500
    print(f"status code {status_code}")
    if status_code == 200:
        print("Branching to 'check_limit_task'")
        return 'check_limit_task'
    else:
        print("Branching to 'check_limit_task'")
        return 'create_stockmetadata_table_task'

# limit 체크 후 분기 결정
def branch_decision_limit(**kwargs):
    ti = kwargs['task_instance']
    result = ti.xcom_pull(task_ids='check_limit_task')
    
    status_code = result.get('status_code', 500)
    if status_code == 200:
        return 'print_success_task'
    else:
        return 'download_stock_limit_task'

# DAG 정의
with DAG(
    dag_id='bulk',
    default_args=default_args,
    description='A DAG that manages table creation and bulk data download',
    schedule_interval=None,
    start_date=days_ago(1),
    catchup=False,
) as dag:

    # 테이블 존재 여부 체크
    check_table_task = PythonOperator(
        task_id='check_table_task',
        python_callable=check_table,
        provide_context=True,
        do_xcom_push=True,
    )

    # 분기 결정 (테이블 체크 후)
    branch_task = BranchPythonOperator(
        task_id='branch_task',
        python_callable=branch_decision,
        provide_context=True,
    )

    # 테이블 생성
    create_stockmetadata_table_task = SimpleHttpOperator(
        task_id='create_stockmetadata_table_task',
        http_conn_id='http_bulk',
        endpoint='create',
        method='POST',
    )

    # 주식 리스트 다운로드
    download_stock_list_task = SimpleHttpOperator(
        task_id='download_stock_list_task',
        http_conn_id='http_bulk',
        endpoint='download',
        method='POST',
    )

    # limit 체크
    check_limit_task = PythonOperator(
        task_id='check_limit_task',
        python_callable=check_limit,
        provide_context=True,
        do_xcom_push=True,
        trigger_rule = 'all_done'
        
    )

    # limit 체크 후 분기 결정
    branch_limit_task = BranchPythonOperator(
        task_id='branch_limit_task',
        python_callable=branch_decision_limit,
        provide_context=True,
    )

    # limit 다운로드
    download_stock_limit_task = SimpleHttpOperator(
        task_id='download_stock_limit_task',
        http_conn_id='http_bulk',
        endpoint='limit/download',
        method='POST',
    )

    # 성공 시 출력 태스크
    print_success_task = PythonOperator(
        task_id='print_success_task',
        python_callable=print_success,
        
    )

    # DAG 구성
    check_table_task >> branch_task

    # branch_task 분기 처리
    branch_task >> check_limit_task >> branch_limit_task
    branch_task >> create_stockmetadata_table_task >> download_stock_list_task >> check_limit_task

    check_limit_task >> branch_limit_task

    # branch_limit_task 분기 처리
    branch_limit_task >> print_success_task
    branch_limit_task >> download_stock_limit_task >> print_success_task
