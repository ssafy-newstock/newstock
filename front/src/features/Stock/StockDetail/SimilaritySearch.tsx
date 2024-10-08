import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { SimilarityFormValues } from '@features/Stock/types';
import { useSimilaritySearchQuery } from '@hooks/useSimilaritySearchQuery';
import { useStockChartQuery } from '@hooks/useStockChartQuery';
import BaseStock from '@features/Stock/StockDetail/similaritySearch/BaseStock';
import OtherStock from '@features/Stock/StockDetail/similaritySearch/OtherStock';
import SelectionStock from '@features/Stock/StockDetail/similaritySearch/SelectionStock';
import { FlexGap } from '@components/styledComponent';
import styled from 'styled-components';
import {
  DividedSection,
  InputLabel,
  InputTag,
  InputRow,
  SkeletonDiv,
  Text,
  SimilarityButton,
} from '@features/Stock/styledComponent';
import { toast } from 'react-toastify';
import { calculateEndDate } from '@utils/calculateEndDate';
import { calculateStartDate } from '@utils/calculateStartDate';

interface SimilaritySearchProps {
  stockCode: string;
}

const SimilarityFlex = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkeletonFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SimilaritySearch = ({ stockCode }: SimilaritySearchProps) => {
  const { register, handleSubmit, setValue, watch } =
    useForm<SimilarityFormValues>();
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

  // 시작일 입력시 종료일 자동 입력
  const startDateValue = watch('start_date');
  useEffect(() => {
    if (startDateValue) {
      const endDate = calculateEndDate(startDateValue);
      setValue('end_date', endDate); // end_date 값을 설정
    }
  }, [startDateValue]);

  const endDateValue = watch('end_date');
  useEffect(() => {
    if (endDateValue) {
      const startDate = calculateStartDate(endDateValue);
      setValue('start_date', startDate); // end_date 값을 설정
    }
  }, [endDateValue]);

  const onSubmit = handleSubmit((data) => {
    setSearchDates({
      start_date: data.start_date,
      end_date: data.end_date,
    });
    setIsSearchInitiated(true);
  });

  useEffect(() => {
    if (similarityQuery.data && chartQuery.data) {
      toast.success('유사도 검색 완료');
    }
  }, [similarityQuery.data, chartQuery.data]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <FlexGap $gap="2rem">
          <InputRow>
            <InputLabel>조회 기간: </InputLabel>
            <InputTag
              id="start_date"
              type="date"
              {...register('start_date')}
              required
              style={{ textAlign: 'center' }}
            />
            <Text>~</Text>
            <InputTag
              id="end_date"
              type="date"
              {...register('end_date')}
              required
              style={{ textAlign: 'center' }}
            />
          </InputRow>

          <SimilarityButton type="submit">검색</SimilarityButton>
        </FlexGap>
      </form>

      {isSearchInitiated && (
        <DividedSection>
          {(similarityQuery.isPending || chartQuery.isPending) && (
            <SkeletonFlex>
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonDiv key={index} $width="19rem" $height="16rem" />
              ))}
            </SkeletonFlex>
          )}
          {(similarityQuery.error || chartQuery.error) && (
            <p>
              Error:{' '}
              {((similarityQuery.error || chartQuery.error) as Error).message}
            </p>
          )}
          {similarityQuery.data && chartQuery.data && (
            <SimilarityFlex>
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
            </SimilarityFlex>
          )}
        </DividedSection>
      )}
    </>
  );
};

export default SimilaritySearch;
