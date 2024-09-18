import {
  StckPrice,
  StockCardRow,
  StockImage,
  StockPrev,
  StockTitle,
  Text,
  TextLeft,
} from '@features/Stock/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { formatUnit } from '@utils/formatUnit';
import { IStock } from '@features/Stock/types';
import blueLogo from '@assets/Stock/blueLogo.png'; // 기본 이미지
import { useNavigate } from 'react-router-dom';

// Header Row Component
export const AllStockFirstRow = () => {
  return (
    <StockCardRow>
      <TextLeft>종목명</TextLeft>
      <Text>현재가</Text>
      <Text>등락률</Text>
      <Text>거래대금</Text>
      <Text>거래량</Text>
    </StockCardRow>
  );
};

// All Stock Component
const AllStock = ({ stock }: { stock: IStock }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}`, { state: { stock } });
  };

  const getStockImageUrl = () => {
    // 이미지 URL 생성
    const url = `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`;
    return url;
  };
  
  return (
    <StockCardRow onClick={handleNavigate}>
      <StockTitle>
        <StockImage
          src={getStockImageUrl()}
          onError={(e) => (e.currentTarget.src = blueLogo)} // 기본 이미지 설정
          alt=""
        />
        {stock.stockName}
      </StockTitle>
      <StckPrice>{formatNumber(stock.stckPrpr)}원</StckPrice>
      <StockPrev isPositive={stock.prdyVrss.toString().startsWith('-')}>
        {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
        %)
      </StockPrev>
      <Text>{formatUnit(stock.acmlTrPbmn)}</Text>
      <Text>{formatNumber(stock.acmlVol)}주</Text>
    </StockCardRow>
  );
};

export default AllStock;
