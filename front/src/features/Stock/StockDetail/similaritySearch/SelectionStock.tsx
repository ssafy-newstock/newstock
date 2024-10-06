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
      <AnalysisButton>분석하기</AnalysisButton>
    </FlexGapColumnCenter>
  );
};

export default SelectionStock;
