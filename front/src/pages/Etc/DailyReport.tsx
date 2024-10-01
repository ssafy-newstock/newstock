import styled from 'styled-components';
import { Center } from '@components/Center';

import DailyReportHeader from '@features/Etc/DailyReportHeader';
import Kospi from '@features/Etc/Kospi';
import EmotionAnalysis from './EmotionAnalysis';
import SummaryNews from '@features/Etc/SummaryNews';
import Left from '@components/Left';

const DailyReportCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const DailyReportWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: ${({ theme }) => theme.dailyWrapperColor};
`;

export const DailyReportText = styled.p<{
  fontSize?: string;
  fontWeight?: string;
}>`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ fontSize }) => fontSize || '36px'};
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  line-height: 30px; /* 83.333% */
`;

const EmotionSummaryWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const DailyReportPage: React.FC = () => {
  return (
    <>
      <Left />
      <Center>
        <DailyReportCenter>
          <DailyReportWrapper>
            <DailyReportHeader />
            <Kospi />

            <EmotionSummaryWrapper>
              <EmotionAnalysis />
              <SummaryNews />
            </EmotionSummaryWrapper>
          </DailyReportWrapper>
        </DailyReportCenter>
      </Center>
    </>
  );
};

export default DailyReportPage;
