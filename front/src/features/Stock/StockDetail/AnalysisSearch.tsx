import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useAnalysisQuery } from '@hooks/useAnalysisQuery';
import { calculateEndDate } from '@utils/calculateEndDate';
import { calculateStartDate } from '@utils/calculateStartDate';
import {
  InputLabel,
  InputTag,
  InputRow,
  SimilarityButton,
  Text,
  ErrorMessage,
} from '@features/Stock/styledComponent';
import { toast } from 'react-toastify';
import AnalysisModal from './AnalysisModal';
import { FlexGapCenter } from '@components/styledComponent';

interface AnalysisSearchProps {
  stockCode: string;
  stockName: string;
  startDate?: string;
  endDate?: string;
}

interface AnalysisFormValues {
  start_date: string;
  end_date: string;
}

const AnalysisSearch: React.FC<AnalysisSearchProps> = ({
  stockCode,
  stockName,
  startDate,
  endDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AnalysisFormValues>({
    defaultValues: {
      start_date: startDate, // 프랍으로 받은 startDate 기본값 설정
      end_date: endDate, // 프랍으로 받은 endDate 기본값 설정
    },
  });
  const [searchDates, setSearchDates] = useState<{
    start_date?: string;
    end_date?: string;
  }>({ start_date: startDate, end_date: endDate });

  const closeAnalysis = () => {
    setIsModalOpen(false);
  };

  const analysisQuery = useAnalysisQuery({
    analysisStock: {
      stockCode,
      stockName,
    },
    startDate: searchDates.start_date || '',
    endDate: searchDates.end_date || '',
  });

  // 시작일 입력 시 종료일 자동 설정
  const startDateValue = watch('start_date');
  useEffect(() => {
    if (startDateValue) {
      const endDate = calculateEndDate(startDateValue);
      setValue('end_date', endDate); // end_date 값을 설정
    }
  }, [startDateValue]);

  // 종료일 입력 시 시작일 자동 설정
  const endDateValue = watch('end_date');
  useEffect(() => {
    if (endDateValue) {
      const startDate = calculateStartDate(endDateValue);
      setValue('start_date', startDate); // start_date 값을 설정
    }
  }, [endDateValue]);

  // 현재 날짜 구하기
  const today = new Date().toISOString().split('T')[0];

  const onSubmit = handleSubmit((data) => {
    setIsModalOpen(true);
    setSearchDates({
      start_date: data.start_date,
      end_date: data.end_date,
    });
  });

  useEffect(() => {
    if (analysisQuery.data && isModalOpen) {
      toast.success('차트 분석 완료');
    }
  }, [analysisQuery.data]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <FlexGapCenter $gap="1rem">
          <InputRow>
            <InputLabel>차트 분석 조회 기간:</InputLabel>
            <InputTag
              id="start_date"
              type="date"
              {...register('start_date', {
                required: '시작 날짜를 입력해주세요',
                validate: (value) =>
                  value <= today ||
                  '시작일과 종료일을 오늘 이전으로 선택해주세요. ',
              })}
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
      {isModalOpen && (
        <AnalysisModal
          analysisData={analysisQuery.data}
          onClose={closeAnalysis}
        />
      )}
    </>
  );
};

export default AnalysisSearch;
