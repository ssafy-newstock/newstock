import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SimilarityFormValues } from '@features/Stock/types';
import { useSimilaritySearchQuery } from '@hooks/useSimilaritySearchQuery';
import { useStockChartQuery } from '@hooks/useStockChartQuery';
import BaseStock from '@features/Stock/StockDetail/similaritySearch/BaseStock';
import OtherStock from '@features/Stock/StockDetail/similaritySearch/OtherStock';
import SelectionStock from '@features/Stock/StockDetail/similaritySearch/SelectionStock';
import { FlexGap } from '@components/styledComponent';
import styled from 'styled-components';
import { DividedSection, InputLabel, InputTag, InputRow } from '@features/Stock/styledComponent';

interface SimilaritySearchProps {
  stockCode: string;
}

const SimilarityGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 기본: 3열 */
  gap: 2rem;
`;

const SimilarityButton = styled.button`
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  border-radius: 1rem;
  border: none;
  padding: 0.5rem 1rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 2px solid #007BFF;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0056b3;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SimilaritySearch = ({ stockCode }: SimilaritySearchProps) => {
  const { register, handleSubmit } = useForm<SimilarityFormValues>();
  const [isSearchInitiated, setIsSearchInitiated] = useState(false);
  const [searchDates, setSearchDates] = useState<{
    start_date?: string;
    end_date?: string;
  }>({});

  const similarityQuery = useSimilaritySearchQuery(
    {
      stockCode,
      start_date: searchDates.start_date || '',
      end_date: searchDates.end_date || '',
    },
    isSearchInitiated
  );

  const chartQuery = useStockChartQuery(
    stockCode,
    {
      startDate: searchDates.start_date || '',
      endDate: searchDates.end_date || '',
    },
    isSearchInitiated
  );

  const onSubmit = handleSubmit((data) => {
    setSearchDates({
      start_date: data.start_date,
      end_date: data.end_date,
    });
    setIsSearchInitiated(true);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <FlexGap $gap="2rem">
          <InputRow>
            <InputLabel htmlFor="start_date">Start Date:</InputLabel>
            <InputTag
              id="start_date"
              type="date"
              {...register('start_date')}
              required
            />
          </InputRow>

          <InputRow>
            <InputLabel htmlFor="end_date">End Date:</InputLabel>
            <InputTag
              id="end_date"
              type="date"
              {...register('end_date')}
              required
            />
          </InputRow>

          <SimilarityButton type="submit">Search</SimilarityButton>
        </FlexGap>
      </form>

      {isSearchInitiated && (
        <DividedSection>
          {(similarityQuery.isPending || chartQuery.isPending) && (
            <p>Loading...</p>
          )}
          {(similarityQuery.error || chartQuery.error) && (
            <p>
              Error:{' '}
              {((similarityQuery.error || chartQuery.error) as Error).message}
            </p>
          )}
          {similarityQuery.data && chartQuery.data && (
            <SimilarityGrid>
              <SelectionStock
                selectionStock={chartQuery.data.data}
                stockCode={stockCode}
                startDate={searchDates.start_date || ''}
                endDate={searchDates.end_date || ''}
              />
              <BaseStock baseStock={similarityQuery.data.baseStock} />
              {similarityQuery.data.otherStock.map((otherStock) => (
                <OtherStock
                  key={otherStock.stockCode}
                  otherStock={otherStock}
                />
              ))}
            </SimilarityGrid>
          )}
        </DividedSection>
      )}
    </>
  );
};

export default SimilaritySearch;
