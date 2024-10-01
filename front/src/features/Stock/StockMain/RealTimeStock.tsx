import {
  StckPrice,
  StockCardRow,
  StockImage,
  StockPrev,
  StockTitle,
  Text,
  TextBoldLeft,
  TextBold,
} from '@features/Stock/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { formatUnit } from '@utils/formatUnit';
import { IStock } from '@features/Stock/types';
import blueLogo from '@assets/Stock/blueLogo.png';
import { useNavigate } from 'react-router-dom';


export const RealTimeStockFirstRow = () => {
  return (
    <StockCardRow style={{cursor:'default'}}>
      <TextBoldLeft>종목명</TextBoldLeft>
      <TextBold>현재가</TextBold>
      <TextBold>등락률</TextBold>
      <TextBold>거래대금</TextBold>
      <TextBold>거래량</TextBold>
    </StockCardRow>
  );
};

const RealTimeStock = ({stock}:{stock:IStock}) => {
  const navigate = useNavigate();

    // 주식 상세 페이지 + 월봉 차트 조회
  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}/day-chart`, { state: { stock } });
  };
  return (
      <StockCardRow onClick={handleNavigate}>
        <StockTitle>
          <StockImage
            src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
            alt={blueLogo}
          />
          {stock.stockName}
        </StockTitle>
        <StckPrice>{formatNumber(stock.stckPrpr)}원</StckPrice>
        <StockPrev $isPositive={stock.prdyVrss.toString().startsWith('-')}>
          {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
          %)
        </StockPrev>
        <Text>{formatUnit(stock.acmlTrPbmn)}원</Text>
        <Text>{formatNumber(stock.acmlVol)}주</Text>
      </StockCardRow>
  );
};
export default RealTimeStock;
