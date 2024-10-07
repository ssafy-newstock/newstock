import {
  DivTag,
  Flex,
  FlexColumn,
  FlexGap,
  FlexGapCenter,
  FlexGapColumn,
} from '@components/styledComponent';
import SentimentIcon from '@features/News/PNSubicon';
import styled from 'styled-components';
import newstockIcon from '@assets/Stock/blueLogo.png';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  Text,
  TextBold,
  TextBoldLeft,
  TextBoldLarge,
  TextLarge,
  HrTag,
} from '@features/Stock/styledComponent';

interface IRelatedNews {
  id: number;
  upload_datetime: string;
  title: string;
  sentiment: number;
  thumbnail: string;
  media: string;
}

interface IAnalysisResponse {
  macroReport: string;
  microReport: string;
  relatedNews: IRelatedNews[];
}

interface AnalysisModalProps {
  onClose?: () => void;
  analysisData?: IAnalysisResponse;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  padding: 1rem;
  border-radius: 1rem;
  min-width: 15rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const ImgTag = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  onClose,
  analysisData,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        {analysisData ? (
          <>
            <TextBoldLarge>차트 분석</TextBoldLarge>
            <HrTag />
            <h1>거시적 관점</h1>
            <p>{analysisData?.macroReport}</p>
            <HrTag />
            <h1>미시적 관점</h1>
            <p>{analysisData?.microReport}</p>
            <HrTag />
            <h3>관련 뉴스</h3>
            
            <FlexGapColumn $gap="1rem" style={{ width: '100%' }}>
              {analysisData?.relatedNews.map((news) => (
                <div>
                <FlexGapCenter key={news.id} $gap="1rem">
                  <DivTag style={{ width: '5rem', height: '3rem' }}>
                    <ImgTag
                      src={news.thumbnail || newstockIcon}
                      alt={news.title}
                    />
                  </DivTag>
                  <FlexGapColumn $gap="0.5rem">
                    <TextBoldLeft>{news.title}</TextBoldLeft>

                    <FlexGapCenter $gap="1rem" style={{ paddingLeft: '0.5rem' }}>
                      <img
                        style={{
                          width: '1rem',
                          height: '1rem',
                          borderRadius: '50%',
                        }}
                        src={`https://stock.vaiv.kr/resources/images/news/${news.media}.png`}
                        onError={(e) => {
                          e.currentTarget.src = newstockIcon;
                        }}
                      />
                      <Text>{news.media}</Text>
                      <Text>{news.upload_datetime}</Text>
                    </FlexGapCenter>
                  </FlexGapColumn>
                </FlexGapCenter>
              </div>
              ))}
            </FlexGapColumn>
            <CloseButton onClick={onClose}>Close</CloseButton>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AnalysisModal;
