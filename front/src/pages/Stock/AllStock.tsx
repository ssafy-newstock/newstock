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
import { useMemo, useState } from 'react';
import { ButtonWrapper, SortButton } from '@features/Stock/styledComponent';
import styled from 'styled-components';
import useAllStockStore from '@store/useAllStockStore';
import SearchIcon from '@features/Stock/AllStock/SearchIcon';
import useTop10StockStore from '@store/useTop10StockStore';

const Underline = styled.div<{ $sortBy: string }>`
  position: absolute;
  bottom: -0.5rem;
  left: ${({ $sortBy }) => {
    switch ($sortBy) {
      case 'stckPrpr':
        return '0.3rem';
      case 'prdyCtrt':
        return '4.3rem';
      case 'acmlTrPbmn':
        return '8.3rem';
      case 'acmlVol':
        return '12.3rem';
      default:
        return '0.3rem';
    }
  }};
  height: 0.2rem;
  width: 2.4rem;
  background-color: ${({ theme }) => theme.textColor};
  transition: left 0.3s ease;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  width: 100%;
  border-radius: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 1.5rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const AllStockPage: React.FC = () => {
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const wholeStock = useMemo(() => {
    return (allStock || []).concat(top10Stock || []);
  }, [allStock, top10Stock]);

  const [sortBy, setSortBy] = useState<
    'stckPrpr' | 'prdyCtrt' | 'acmlTrPbmn' | 'acmlVol'
  >('stckPrpr');

  const [query, setQuery] = useState(''); // 검색어 상태
  const [filteredStocks, setFilteredStocks] = useState<IStock[]>(allStock); // 필터링된 주식 목록

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // 검색어에 맞게 주식 목록 필터링
    const filtered = wholeStock.filter((stock) =>
      stock.stockName.includes(value)
    );
    setFilteredStocks(filtered);
  };

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

  const sortedStockData = sortData([...filteredStocks]);

  return (
    <>
      <LeftStock />
      <Center style={{ padding: '1rem' }}>
        <StockHeader>전체 종목</StockHeader>
        <HrTag />

        {/* 검색창 추가 */}
        <SearchInputWrapper>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
          <SearchInput
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="주식 종목 검색"
          />
        </SearchInputWrapper>

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
