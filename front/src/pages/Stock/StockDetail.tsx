import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Right } from '@components/Right';
import {
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

const Button = styled.div`
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  const initialPrice = Number(stock.stckPrpr);
  return (
    <>
      <LeftStock />
      <Center style={{ padding: '0rem 1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
              <StockTitle>
                <StockImage
                  src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                  alt={blueLogo}
                />
                {stock.stockName}
              </StockTitle>
              <StckPrice>
                {formatChange(formatNumber(stock.stckPrpr))}원
              </StckPrice>
              <StockPrev isPositive={stock.prdyVrss.startsWith('-')}>
                <SpanTag>어제보다</SpanTag>{' '}
                {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
                %)
              </StockPrev>
            </div>
            <Button>유사도 분석</Button>
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
          <Outlet />
          <TradeForm initialPrice={initialPrice} />
        </div>
      </Center>
      <Right />
    </>
  );
};

export default StockDetailPage;
