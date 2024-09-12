import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Heart } from '@features/StockMain/Heart';
import { categoryImage, categoryStock } from '@features/StockMain/category';
import styled from 'styled-components';
import StockHeader from '@features/StockMain/StockHeader';
import FavoriteStock from '@features/StockMain/FavoriteStock';
import { IStock } from '@features/StockMain/type';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { RealTimeStockFirstRow }  from '@features/StockMain/RealTimeStock';
import RealTimeStock from '@features/StockMain/RealTimeStock';

const stockData = [
  {
    stockCode: '039490',
    stockName: '키움증권',
    stockIndustry: '증권',
    stckPrpr: '125100',
    prdyVrss: '-7000',
    prdyCtrt: '-5.30',
  },
  {
    stockCode: '005930',
    stockName: '삼성전자',
    stockIndustry: '반도체',
    stckPrpr: '66100',
    prdyVrss: '1200',
    prdyCtrt: '1.80',
  },
  {
    stockCode: '000660',
    stockName: 'SK하이닉스',
    stockIndustry: '전기전자',
    stckPrpr: '167700',
    prdyVrss: '10500',
    prdyCtrt: '6.68',
  },
];

const HrTag = styled.hr`
  width: 95%;
`;

const StockGridColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px;
  padding: 0px 10px;
`;

const StockGridRow = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  gap: 5px;
  margin: 20px;
  padding: 0px 10px;
`;

const StockCardRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.5fr; /* 각 열의 너비를 설정 */
  text-align: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CategoryCardRow = styled(StockCardRow)`
  grid-template-columns: repeat(6, 1fr); /* 각 열의 너비를 설정 */
  
`

const StockTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;

  // 한줄로 넘칠 경우 ...으로 표시
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

const StckPrice = styled.div`
  font-size: 1rem;
`;

const StockPrev = styled.div<{ isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.stockBlue : theme.stockRed};
`;

const SpanTag = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textColor};
`;
const StockMainPage = () => {

  return (
    <>
      <LeftStock />
      <Center>
        
        <StockHeader>관심 종목</StockHeader>
        <HrTag />
        <StockGridColumn>
          {stockData.map((stock: IStock, index: number) => (
            <FavoriteStock key={index} stock={stock} />
          ))}
        </StockGridColumn>

        <StockHeader>실시간 차트</StockHeader>
        <HrTag />
        <StockGridRow>
          <RealTimeStockFirstRow />
          {stockData.map((stock: IStock, index: number) => (
            <RealTimeStock key={index} stock={stock}/>
          ))}
        </StockGridRow>

        <StockHeader>카테고리</StockHeader>
        <HrTag />
        <StockGridRow>
          <CategoryCardRow>
            <div>이미지</div>
            <div>카테고리</div>
            <div>지수 현재가</div>
            <div>지수 전일 대비</div>
            <div>지수 등락률</div>
            <div>누적 거래 대금</div>
          </CategoryCardRow>
          {categoryStock.map((category, index: number) => {
            const imageUrl =
              category.industryName in categoryImage
                ? categoryImage[
                    category.industryName as keyof typeof categoryImage
                  ]
                : 'default-image-url.png'; // 기본 이미지 처리
            return (
              <CategoryCardRow key={index}>
                <img src={imageUrl} alt={category.industryName} width={50} />
                <div>{category.industryName}</div>
                <div>{category.bstpNmixPrpr}</div>
                <div>{category.bstpNmixPrdyVrss}</div>
                <div>{category.bstpNmixPrdyCtrt}%</div>
                <div>{category.acmlTrPbmn}</div>
              </CategoryCardRow>
            );
          })}
        </StockGridRow>
      </Center>
    </>
  );
};

export default StockMainPage;
