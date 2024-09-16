import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Right } from '@components/Right';
import {
  SpanTag,
  StckPrice,
  StockHeader,
  StockImage,
  StockPrev,
  StockTitle,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { Link, Outlet, useLocation } from 'react-router-dom';
import blueLogo from '@assets/Stock/blueLogo.png';

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader
          style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}
        >
          <StockTitle>
            <StockImage
              src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
              alt={blueLogo}
            />
            {stock.stockName}
          </StockTitle>
          <StckPrice>{formatChange(formatNumber(stock.stckPrpr))}원</StckPrice>
          <StockPrev isPositive={stock.prdyVrss.startsWith('-')}>
            <SpanTag>어제보다</SpanTag>{' '}
            {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
            %)
          </StockPrev>
        </StockHeader>
        <nav>
          <ul>
            <li>
              <Link
                to={`/stock-detail/${stock.stockCode}/daily-chart`}
                state={{ stock }}
              >
                일봉 차트
              </Link>
            </li>
            <li>
              <Link
                to={`/stock-detail/${stock.stockCode}/live-updates`}
                state={{ stock }}
              >
                실시간 업데이트
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </Center>
      <Right />
    </>
  );
};

export default StockDetailPage;
