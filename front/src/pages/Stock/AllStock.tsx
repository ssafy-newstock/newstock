import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import AllStock, { AllStockFirstRow } from '@features/Stock/AllStock/AllStock';
import {
  HrTag,
  StockGridRow,
  StockHeader,
  DividedSection,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { RightVacant } from '@components/RightVacant';
import { useState } from 'react';
import { ButtonWrapper, SortButton } from '@features/Stock/styledComponent';
import styled from 'styled-components';
import useAllStockStore from '@store/useAllStockStore';

const Underline = styled.div<{ $sortBy: string }>`
  position: absolute;
  bottom: -0.5rem;
  left: ${({ $sortBy }) => {
    switch ($sortBy) {
      case 'stckPrpr':
        return '0.3rem'; // 첫 번째 버튼
      case 'prdyCtrt':
        return '4.3rem'; // 두 번째 버튼 위치 (각 버튼의 너비와 여백에 맞춰 조정)
      case 'acmlTrPbmn':
        return '8.3rem'; // 세 번째 버튼 위치
      case 'acmlVol':
        return '12.3rem'; // 네 번째 버튼 위치
      default:
        return '0.3rem';
    }
  }};
  height: 0.2rem;
  width: 2.4rem; /* 밑줄의 너비 */
  background-color: ${({ theme }) => theme.textColor}; /* 밑줄 색상 */
  transition: left 0.3s ease; /* 애니메이션 효과 */
`;
const AllStockPage: React.FC = () => {
  const { allStock } = useAllStockStore();
  const [sortBy, setSortBy] = useState<
    'stckPrpr' | 'prdyCtrt' | 'acmlTrPbmn' | 'acmlVol'
  >('stckPrpr');

  // if (isAllStockLoading) {
  //   return <div>Loading...</div>;
  // }

  const sortData = (data: IStock[]) => {
    return data.sort((a, b) => {
      switch (sortBy) {
        case 'stckPrpr':
          return b.stckPrpr - a.stckPrpr;
        case 'prdyCtrt':
          return b.prdyCtrt - a.prdyCtrt;
        case 'acmlTrPbmn':
          return b.acmlTrPbmn - a.acmlTrPbmn;
        case 'acmlVol':
          return b.acmlVol - a.acmlVol;
        default:
          return 0;
      }
    });
  };

  const sortedStockData = sortData([...allStock]);

  return (
    <>
      <LeftStock />
      <Center style={{ padding: '1rem' }}>
        <StockHeader>전체 종목</StockHeader>
        <HrTag />
        {/* 정렬 버튼 추가 */}
        <ButtonWrapper>
          <SortButton onClick={() => setSortBy('stckPrpr')}>현재가</SortButton>
          <SortButton onClick={() => setSortBy('prdyCtrt')}>등락률</SortButton>
          <SortButton onClick={() => setSortBy('acmlTrPbmn')}>
            거래금
          </SortButton>
          <SortButton onClick={() => setSortBy('acmlVol')}>거래량</SortButton>
          <Underline $sortBy={sortBy} />
        </ButtonWrapper>
        <DividedSection>
          <StockGridRow>
            <AllStockFirstRow />
            {sortedStockData.map((stock: IStock, index: number) => (
              <AllStock key={index} stock={stock} />
            ))}
          </StockGridRow>
        </DividedSection>
      </Center>
      <RightVacant />
    </>
  );
};

export default AllStockPage;
