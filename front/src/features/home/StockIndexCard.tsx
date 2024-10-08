import {  FlexGapCenter, FlexGapColumn } from '@components/styledComponent';
import {
  MainCardRow,
  StockPrev,
  Text,
  TextBoldLarge,
} from '@features/Stock/styledComponent';
import LineChart from './LineChart';
// import { formatChange } from '@utils/formatChange';
// import { formatNumber } from '@utils/formatNumber';

const StockIndexCard = () => {
  const korea =
    'https://thumb.tossinvest.com/image/resized/16x0/https%3A%2F%2Fstatic.toss.im%2Ficons%2Fpng%2F4x%2Ficon-flag-kr.png';

  return (
    <MainCardRow>
      <FlexGapColumn $gap="0.4rem">
        <FlexGapCenter $gap="0.5rem">
          <Text>코스피</Text>
          <img src={korea} />
        </FlexGapCenter>
        <TextBoldLarge>2,600,09</TextBoldLarge>
        {/* <StockPrev $isPositive={stock.prdyVrss.toString().startsWith('-')}> */}
        <StockPrev $isPositive={false}>
          {/* {formatChange(formatNumber(stock.prdyVrss))} */}
          -9.5 (0.3%)
        </StockPrev>
      </FlexGapColumn>
      <LineChart />
    </MainCardRow>
  );
};

export default StockIndexCard;
