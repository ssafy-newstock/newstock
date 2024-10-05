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
import { DividedSection } from '@features/Stock/styledComponent';

interface SimilaritySearchProps {
  stockCode: string;
}

const SimilarityGrid = styled.div`
  display: flex;
  flex-wrap: wrap; /* 요소들이 넘어갈 수 있도록 설정 */
  gap: 2rem; /* 요소 간 간격 */
  width: 100%;
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
    <div style={{width:"100%"}}>
      <form onSubmit={onSubmit}>
        <FlexGap $gap="2rem">
          <div>
            <label htmlFor="start_date">Start Date:</label>
            <input
              id="start_date"
              type="date"
              {...register('start_date')}
              required
            />
          </div>

          <div>
            <label htmlFor="end_date">End Date:</label>
            <input
              id="end_date"
              type="date"
              {...register('end_date')}
              required
            />
          </div>

          <button type="submit">Search</button>
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
    </div>
  );
};

export default SimilaritySearch;
