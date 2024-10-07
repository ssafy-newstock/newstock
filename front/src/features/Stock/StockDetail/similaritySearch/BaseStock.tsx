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
import { useState } from 'react';
import { useAnalysisQuery } from '@hooks/useAnalysisQuery';
import AnalysisModal from '@features/Stock/StockDetail/AnalysisModal';

const BaseStock = ({ baseStock }: { baseStock: ISimilarityStockData }) => {
  const stock = useFindStockByCode(baseStock.stockCode);
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
        startDate: baseStock.startDate,
        endDate: baseStock.endDate,
      })
    : null;

  return (
    <FlexGapColumnCenter $gap="0.5rem">
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

export default BaseStock;
