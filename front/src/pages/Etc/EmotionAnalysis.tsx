import styled from 'styled-components';
import { DailyReportText } from './DailyReport';
import DonutChart from '@features/Etc/DonutChart';

const EmotionAnalysisWrapper = styled.div`
  width: 45%;
  /* height: 13rem; */
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const EmotionalAnalysisBodyWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const EmotionAnalysisGraphWrapper = styled.div`
  display: flex;
  padding: 25px;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  max-width: 100%; /* 부모의 크기를 넘지 않도록 설정 */
  overflow: hidden;
`;

export const EmotionalAnalysisTextWrapper = styled.div`
  padding: 10px;
  align-items: center;
  align-self: stretch;
`;

const EmotionAnalysis: React.FC = () => {
  // 총 뉴스 건수 배열
  const totalCounts = [43265, 14000]; // 긍정 뉴스, 부정 뉴스 건수

  return (
    <>
      <EmotionAnalysisWrapper>
        <EmotionalAnalysisTextWrapper>
          <DailyReportText fontSize="32px" fontWeight="500">
            뉴스 감정분석
          </DailyReportText>
        </EmotionalAnalysisTextWrapper>
        <EmotionalAnalysisBodyWrapper>
          <EmotionAnalysisGraphWrapper>
            <DonutChart
              labels={['긍정뉴스', '부정뉴스']}
              series={[76, 24]}
              colors={['#4285F4', '#EA4335']}
              totalCounts={totalCounts}
            />
          </EmotionAnalysisGraphWrapper>
        </EmotionalAnalysisBodyWrapper>
      </EmotionAnalysisWrapper>
    </>
  );
};

export default EmotionAnalysis;
