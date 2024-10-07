import numpy as np
import pandas as pd
from utils import get_stock_data, get_all_stock_data_for_industry
from models import StockData, CandleData
from typing import List, Tuple
def calculate_similarity(base_stock_code: str, start_date=None, end_date=None) -> Tuple[List]:
    """기본 주식 코드와 유사한 다른 주식의 유사도를 계산합니다.

    Args:
        base_stock_code (str): 기준이 되는 주식 코드.
        start_date: 시작 날짜 (선택적).
        end_date: 종료 날짜 (선택적).

    Returns:
        tuple: 기준 주식의 유사도 리스트와 다른 주식의 유사도 리스트.
    """

    # 계산의 기초가 되는 가격 정보 수집
    base_code_close_price_array = get_price_array(base_stock_code, start_date, end_date)
    # window_size(슬라이딩 우니도우 진행할 때 필요)
    window_size = len(base_code_close_price_array)

    # 특정 산업군에 있는 종목들에 대한 모든 가격 추출
    base_stock_whole_price_array, base_stock_whole_price_df, other_stock_whole_price_array, other_stock_whole_price_df= get_whole_price_array(base_stock_code)

    # 유사도 축정
    base_similarity_score, base_index_results = calculate_base_cosine_similarity(base_stock_whole_price_array, base_code_close_price_array)
    other_similarity_score, other_index_results = calculate_cosine_similarity(other_stock_whole_price_array, base_code_close_price_array)

    base_similarity_list = extract_base_similarity(base_similarity_score,
                                                    base_index_results,
                                                    base_stock_whole_price_df,
                                                    window_size)
    
    other_similarity_list = extract_other_similarity(other_similarity_score,
                                                     other_index_results,
                                                     other_stock_whole_price_df,
                                                     window_size)


    return base_similarity_list, other_similarity_list
    
    

def get_price_array(base_stock_code, start_date, end_date) -> np.array:
    """기준 주식 코드의 가격 정보를 가져옵니다.

    Args:
        base_stock_code (str): 기준 주식 코드.
        start_date: 시작 날짜 (선택적).
        end_date: 종료 날짜 (선택적).

    Returns:
        np.array: 주식의 종가 배열.
    """
    # 계산의 기초가 되는 가격 정보 수집
    base_code_stock_price_df = get_stock_data(base_stock_code, start_date, end_date)
    # 종가 기준 price array 추출
    base_code_close_price_array = extract_base_close_prices_array(base_code_stock_price_df)

    return base_code_close_price_array


def get_whole_price_array(base_stock_code: str) -> Tuple[np.array, pd.DataFrame, np.array, pd.DataFrame]:
    """기준 주식 코드에 대한 전체 가격 데이터를 가져옵니다.

    Args:
        base_stock_code (str): 기준 주식 코드.

    Returns:
        tuple: 기준 주식과 다른 주식의 종가 배열 및 데이터프레임.
    """
    all_code_price_df = get_all_stock_data_for_industry(base_stock_code)
    # 주식 코드 기준으로 데이터 나누기
    base_stock_whole_price_df = all_code_price_df[all_code_price_df['stock_code'] == base_stock_code]
    other_stock_whole_price_df = all_code_price_df[all_code_price_df['stock_code'] != base_stock_code]

    # 행렬곱 하기 위해 np.array로 추출
    base_whole_close_price_array, price_df = extract_close_price(base_stock_whole_price_df)
    other_whole_close_price_array, price_df = extract_close_price(other_stock_whole_price_df)

    return (base_whole_close_price_array, base_stock_whole_price_df,
            other_whole_close_price_array, other_stock_whole_price_df)

def extract_base_close_prices_array(price_df: pd.DataFrame) -> np.array:
    """기본 주식 코드의 종가 배열을 추출합니다.

    Args:
        price_df (pd.DataFrame): 주식 가격 데이터프레임.

    Returns:
        np.array: 주식의 종가 배열.
    """

    # 주식 코드와 종가(Close) 값을 기준으로 n*1 형태의 numpy 배열을 생성
    # 모든 주식의 Close 값을 포함하는 리스트 초기화
    close_prices_list = []

    # 각 stock_code별로 Close 값을 추출
    for stock_code, group in price_df.groupby('stock_code'):
        # Close 값을 numpy 배열로 변환하여 리스트에 추가
        close_prices_list.append(group['Close'].values.reshape(-1, 1))

    # 모든 주식의 Close 값을 수직으로 쌓아서 하나의 2D NumPy 배열로 변환
    base_code_price_numpy = np.vstack(close_prices_list)

    return base_code_price_numpy

