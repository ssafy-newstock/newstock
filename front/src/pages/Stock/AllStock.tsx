import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import AllStock, { AllStockFirstRow } from '@features/Stock/AllStock/AllStock';
import {
  HrTag,
  StockGridRow,
  StockHeader,
  DividedSection,
  SearchInputWrapper,
  SearchInput,
  IconWrapper,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { RightVacant } from '@components/RightVacant';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { ButtonWrapper, SortButton } from '@features/Stock/styledComponent';
import styled from 'styled-components';
import useAllStockStore from '@store/useAllStockStore';
import SearchIcon from '@features/Stock/AllStock/SearchIcon';
import useTop10StockStore from '@store/useTop10StockStore';
import LoadingSpinner from '@components/LoadingSpinner';

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
  const [filteredStocks, setFilteredStocks] = useState<IStock[]>([]); // 필터링된 주식 목록

  // allStock과 top10Stock이 변경될 때마다 filteredStocks 업데이트
  useEffect(() => {
    const filtered = wholeStock.filter((stock) =>
      stock.stockName.includes(query)
    );
    setFilteredStocks(filtered);
  }, [wholeStock, query]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

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
            <Suspense fallback={<LoadingSpinner />}>
              {sortedStockData.map((stock: IStock, index: number) => (
                <AllStock key={index} stock={stock} />
              ))}
            </Suspense>
          </StockGridRow>
        </DividedSection>
      </Center>
      <RightVacant />
    </>
  );
};

export default AllStockPage;
