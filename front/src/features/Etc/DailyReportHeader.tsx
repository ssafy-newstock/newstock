import styled from 'styled-components';
import { DailyReportText } from '@pages/Etc/DailyReport';
import { format } from 'date-fns'; // 추가된 부분
import { subDays, isWeekend } from 'date-fns'; // 추가된 부분
import Holidays from 'date-holidays';

const DailyReportHeaderWrapper = styled.div`
  display: flex;
  height: 9.5rem;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const DailyReportHeaderTextWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;

const hd = new Holidays('KR');
// 공휴일 여부를 확인하는 함수
const isHoliday = (date: Date): boolean => {
  return !!hd.isHoliday(date);
};

// 어제 날짜가 주말이나 공휴일인 경우 마지막 평일을 찾는 함수
const getLastBusinessDay = (): Date => {
  let date = subDays(new Date(), 1); // 기본적으로 어제 날짜부터 시작

  // 주말 또는 공휴일일 경우, 평일을 찾을 때까지 하루씩 감소
  while (isWeekend(date) || isHoliday(date)) {
    date = subDays(date, 1);
  }

  return date;
};

const DailyReportHeader: React.FC = () => {
  const today = new Date();
  const lastBusinessDay = getLastBusinessDay();

  return (
    <>
      <DailyReportHeaderWrapper>
        <DailyReportHeaderTextWrapper>
          <DailyReportText fontSize="36px" fontWeight="700">
            NewStock Daily Report
          </DailyReportText>
          <DailyReportText fontSize="20px" fontWeight="400">
            {`발행일자: ${format(today, 'yyyy년 MM월 dd일')}`}
          </DailyReportText>
        </DailyReportHeaderTextWrapper>
        <DailyReportHeaderTextWrapper>
          <DailyReportText fontSize="32px" fontWeight="400">
            {`${format(lastBusinessDay, 'yyyy년 MM월 dd일')} 시황`}
          </DailyReportText>
        </DailyReportHeaderTextWrapper>
      </DailyReportHeaderWrapper>
    </>
  );
};

export default DailyReportHeader;
