import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import {
  DetailPageButton,
  DividedSection,
  HrTag,
  SpanTag,
  StckPrice,
  StockImageDetail,
  StockPrev,
  StockTitle,
  Text,
  TextLarge,
} from '@features/Stock/styledComponent';
import {
  IFavoriteStock,
  IMutationContext,
  IStock,
} from '@features/Stock/types';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { Link, Outlet, useLocation } from 'react-router-dom';
import blueLogo from '@assets/Stock/blueLogo.png';
import TradeForm from '@features/Stock/StockDetail/TradeForm';
import { RightVacant } from '@components/RightVacant';
import { authRequest } from '@api/axiosInstance';
import { HeartFill } from '@features/Stock/HeartFill';
import { Heart } from '@features/Stock/Heart';
import useAuthStore from '@store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import LoadingPage from '@components/LodingPage';

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  // 주식 상세 정보
  const stockDetail =
    allStock?.find((s) => s.stockCode === stock.stockCode) ||
    top10Stock?.find((s) => s.stockCode === stock.stockCode);
  console.log('stockDetail', stockDetail);

  // 로그인 여부 확인
  const { isLogin } = useAuthStore();

  // 관심 종목 관련 API 호출
  const {
    data: favoriteStockList,
    isLoading,
    error,
  } = useQuery<IFavoriteStock[]>({
    queryKey: ['favoriteStockList'],
    queryFn: async () => {
      const response = await authRequest.get('/stock/favorite');
      return response.data.data;
    },
    // 초기 데이터 설정 -> 타입 설정시 undefined 고려할 필요 없어짐
    // initialData: [],
    enabled: isLogin,
  });

  const isFavorite = favoriteStockList?.some(
    (fav) => fav.stockCode === stock.stockCode
  );

  const queryClient = useQueryClient();

  // 좋아요 주식 추가 mutation
  const { mutate: addFavoriteStock } = useMutation<
    void,
    Error,
    string,
    IMutationContext
  >({
    mutationFn: async (stockCode: string) => {
      await authRequest.post(`/stock/favorite/${stockCode}`);
    },
    onMutate: async (stockCode: string) => {
      await queryClient.cancelQueries({ queryKey: ['favoriteStockList'] });

      const previousFavoriteList = queryClient.getQueryData<IFavoriteStock[]>([
        'favoriteStockList',
      ]);

      queryClient.setQueryData<IFavoriteStock[]>(
        ['favoriteStockList'],
        (old) => [
          ...(old || []),
          { stockCode, stockFavoriteId: 0, stockId: 0, stockName: '' },
        ]
      );

      return { previousFavoriteList };
    },
    onError: (err, _stockCode, context) => {
      console.log('주식 좋아요 에러', err);
      if (context?.previousFavoriteList) {
        queryClient.setQueryData<IFavoriteStock[]>(
          ['favoriteStockList'],
          context.previousFavoriteList
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteStockList'] });
    },
  });

  // 좋아요 주식 제거 mutation
  const { mutate: removeFavoriteStock } = useMutation<
    void,
    Error,
    string,
    IMutationContext
  >({
    mutationFn: async (stockCode: string) => {
      await authRequest.delete(`/stock/favorite/${stockCode}`);
    },
    onMutate: async (stockCode: string) => {
      await queryClient.cancelQueries({ queryKey: ['favoriteStockList'] });

      const previousFavoriteList = queryClient.getQueryData<IFavoriteStock[]>([
        'favoriteStockList',
      ]);

      queryClient.setQueryData<IFavoriteStock[]>(
        ['favoriteStockList'],
        (old) => old?.filter((stock) => stock.stockCode !== stockCode) || []
      );

      return { previousFavoriteList };
    },
    onError: (err, _stockCode, context) => {
      console.log('주식 좋아요 취소 에러', err);
      if (context?.previousFavoriteList) {
        queryClient.setQueryData<IFavoriteStock[]>(
          ['favoriteStockList'],
          context.previousFavoriteList
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteStockList'] });
    },
  });

  // 유사도 버튼 버튼 표시 여부
  const showButton = location.pathname.includes('daily-chart');

  // 주식 종목 이미지
  const getStockImageUrl = () => {
    // 이미지 URL 생성
    const url = `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`;
    return url;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  // 에러 발생 시 콘솔 출력
  if (error) {
    console.error('관심 주식 조회 에러', error);
  }

  return (
    <>
      <LeftStock />
      <Center style={{ padding: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
            <StockTitle>
              <StockImageDetail
                src={getStockImageUrl()}
                onError={(e) => (e.currentTarget.src = blueLogo)} // 기본 이미지 설정
                alt=""
              />
              <div>
                <SpanTag>코스피 {stock.stockCode}</SpanTag>
                <TextLarge>{stockDetail?.stockName}</TextLarge>
              </div>
            </StockTitle>
            <StckPrice>
              {stockDetail && formatChange(formatNumber(stockDetail.stckPrpr))}
              원
            </StckPrice>
            <StockPrev
              $isPositive={
                stockDetail?.prdyVrss.toString().startsWith('-') ?? false
              }
            >
              <SpanTag>어제보다</SpanTag>{' '}
              {stockDetail && formatChange(formatNumber(stockDetail.prdyVrss))}
              원 ({stockDetail?.prdyCtrt}
              %)
            </StockPrev>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {isLogin &&
              (isFavorite ? (
                <HeartFill
                  cancleFavoriteStock={() =>
                    removeFavoriteStock(stock.stockCode)
                  }
                />
              ) : (
                <Heart
                  favoriteStock={() => addFavoriteStock(stock.stockCode)}
                />
              ))}
            {showButton && <DetailPageButton>유사도 분석</DetailPageButton>}
          </div>
        </div>

        <HrTag style={{ width: '100%' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              to={`/stock-detail/${stock.stockCode}/day-chart`}
              state={{ stock }}
            >
              <DetailPageButton>1일</DetailPageButton>
            </Link>

            <Link
              to={`/stock-detail/${stock.stockCode}/week-chart`}
              state={{ stock }}
            >
              <DetailPageButton>1주</DetailPageButton>
            </Link>

            <Link
              to={`/stock-detail/${stock.stockCode}/month-chart`}
              state={{ stock }}
            >
              <DetailPageButton>1개월</DetailPageButton>
            </Link>
            
            <Link
              to={`/stock-detail/${stock.stockCode}/three-month-chart`}
              state={{ stock }}
            >
              <DetailPageButton>3개월</DetailPageButton>
            </Link>

            <Link
              to={`/stock-detail/${stock.stockCode}/year-chart`}
              state={{ stock }}
            >
              <DetailPageButton>1년</DetailPageButton>
            </Link>

            <Link
              to={`/stock-detail/${stock.stockCode}/three-year-chart`}
              state={{ stock }}
            >
              <DetailPageButton>3년</DetailPageButton>
            </Link>

            <Link
              to={`/stock-detail/${stock.stockCode}/five-year-chart`}
              state={{ stock }}
            >
              <DetailPageButton>5년</DetailPageButton>
            </Link>

          </div>
          <Text style={{ marginRight: '1rem' }}>{stock.stockIndustry}</Text>
        </div>
        <DividedSection>
          <Outlet />
        </DividedSection>
        <TradeForm
          price={stockDetail?.stckPrpr ?? stock.stckPrpr}
          stockCode={stock.stockCode}
        />
      </Center>
      <RightVacant />
    </>
  );
};

export default StockDetailPage;
