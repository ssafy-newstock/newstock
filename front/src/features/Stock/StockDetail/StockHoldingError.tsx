import {
  HoldingStockCardRow,
  HoldingStockCardRowNone,
  HoldingStockGridRow,
  HrTag,
  Text,
  TextLeft,
} from '@features/Stock/styledComponent';

const StockHoldingError = () => {
  return (
    <>
      <HrTag />
      <HoldingStockGridRow>
        <HoldingStockCardRow>
          <TextLeft>종목명</TextLeft>
          <Text>보유 수량</Text>
          <Text>1주 평균 금액</Text>
          <Text>투자 원금</Text>
          <Text>평가 금액</Text>
        </HoldingStockCardRow>
        <HoldingStockCardRowNone>
          <Text>해당 종목의 보유 주식이 없습니다.</Text>
        </HoldingStockCardRowNone>
      </HoldingStockGridRow>
    </>
  );
};

export default StockHoldingError;
