import {
  MyStockHr,
  TitleDiv,
  TitleP,
} from '@features/MyStock/myStockStyledComponent';

const StockHoldings: React.FC = () => {
  return (
    <>
      <TitleDiv>
        <TitleP>주식 보유 내역</TitleP>
      </TitleDiv>
      <MyStockHr />
    </>
  );
};

export default StockHoldings;