def extract_close_price(price_df: pd.DataFrame) -> np.array:
    """주식 가격 데이터에서 종가를 추출합니다.

    Args:
        price_df (pd.DataFrame): 주식 가격 데이터프레임.

    Returns:
        tuple: 종가 배열과 가격 데이터프레임.
    """

    # 각 stock_code에 대해 날짜별로 Close 값을 가져옴
    stock_groups = price_df.groupby('stock_code')

    # 모든 stock_code에 대해 실제 거래일만 추출 (주말 제외)
    all_dates = pd.to_datetime(price_df['stock_candle_day'].unique())
    all_dates = all_dates[all_dates.weekday < 5]  # 주말 제외 (월~금, weekday < 5)

    # 각 stock_code별로 가장 긴 날짜 범위에 맞춰서 가격 데이터를 정렬하고, 없는 값은 NaN으로 채움
    stock_price_dict = {}
    for stock_code, group in stock_groups:
        # 날짜를 인덱스로 설정하고 'Close' 값만 가져옴, 주말을 제외한 거래일만 남김
        group = group.set_index('stock_candle_day').reindex(all_dates)['Close']
        # NaN 값을 이전 값으로 채움
        group = group.ffill()

        # 값을 오른쪽 정렬 (NaN이 뒤로 오게)
        non_nan_values = group.dropna().values  # NaN이 아닌 값만 추출
        nan_count = len(all_dates) - len(non_nan_values)  # NaN의 개수 계산
        stock_price_dict[stock_code] = np.concatenate([non_nan_values, np.full(nan_count, np.nan)])  # NaN을 뒤로 붙임
    
    # 각 stock_code를 행으로 하고, 열은 날짜에 따른 Close 가격으로 배열을 구성
    price_df = pd.DataFrame.from_dict(stock_price_dict, orient='index', columns=all_dates)

    # NumPy 배열로 변환
    price_array = price_df.to_numpy()

    return price_array, price_df

def normalize_series(series: np.array):
    """주식 가격을 min-max scale 활용해서 정규화

    Args:
        series (np.array): 정규화할 시리즈.

    Returns:
        np.array: 정규화된 시리즈.
    """

    # NaN을 제외한 최소, 최대값 계산
    min_val = np.nanmin(series)
    max_val = np.nanmax(series)
    
    # 모든 값이 같을 경우 (최소값과 최대값이 같을 경우)
    if max_val == min_val:
        return np.zeros_like(series)  # 모든 값이 같으면 0으로 반환

    # 정규화 (NaN은 유지)
    normalized = (series - min_val) / (max_val - min_val)
    
    return normalized

