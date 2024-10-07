import { ISimilarityStockData } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';
import { useFindStockByCode } from '@utils/uesFindStockByCode';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import blueLogo from '@assets/Stock/blueLogo.png';
import {
  AnalysisButton,
  StockImage,
  StockTitle,
  TextRight,
} from '@features/Stock/styledComponent';
import { FlexGapColumnCenter } from '@components/styledComponent';
import { useAnalysisQuery } from '@hooks/useAnalysisQuery';
import AnalysisModal from '@features/Stock/StockDetail/AnalysisModal';
import { useState } from 'react';

const OtherStock = ({ otherStock }: { otherStock: ISimilarityStockData }) => {
  const stock = useFindStockByCode(otherStock.stockCode);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openAnalysis = () => {
    setIsModalOpen(true);
  };

  const closeAnalysis = () => {
    setIsModalOpen(false);
  };

  const analysisQuery = stock
    ? useAnalysisQuery({
        analysisStock: {
          stockCode: stock?.stockCode,
          stockName: stock?.stockName,
        },
        startDate: otherStock.startDate,
        endDate: otherStock.endDate,
      })
    : null;

  return (
    <FlexGapColumnCenter $gap="0.5rem">
      <StockTitle>
        <StockImage
          src={getStockImageUrl(otherStock.stockCode)}
          onError={(e) => (e.currentTarget.src = blueLogo)}
          alt=""
        />
        {stock?.stockName}
      </StockTitle>
      <TextRight>
        {otherStock.startDate} - {otherStock.endDate}
      </TextRight>
      <SimilarityChart stock={otherStock.candleData} />
      <AnalysisButton onClick={openAnalysis}>분석하기</AnalysisButton>
      {isModalOpen && (
        <AnalysisModal
          analysisData={analysisQuery?.data}
          onClose={closeAnalysis}
        />
      )}
    </FlexGapColumnCenter>
  );
};

export default OtherStock;
