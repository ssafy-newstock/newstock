import { IDaily } from '@features/Stock/types';
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
import { useState } from 'react';
import AnalysisModal from '@features/Stock/StockDetail/AnalysisModal';

interface SelectionStockProps {
  selectionStock: IDaily[];
  stockCode: string;
  startDate: string;
  endDate: string;
}

const SelectionStock = ({
  selectionStock,
  stockCode,
  startDate,
  endDate,
}: SelectionStockProps) => {
  const stock = useFindStockByCode(stockCode);

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
        startDate: startDate,
        endDate: endDate,
      })
    : null;

  return (
    <FlexGapColumnCenter $gap="0.5rem">
      <StockTitle>
        <StockImage
          src={getStockImageUrl(stockCode)}
          onError={(e) => (e.currentTarget.src = blueLogo)}
          alt=""
        />
        {stock?.stockName}
      </StockTitle>

      <TextRight>
        {startDate} - {endDate}
      </TextRight>
      <SimilarityChart selectionStock={selectionStock} />
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

export default SelectionStock;