def calculate_base_cosine_similarity(base_whole_close_price_array: np.array, base_code_close_price_array: np.array) -> Tuple:
    """기준 주식의 코사인 유사도를 계산합니다.

    Args:
        base_whole_close_price_array (np.array): 기준 주식의 전체 가격 배열.
        base_code_close_price_array (np.array): 기준 주식의 가격 배열.

    Returns:
        tuple: 최댓값 유사도와 인덱스.
    """

    # base_code_price_numpy의 길이를 슬라이딩 윈도우의 크기로 설정
    window_size = base_code_close_price_array.shape[0]
    
    # M: 다른 스톡의 개수 (행 수)
    # K: 총 날짜 개수 (열 수)
    M, K = base_whole_close_price_array.shape

    # 최댓값을 저장할 배열 (M x 1), 초기값은 음의 무한대
    max_similarities = np.full((M,), -np.inf)

    # 최댓값이 갱신된 인덱스를 저장할 배열 (M x 1), 초기값은 -1로 설정
    max_indices = np.full((M,), -1)

    # base_code_price_numpy 정규화 (1차원 배열이므로 바로 정규화)
    base_code_price_numpy_normalized = normalize_series(base_code_close_price_array)

    # other_code_price를 주식별로 (행별로) 정규화
    base_whole_code_price_normalized = np.array([normalize_series(base_whole_close_price_array[i, :]) for i in range(M)])

    max_similarities = -np.inf
    for start in range(K - window_size + 1):
        # 슬라이딩 윈도우로 other_code_price에서 부분 배열 추출
        window = base_whole_code_price_normalized[:, start:start + window_size]  # M x window_size

        # 벡터화된 배열로 변환
        other_vector = window.reshape(-1, 1)  # window_size x 1
        
        # 내적
        dot_product = np.dot(base_code_price_numpy_normalized.T, other_vector)  # 1 x 1

        # 크기 계산
        base_norm = np.linalg.norm(base_code_price_numpy_normalized)  # ||A|| 
        other_norm = np.linalg.norm(other_vector)  # ||B||

        # 코사인 유사도 계산
        cosine_similarity = dot_product / (base_norm * other_norm) if base_norm and other_norm else 0

        # 최댓값 및 인덱스 갱신
        print(f"cosine similarity: {cosine_similarity[0, 0]}, type: {type(cosine_similarity[0, 0])}")
        if cosine_similarity[0, 0] > max_similarities and cosine_similarity[0, 0] < 1.0:
            print("완료1")
            max_similarities = cosine_similarity[0, 0]
            print("완료2")
            max_indices = start
        print("완료3")
    
    return max_similarities, max_indices

def calculate_cosine_similarity(other_whole_close_price_array: np.array, base_code_close_price_array: np.array):
    """다른 주식의 코사인 유사도를 계산합니다.

    Args:
        other_whole_close_price_array (np.array): 다른 주식의 가격 배열.
        base_code_close_price_array (np.array): 기준 주식의 가격 배열.

    Returns:
        tuple: 유사도 점수와 인덱스.
    """

    # base_code_price_numpy의 길이를 슬라이딩 윈도우의 크기로 설정
    window_size = base_code_close_price_array.shape[0] #
    
    # M: 다른 스톡의 개수 (행 수)
    # K: 총 날짜 개수 (열 수)
    M, K = other_whole_close_price_array.shape

    # 최댓값을 저장할 배열 (M x 1), 초기값은 음의 무한대
    max_similarities = np.full((M,), -np.inf)

    # 최댓값이 갱신된 인덱스를 저장할 배열 (M x 1), 초기값은 -1로 설정
    max_indices = np.full((M,), -1)

    # base_code_price_numpy 정규화 (1차원 배열이므로 바로 정규화)
    base_code_price_numpy_normalized = normalize_series(base_code_close_price_array) #

    # other_code_price를 주식별로 (행별로) 정규화
    other_code_price_normalized = np.array([normalize_series(other_whole_close_price_array[i, :]) for i in range(M)])

    for start in range(K - window_size + 1):
        # 슬라이딩 윈도우로 other_code_price에서 부분 배열 추출
        window = other_code_price_normalized[:, start:start + window_size]  # M x window_size
        # 코사인 유사도 계산
        for i in range(M):
            # NaN 값이 포함된 경우 계산하지 않고 건너뛰기
            if np.isnan(window[i]).any():
                continue

            # 벡터화된 배열로 변환
            other_vector = window[i].reshape(-1, 1)  # window_size x 1
            
            # 내적
            dot_product = np.dot(base_code_price_numpy_normalized.T, other_vector)  # 1 x 1

            # 크기 계산
            base_norm = np.linalg.norm(base_code_price_numpy_normalized)  # ||A|| 
            other_norm = np.linalg.norm(other_vector)  # ||B||

            # 코사인 유사도 계산
            cosine_similarity = dot_product / (base_norm * other_norm) if base_norm and other_norm else np.array(0).reshape(1, 1)

            # 최댓값 및 인덱스 갱신
            if cosine_similarity[0, 0] > max_similarities[i]:
                max_similarities[i] = cosine_similarity[0, 0]
                max_indices[i] = start


    return max_similarities, max_indices
