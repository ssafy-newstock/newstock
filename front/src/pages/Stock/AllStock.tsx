import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { Center } from '@components/Center';
import AllStock, { AllStockFirstRow } from '@features/Stock/AllStock/AllStock';
import {
  HrTag,
  StockGridRow,
  StockHeader,
  DividedSection,
  SearchInputWrapper,
  SearchInput,
  IconWrapper,
  ButtonWrapper,
  SortButton,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { RightVacant } from '@components/RightVacant';
import useAllStockStore from '@store/useAllStockStore';
import SearchIcon from '@features/Stock/AllStock/SearchIcon';
import useTop10StockStore from '@store/useTop10StockStore';
import LoadingSpinner from '@components/LoadingSpinner';
import Left from '@components/Left';

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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  border-radius: 1rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInput = styled.input`
  width: 50px;
  margin: 0 0.5rem;
  padding: 0.5rem;
  text-align: center;
  border: none;
  border-radius: 1rem;
`;

const AllStockPage: React.FC = () => {
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const [sortBy, setSortBy] = useState<
    'stckPrpr' | 'prdyCtrt' | 'acmlTrPbmn' | 'acmlVol'
  >('stckPrpr');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('1');
  const itemsPerPage = 15;

  const wholeStock = useMemo(() => {
    return (top10Stock || []).concat(allStock || []);
  }, [allStock, top10Stock]);

  const sortData = useCallback(
    (data: IStock[]) => {
      return [...data].sort((a, b) => {
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
    },
    [sortBy]
  );

  const filteredAndSortedStocks = useMemo(() => {
    const filtered = wholeStock.filter((stock) =>
      stock.stockName.toLowerCase().includes(query.toLowerCase())
    );
    return sortData(filtered);
  }, [wholeStock, query, sortData]);

  const totalPages = Math.ceil(filteredAndSortedStocks.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
      setInputPage(totalPages.toString() || '1');
    }
  }, [totalPages, currentPage]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAndSortedStocks.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredAndSortedStocks, itemsPerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    setInputPage('1');
  };

  const handlePageChange = (pageNumber: number) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
    setInputPage(newPage.toString());
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      const pageNumber = parseInt(inputPage, 10);
      if (!isNaN(pageNumber)) {
        handlePageChange(pageNumber);
      }
    }
  };

  return (
    <>
      <Left />
      <Center style={{ padding: '1rem' }}>
        <StockHeader>전체 종목</StockHeader>
        <HrTag />

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
              {currentItems.map((stock: IStock, index: number) => (
                <AllStock key={`${stock.stockCode}-${index}`} stock={stock} />
              ))}
            </Suspense>
          </StockGridRow>
        </DividedSection>

        <PaginationWrapper>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </PageButton>
          <PageInput
            type="text"
            value={inputPage}
            onChange={handlePageInputChange}
            onKeyPress={handlePageInputKeyPress}
          />
          <span> / {totalPages}</span>
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </PageButton>
        </PaginationWrapper>
      </Center>
    </>
  );
};

export default AllStockPage;
