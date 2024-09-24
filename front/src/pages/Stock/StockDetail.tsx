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
import { useEffect, useState } from 'react';
import { axiosInstance } from '@api/axiosInstance';
import { HeartFill } from '@features/Stock/HeartFill';
import { Heart } from '@features/Stock/Heart';
import useAuthStore from '@store/useAuthStore';

const Button = styled.div`
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  const initialPrice = Number(stock.stckPrpr);
  const { isLogin } = useAuthStore();

  // 즐겨찾기 상태
  const [isFavorite, setIsFavorite] = useState(false);

  // 즐겨찾기 데이터를 불러와서 해당 주식이 즐겨찾기 상태인지 확인
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/stock/favorite');
        const favorites = response.data.data;

        // 현재 주식이 즐겨찾기 목록에 있는지 확인
        const isFav = favorites.some(
          (fav: { stockCode: string }) => fav.stockCode === stock.stockCode
        );
        setIsFavorite(isFav);
      } catch (error) {
        console.error('즐겨찾기 데이터를 가져오는 중 오류 발생', error);
      }
    };

    fetchFavorites();
  }, [stock.stockCode]);

  const favoriteStock = async () => {
    try {
      await axiosInstance.post(`/api/stock/favorite/${stock.stockCode}`);
      setIsFavorite(true);
    } catch (error) {
      console.error('즐겨찾기 추가 중 오류 발생', error);
    }
  };

  const cancleFavoriteStock = async () => {
    try {
      await axiosInstance.delete(`/api/stock/favorite/${stock.stockCode}`);
      setIsFavorite(false);
    } catch (error) {
      console.error('즐겨찾기 취소 중 오류 발생', error);
    }
  };

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
            {isLogin && (isFavorite ? <HeartFill cancleFavoriteStock={cancleFavoriteStock}/> : <Heart favoriteStock={favoriteStock} />)}
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
