import {
  MyStockHr,
  TitleDiv,
  TitleP,
} from '@features/MyStock/myStockStyledComponent';

const FavoriteStock: React.FC = () => {
  return (
    <>
      <TitleDiv>
        <TitleP>관심 종목</TitleP>
      </TitleDiv>
      <MyStockHr />
    </>
  );
};

export default FavoriteStock;
