import { FlexGapCenter, FlexGapColumn } from '@components/styledComponent';
import {
  MainCardRow,
  StockPrev,
  Text,
  TextBoldLarge,
} from '@features/Stock/styledComponent';
import LineChart from './LineChart';
import { IKospiData } from '@hooks/useKospiQuery';

const StockIndexCard = ({ kospiInfo }: { kospiInfo: IKospiData }) => {
  const korea =
    'https://thumb.tossinvest.com/image/resized/16x0/https%3A%2F%2Fstatic.toss.im%2Ficons%2Fpng%2F4x%2Ficon-flag-kr.png';
  const kospi = kospiInfo?.kospi;
  return (
    <MainCardRow>
      <FlexGapColumn $gap="0.4rem">
        <FlexGapCenter $gap="0.5rem">
          <Text>{kospi.industryName}</Text>
          <img src={korea} />
        </FlexGapCenter>
        <TextBoldLarge>{kospi.bstpNmixPrpr}</TextBoldLarge>
        <StockPrev
          $isPositive={kospi.bstpNmixPrdyVrss.toString().startsWith('-')}
        >
          {kospi.bstpNmixPrdyVrss} ({kospi.bstpNmixPrdyCtrt}%)
        </StockPrev>
      </FlexGapColumn>
      <LineChart kospiChart={kospiInfo.kospiChart}/>
    </MainCardRow>
  );
};

export default StockIndexCard;
