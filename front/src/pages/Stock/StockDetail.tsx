import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import {
  DividedSection,
  HrTag,
  SpanTag,
  StckPrice,
  StockImage,
  StockPrev,
  StockTitle,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { Link, Outlet, useLocation } from 'react-router-dom';
import blueLogo from '@assets/Stock/blueLogo.png';
import styled from 'styled-components';
import TradeForm from '@features/Stock/StockDetail/TradeForm';
import { RightVacant } from '@components/RightVacant';
import { axiosInstance } from '@api/axiosInstance';
import { HeartFill } from '@features/Stock/HeartFill';
import { Heart } from '@features/Stock/Heart';
import useAuthStore from '@store/useAuthStore';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const Button = styled.div`
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;

interface IFavoriteStock {
  stockFavoriteId: number;
  stockId: number;
  stockCode: string;
  stockName: string;
}

interface IMutationContext {
  previousFavoriteList: IFavoriteStock[] | undefined;
}

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  const initialPrice = Number(stock.stckPrpr);
  const { isLogin } = useAuthStore();

  const { data: favoriteStockList, isLoading } = useQuery<IFavoriteStock[]>({
    queryKey: ['favoriteStockList'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/stock/favorite');
      return response.data.data;
    },
    enabled: isLogin,
  });

  const isFavorite = favoriteStockList?.some(
    (fav) => fav.stockCode === stock.stockCode
  );

  const queryClient = useQueryClient();

  // 좋아요 주식 추가 mutation
  const { mutate: addFavoriteStock } = useMutation<void, Error, string, IMutationContext>({
    mutationFn: async (stockCode: string) => {
      await axiosInstance.post(`/api/stock/favorite/${stockCode}`);
    },
    onMutate: async (stockCode: string) => {
      await queryClient.cancelQueries({queryKey:['favoriteStockList']});

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
    onError: (err, stockCode, context) => {
      if (context?.previousFavoriteList) {
        queryClient.setQueryData<IFavoriteStock[]>(
          ['favoriteStockList'],
          context.previousFavoriteList
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:['favoriteStockList']});
    },
  });

  // 좋아요 주식 제거 mutation
  const { mutate: removeFavoriteStock } = useMutation<void, Error, string, IMutationContext>({
    mutationFn: async (stockCode: string) => {
      await axiosInstance.delete(`/api/stock/favorite/${stockCode}`);
    },
    onMutate: async (stockCode: string) => {
      await queryClient.cancelQueries({queryKey:['favoriteStockList']});

      const previousFavoriteList = queryClient.getQueryData<IFavoriteStock[]>([
        'favoriteStockList',
      ]);

      queryClient.setQueryData<IFavoriteStock[]>(
        ['favoriteStockList'],
        (old) => old?.filter((stock) => stock.stockCode !== stockCode) || []
      );

      return { previousFavoriteList };
    },
    onError: (err, stockCode, context) => {
      if (context?.previousFavoriteList) {
        queryClient.setQueryData<IFavoriteStock[]>(
          ['favoriteStockList'],
          context.previousFavoriteList
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:['favoriteStockList']});
    },
  });
  const showButton = location.pathname.includes('daily-chart');

  const getStockImageUrl = () => {
    // 이미지 URL 생성
    const url = `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`;
    return url;
  };
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <StockTitle>
              <StockImage
                src={getStockImageUrl()}
                onError={(e) => (e.currentTarget.src = blueLogo)} // 기본 이미지 설정
                alt=""
              />
              {stock.stockName}
            </StockTitle>
            <StckPrice>
              {formatChange(formatNumber(stock.stckPrpr))}원
            </StckPrice>
            <StockPrev $isPositive={stock.prdyVrss.toString().startsWith('-')}>
              <SpanTag>어제보다</SpanTag>{' '}
              {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
              %)
            </StockPrev>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {isLogin &&
              (isFavorite ? (
                <HeartFill cancleFavoriteStock={() => removeFavoriteStock(stock.stockCode)} />
              ) : (
                <Heart favoriteStock={() => addFavoriteStock(stock.stockCode)} />
              ))}
            {showButton && <Button>유사도 분석</Button>}
          </div>
        </div>

        <HrTag style={{ width: '100%' }} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to={`/stock-detail/${stock.stockCode}/daily-chart`}
            state={{ stock }}
          >
            <Button>일봉</Button>
          </Link>
          <Link
            to={`/stock-detail/${stock.stockCode}/live-updates`}
            state={{ stock }}
          >
            <Button>실시간</Button>
          </Link>
        </div>
        <DividedSection>
          <Outlet />
        </DividedSection>
        <TradeForm initialPrice={initialPrice} stockCode={stock.stockCode} />
      </Center>
      <RightVacant />
    </>
  );
};

export default StockDetailPage;
