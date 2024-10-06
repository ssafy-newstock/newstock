import { ISimilarityStockData } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';
import { useFindStockByCode } from '@utils/uesFindStockByCode';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import blueLogo from '@assets/Stock/blueLogo.png';
import { AnalysisButton, StockImage, StockTitle, TextRight } from '@features/Stock/styledComponent';
import { FlexGapColumnCenter } from '@components/styledComponent';


const OtherStock = ({ otherStock }: { otherStock: ISimilarityStockData }) => {
  const stock = useFindStockByCode(otherStock.stockCode);
  return (
    <FlexGapColumnCenter $gap='0.5rem'>
      <StockTitle>
      <StockImage
        src={getStockImageUrl(otherStock.stockCode)}
        onError={(e) => (e.currentTarget.src = blueLogo)}
        alt=""
      />{stock?.stockName}
      </StockTitle>
      <TextRight>
        {otherStock.startDate} - {otherStock.endDate}
      </TextRight>
      <SimilarityChart stock={otherStock.candleData} />
      <AnalysisButton>분석하기</AnalysisButton>
    </FlexGapColumnCenter>
  );
};

export default OtherStock;
