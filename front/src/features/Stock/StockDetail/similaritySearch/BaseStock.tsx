import { ISimilarityStockData } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';
import { useFindStockByCode } from '@utils/uesFindStockByCode';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import blueLogo from '@assets/Stock/blueLogo.png';
import { AnalysisButton, StockImage, StockTitle, TextRight } from '@features/Stock/styledComponent';
import { FlexGapColumnCenter } from '@components/styledComponent';

const BaseStock = ({ baseStock }: { baseStock: ISimilarityStockData }) => {
  const stock = useFindStockByCode(baseStock.stockCode);
  return (
    <FlexGapColumnCenter $gap='0.5rem'>
      <StockTitle>
        <StockImage
          src={getStockImageUrl(baseStock.stockCode)}
          onError={(e) => (e.currentTarget.src = blueLogo)}
          alt=""
        />
        {stock?.stockName}
      </StockTitle>
      <TextRight>
        {baseStock.startDate} - {baseStock.endDate}
      </TextRight>
      <SimilarityChart stock={baseStock.candleData} />
      <AnalysisButton>분석하기</AnalysisButton>
    </FlexGapColumnCenter>
  );
};

export default BaseStock;
