import {
  MyStockHr,
  TitleDiv,
  TitleP,
} from '@features/MyStock/myStockStyledComponent';

const TradingHistory: React.FC = () => {
  return (
    <>
      <TitleDiv>
        <TitleP>주식 거래 내역</TitleP>
      </TitleDiv>
      <MyStockHr />
    </>
  );
};

export default TradingHistory;
