import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import styled from 'styled-components';

interface IStock {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: string;
  prdyVrss: string;
  prdyCtrt: string;
}

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

const StockHeader = styled.div`
  font-size: 2rem;
  /* font-size: 24px; */
  font-weight: bold;
  margin: 20px;
  padding: 0px 10px;
`;

const HrTag = styled.hr`
  width: 95%;
`;

const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px;
  padding: 0px 10px;
`;

const StockGridRow = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
  margin: 20px;
  padding: 0px 10px;
`;

const StockCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 1rem;
  padding: 10px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StockCardRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 10px;
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
        <StockGrid>
          {stockData.map((stock: IStock, index: number) => (
            <StockCard key={index}>
              <StockCardTitle>
                <StockTitle>
                  <StockImage
                    src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                    alt={stock.stockName}
                  />
                  {stock.stockName}
                </StockTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M15 26.6875L13.1875 25.0375C6.75 19.2 2.5 15.3375 2.5 10.625C2.5 6.7625 5.525 3.75 9.375 3.75C11.55 3.75 13.6375 4.7625 15 6.35C16.3625 4.7625 18.45 3.75 20.625 3.75C24.475 3.75 27.5 6.7625 27.5 10.625C27.5 15.3375 23.25 19.2 16.8125 25.0375L15 26.6875Z"
                    fill="#F63C3C"
                  />
                </svg>
              </StockCardTitle>
              <StckPrice>
                {formatChange(formatNumber(stock.stckPrpr))}원
              </StckPrice>
              <StockPrev isPositive={stock.prdyVrss.startsWith('-')}>
                <SpanTag>어제보다</SpanTag>{' '}
                {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
                %)
              </StockPrev>
            </StockCard>
          ))}
        </StockGrid>

        <StockHeader>실시간 차트</StockHeader>
        <HrTag />
        <StockGridRow>
          {stockData.map((stock: IStock, index: number) => (
            <StockCardRow key={index}>
              <StockTitle>
                <StockImage
                  src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                  alt={stock.stockName}
                />
                {stock.stockName}
              </StockTitle>
              <StckPrice>
                {formatChange(formatNumber(stock.stckPrpr))}원
              </StckPrice>
              <StockPrev isPositive={stock.prdyVrss.startsWith('-')}>
                <SpanTag>어제보다</SpanTag>{' '}
                {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
                %)
              </StockPrev>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M15.125 23.1875L15 23.3125L14.8625 23.1875C8.925 17.8 5 14.2375 5 10.625C5 8.125 6.875 6.25 9.375 6.25C11.3 6.25 13.175 7.5 13.8375 9.2H16.1625C16.825 7.5 18.7 6.25 20.625 6.25C23.125 6.25 25 8.125 25 10.625C25 14.2375 21.075 17.8 15.125 23.1875ZM20.625 3.75C18.45 3.75 16.3625 4.7625 15 6.35C13.6375 4.7625 11.55 3.75 9.375 3.75C5.525 3.75 2.5 6.7625 2.5 10.625C2.5 15.3375 6.75 19.2 13.1875 25.0375L15 26.6875L16.8125 25.0375C23.25 19.2 27.5 15.3375 27.5 10.625C27.5 6.7625 24.475 3.75 20.625 3.75Z"
                  fill="#F63C3C"
                />
              </svg>
            </StockCardRow>
          ))}
        </StockGridRow>
      </Center>
    </>
  );
};

export default StockMainPage;
