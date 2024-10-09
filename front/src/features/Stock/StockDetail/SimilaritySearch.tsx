import { useForm } from 'react-hook-form';
import { Fragment, useEffect, useState } from 'react';
import { SimilarityFormValues } from '@features/Stock/types';
import { useSimilaritySearchQuery } from '@hooks/useSimilaritySearchQuery';
import { useStockChartQuery } from '@hooks/useStockChartQuery';
import BaseStock from '@features/Stock/StockDetail/similaritySearch/BaseStock';
import OtherStock from '@features/Stock/StockDetail/similaritySearch/OtherStock';
import SelectionStock from '@features/Stock/StockDetail/similaritySearch/SelectionStock';
import { FlexGap, FlexGapCenter } from '@components/styledComponent';
import styled from 'styled-components';
import {
  DividedSection,
  InputLabel,
  InputTag,
  InputRow,
  SkeletonDiv,
  Text,
  SimilarityButton,
  ErrorMessage,
} from '@features/Stock/styledComponent';
import { toast } from 'react-toastify';
import { calculateEndDate } from '@utils/calculateEndDate';
import { calculateStartDate } from '@utils/calculateStartDate';

interface SimilaritySearchProps {
  stockCode: string;
}

const SimilarityGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;

  & > :first-child {
    grid-row: 1 / span 2; /* 첫 번째 자식이 첫 번째와 두 번째 행을 차지 */
    grid-column: 1 / span 2; /* 첫 번째 자식이 첫 번째와 두 번째 열을 차지 */
  }
`;

const SimilaritySearch = ({ stockCode }: SimilaritySearchProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SimilarityFormValues>();
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

  // 현재 날짜 구하기
  const today = new Date().toISOString().split('T')[0];

  const onSubmit = handleSubmit((data) => {
    setSearchDates({
      start_date: data.start_date,
      end_date: data.end_date,
    });
    setIsSearchInitiated(true);
  });

  useEffect(() => {
    if (similarityQuery.data && chartQuery.data) {
      toast.success('유사도 분석 완료');
    }
  }, [similarityQuery.data, chartQuery.data]);

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <FlexGapCenter $gap="1rem">
          <InputRow>
            <InputLabel>조회 기간: </InputLabel>
            <InputTag
              id="start_date"
              type="date"
              {...register('start_date', {
                required: '시작 날짜를 입력해주세요',
                validate: (value) =>
                  value <= today ||
                  '시작일과 종료일을 오늘 이전으로 선택해주세요. ',
              })}
              required
              style={{ textAlign: 'center' }}
            />
            <Text>~</Text>
            <InputTag
              id="end_date"
              type="date"
              {...register('end_date', {
                required: '종료 날짜를 입력해주세요',
                validate: (value) =>
                  value <= today || '종료일을 오늘 이전으로 선택해주세요.',
              })}
              required
              style={{ textAlign: 'center' }}
            />
          </InputRow>
          <SimilarityButton type="submit">검색</SimilarityButton>
          {errors.start_date && errors.end_date && (
            <ErrorMessage>{errors.start_date.message}</ErrorMessage>
          )}
          {!errors.start_date && errors.end_date && (
            <ErrorMessage>{errors.end_date.message}</ErrorMessage>
          )}
        </FlexGapCenter>
      </form>

      {isSearchInitiated && (
        <DividedSection>
          {(similarityQuery.isPending || chartQuery.isPending) && (
            <SimilarityGrid>
              <SkeletonDiv $width="38rem" $height="32rem" />
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonDiv key={index} $width="19rem" $height="16rem" />
              ))}
            </SimilarityGrid>
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
    </Fragment>
  );
};

export default SimilaritySearch;
