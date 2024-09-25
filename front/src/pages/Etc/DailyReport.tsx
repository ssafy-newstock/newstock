import styled from 'styled-components';
import LeftNews from '@components/LeftNews';
import { Center } from '@components/Center';
import { Right } from '@components/Right';
import BookmarkedNews from '@features/News/BookmarkedNews';
import { format, subDays, isWeekend } from 'date-fns'; // 추가된 부분
import Holidays from 'date-holidays';
import StockChart from '@features/Etc/StockChart';
import StockTable from '@features/Etc/StockTable';

const DairyReportCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const DairyReportWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #f7f7f7;
`;

const DairyReportHeaderWrapper = styled.div`
  display: flex;
  height: 9.5rem;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const DairyReportHeaderTextWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;

const DairyReportText = styled.p<{ fontSize?: string; fontWeight?: string }>`
  color: #000;
  font-size: ${({ fontSize }) => fontSize || '36px'};
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  line-height: 30px; /* 83.333% */
`;

const KospiWrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const KospiTextWrapper = styled.div`
  padding: 10px;
  align-self: stretch;
`;

const KospiGraphWrapper = styled.div`
  height: 412px;
  padding: 24px;
  align-self: stretch;
  border: 1px solid var(--Apex-Grey-200, #bbc5ca);
  background-color: var(--Apex-White-100, #fff);

  /* Shadows/Drop Shadow 2 */
  box-shadow: 0px 3px 8px 0px rgba(34, 34, 34, 0.24);
`;

const DairyReportRight = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
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

const DailyReportPage = () => {
  const today = new Date();
  const lastBusinessDay = getLastBusinessDay();

  return (
    <>
      <LeftNews />

      <Center>
        <DairyReportCenter>
          <DairyReportWrapper>
            <DairyReportHeaderWrapper>
              <DairyReportHeaderTextWrapper>
                <DairyReportText fontSize="36px" fontWeight="700">
                  NewStock Daily Report
                </DairyReportText>
                <DairyReportText fontSize="20px" fontWeight="400">
                  {`발행일자: ${format(today, 'yyyy년 MM월 dd일')}`}
                </DairyReportText>
              </DairyReportHeaderTextWrapper>
              <DairyReportHeaderTextWrapper>
                <DairyReportText fontSize="32px" fontWeight="400">
                  {`${format(lastBusinessDay, 'yyyy년 MM월 dd일')} 시황`}
                </DairyReportText>
              </DairyReportHeaderTextWrapper>
            </DairyReportHeaderWrapper>
            <KospiWrapper>
              <KospiTextWrapper>
                <DairyReportText fontSize="32px" fontWeight="500">
                  코스피(KOSPI) 지수
                </DairyReportText>
              </KospiTextWrapper>
              <KospiGraphWrapper>
                <StockChart />
              </KospiGraphWrapper>
              <StockTable />
            </KospiWrapper>
          </DairyReportWrapper>
        </DairyReportCenter>
      </Center>

      <Right>
        <DairyReportRight>
          <BookmarkedNews />
        </DairyReportRight>
      </Right>
    </>
  );
};

export default DailyReportPage;
