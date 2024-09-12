import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Heart } from '@features/StockMain/Heart';
import { HeartFill } from '@features/StockMain/HeartFill';
import { categoryImage, categoryStock } from '@features/StockMain/category';
import styled from 'styled-components';
import StockHeader from '@features/StockMain/StockHeader';
import FavoriteStock from '@features/StockMain/FavoriteStock';
import { IStock } from '@features/StockMain/type';


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

const StockCardTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

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
  const formatNumber = (number: string): string => {
    // 쉼표가 포함된 숫자를 포맷팅
    return new Intl.NumberFormat().format(Number(number.replace(/,/g, '')));
  };

  const formatChange = (change: string) => {
    // 변경값이 '-'로 시작하지 않으면 '+'를 붙여줍니다.
    return change.startsWith('-') ? change : `+${change}`;
  };

  return (
    <>
      <LeftStock />
      <Center>
        
        <StockHeader>관심 종목</StockHeader>
        <HrTag />
        <StockGridColumn>
          {stockData.map((stock: IStock, index: number) => (
            <FavoriteStock key={index} stock={stock}/>
          ))}
        </StockGridColumn>

        <StockHeader>실시간 차트</StockHeader>
        <HrTag />
        <StockGridRow>
          <StockCardRow>
            <div>종목명</div>
            <div>현재가</div>
            <div>등락률</div>
            <div></div>
          </StockCardRow>
          {stockData.map((stock: IStock, index: number) => (
            <StockCardRow key={index}>
            <StockCardTitle>
              <StockTitle>
                <StockImage
                  src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                  alt={stock.stockName}
                />
                {stock.stockName}
              </StockTitle>
              <HeartFill />
            </StockCardTitle>
            <StckPrice>
              {formatChange(formatNumber(stock.stckPrpr))}원
            </StckPrice>
            <StockPrev isPositive={stock.prdyVrss.startsWith('-')}>
              <SpanTag>어제보다</SpanTag>{' '}
              {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
              %)
            </StockPrev>
          </StockCardRow>
        ))}
        </StockGridRow>





        <StockHeader>카테고리</StockHeader>
        <HrTag />
        <StockGridRow>
          <StockCardRow>
            <div>이미지</div>
            <div>카테고리</div>
            <div>현재가</div>
            <div>전일비</div>
            <div>등락률</div>
            <div>거래량</div>
          </StockCardRow>
          {categoryStock.map((category, index: number) => {
            const imageUrl =
              category.industryName in categoryImage
                ? categoryImage[
                    category.industryName as keyof typeof categoryImage
                  ]
                : 'default-image-url.png'; // 기본 이미지 처리
            return (
              <StockCardRow key={index}>
                <img src={imageUrl} alt={category.industryName} width={50} />
                <div>{category.industryName}</div>
                <div>{category.bstpNmixPrpr}</div>
                <div>{category.bstpNmixPrdyVrss}</div>
                <div>{category.bstpNmixPrdyCtrt}%</div>
                <div>{category.acmlTrPbmn}</div>
              </StockCardRow>
            );
          })}
        </StockGridRow>
      </Center>
    </>
  );
};

export default StockMainPage;