def extract_base_similarity(base_similarity_score: int,
                            base_index_results: int,
                            base_stock_whole_price_df: pd.DataFrame,
                            window_size: int) -> StockData:

    """기준 주식에 대한 유사도를 추출합니다.

    Args:
        base_similarity_score (int): 기준 주식 유사도 점수.
        base_index_results (int): 기준 주식 유사도 인덱스.
        base_stock_whole_price_df (pd.DataFrame): 기준 주식 가격 데이터프레임.
        window_size (int): 슬라이딩 윈도우의 크기.

    Returns:
        List[StockData]: 기준 주식 유사도 리스트.
    """

    # 전체 종가 데이터에서 가장 유사한 곳 가져옴
    similar_df = base_stock_whole_price_df[base_index_results:base_index_results + window_size].reset_index(drop=True)

    stock_code = similar_df.loc[0, 'stock_code']
    start_date = similar_df.loc[0, 'stock_candle_day']
    end_date = similar_df.loc[len(similar_df) - 1, 'stock_candle_day']

    # JSON 형식으로 변환
    candle_data_list = similar_df.rename(columns={
        'stock_candle_day': 'date',
        'Close': 'close',
        'High': 'high',
        'Low': 'low',
        'Open': 'open'
    })[['date', 'close', 'high', 'low', 'open']].to_dict(orient='records')

    # CandleData 리스트로 변환
    candle_data = [CandleData(**data) for data in candle_data_list]

    # StockData 반환
    stock_data = StockData(
        stockCode=stock_code,
        similarityScore=base_similarity_score,
        startDate=start_date,
        endDate=end_date,
        candleData=candle_data
    )

    return stock_data

def extract_other_similarity(other_similarity_scores: np.array,
                             other_index_results: np.array,
                             other_stock_whole_price_df: pd.DataFrame,
                             window_size: int) -> List[StockData]:

    """다른 주식에 대한 유사도를 추출합니다.

    Args:
        other_similarity_score (np.array): 다른 주식 유사도 점수.
        other_index_results (np.array): 다른 주식 유사도 인덱스.
        other_stock_whole_price_df (pd.DataFrame): 다른 주식 가격 데이터프레임.
        window_size (int): 슬라이딩 윈도우의 크기.

    Returns:
        List[StockData]: 다른 주식 유사도 리스트.
    """

    # similarity에서 가장 큰 3가지 뽑기.
    other_top_3_code_idx = np.argsort(other_similarity_scores)[-3:][::-1]
    other_top_3_date_index = other_index_results[other_top_3_code_idx]
    # stock_code 기준으로 그룹화하여 각각의 DataFrame으로 저장
    grouped = other_stock_whole_price_df.groupby('stock_code')

    # 각 그룹을 개별 DataFrame으로 저장
    stock_dfs = {stock_code: group.reset_index(drop=True) for stock_code, group in grouped}
    similar_stocks = []
    
    # 각각의 idx마다
    print(len(other_index_results))
    print(other_top_3_code_idx)
    print(other_index_results)
    print(other_top_3_date_index)
    for code_idx, date_idx in zip(other_top_3_code_idx, other_top_3_date_index):
        stock_code = other_stock_whole_price_df['stock_code'].unique()[code_idx]  # Get the stock code
        
        # 유사한 데이터 프레임 가져오기
        similar_df = stock_dfs[stock_code][date_idx: date_idx + window_size].reset_index(drop=True)
        # Start and end dates
        start_date = similar_df.loc[0, 'stock_candle_day']
        end_date = similar_df.loc[len(similar_df) - 1, 'stock_candle_day']

        # JSON 형식으로 변환
        candle_data_list = similar_df.rename(columns={
            'stock_candle_day': 'date',
            'Close': 'close',
            'High': 'high',
            'Low': 'low',
            'Open': 'open'
        })[['date', 'close', 'high', 'low', 'open']].to_dict(orient='records')

        # CandleData 리스트로 변환
        candle_data = [CandleData(**data) for data in candle_data_list]

        # StockData 반환
        stock_data = StockData(
            stockCode=stock_code,
            similarityScore=other_similarity_scores[code_idx],
            startDate=start_date,
            endDate=end_date,
            candleData=candle_data
        )

        similar_stocks.append(stock_data)

    return similar_stocks
