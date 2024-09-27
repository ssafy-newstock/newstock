import styled from 'styled-components';
import { EmotionalAnalysisTextWrapper } from '@pages/Etc/EmotionAnalysis';
import { DailyReportText } from '@pages/Etc/DailyReport'; // DailyReportText가 미리 선언되어야 함
// import SummaryNewsModal from './SummaryNewsModal';

const SummaryNewsWrapper = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  align-self: stretch;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const NewsWrapper = styled.div`
  display: flex; /* flex로 변경 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  padding: 10px 0px;
  gap: 5px; /* 요소들 사이 간격 */
  margin: 10px 0px;
`;

// DailyReportText를 상속받아 NewsText를 선언
const NewsText = styled.p<{
  $lineLimit: number;
  fontSize?: string;
  fontWeight?: string;
  textColor?: string;
}>`
  color: ${({ textColor, theme }) => textColor || theme.textColor};
  font-size: ${({ fontSize }) => fontSize || '36px'};
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  line-height: 30px; /* 83.333% */
  display: -webkit-box;
  -webkit-line-clamp: ${({ $lineLimit }) => $lineLimit};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* ...으로 표시 */
`;

const SummaryNews: React.FC = () => {
  return (
    <>
      <SummaryNewsWrapper>
        <EmotionalAnalysisTextWrapper>
          <DailyReportText fontSize="32px" fontWeight="500">
            주요 뉴스 요약
          </DailyReportText>
          <NewsWrapper>
            <NewsText fontSize="25px" fontWeight="500" $lineLimit={1}>
              미국 노동절 및 경제 지표 발표 일정
            </NewsText>
            <NewsText fontSize="20px" fontWeight="400" $lineLimit={2}>
              9월 2일은 미국 노동절로 인해 금융시장이 휴장했지만, 9월 3일 이후
              여러 중요한 경제 지표들이 발표될 예정입니다. 여기에는 8월 S&P
              글로벌 제조업 PMI, 공급관리협회(ISM) 제조업 PMI, 7월 건설지출 등이
              포함됩니다. 9월 6일에는 8월 비농업 부문 신규 고용 및 실업률도
              발표될 예정입니다
            </NewsText>
          </NewsWrapper>
          <NewsWrapper>
            <NewsText fontSize="25px" fontWeight="500" $lineLimit={1}>
              미국 노동절 및 경제 지표 발표 일정
            </NewsText>
            <NewsText fontSize="20px" fontWeight="400" $lineLimit={2}>
              9월 2일은 미국 노동절로 인해 금융시장이 휴장했지만, 9월 3일 이후
              여러 중요한 경제 지표들이 발표될 예정입니다. 여기에는 8월 S&P
              글로벌 제조업 PMI, 공급관리협회(ISM) 제조업 PMI, 7월 건설지출 등이
              포함됩니다. 9월 6일에는 8월 비농업 부문 신규 고용 및 실업률도
              발표될 예정입니다
            </NewsText>
          </NewsWrapper>
        </EmotionalAnalysisTextWrapper>
      </SummaryNewsWrapper>
    </>
  );
};

export default SummaryNews;
