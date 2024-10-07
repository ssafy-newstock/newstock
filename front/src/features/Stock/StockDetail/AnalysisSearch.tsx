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
} from '@features/Stock/styledComponent';
import { toast } from 'react-toastify';
import AnalysisModal from './AnalysisModal';
import { FlexGap } from '@components/styledComponent';

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
  const { register, handleSubmit, setValue, watch } =
    useForm<AnalysisFormValues>({
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

  const onSubmit = handleSubmit((data) => {
    setIsModalOpen(true);
    setSearchDates({
      start_date: data.start_date,
      end_date: data.end_date,
    });
  });

  useEffect(() => {
    if (analysisQuery.data) {
      toast.success('차트 분석 완료');
    }
  }, [analysisQuery.data]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <FlexGap $gap="2rem">
          <InputRow>
            <InputLabel>차트 분석 조회 기간:</InputLabel>
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
