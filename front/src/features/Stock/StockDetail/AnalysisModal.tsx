import { Flex, FlexColumn } from '@components/styledComponent';
import SentimentIcon from '@features/News/PNSubicon';
import styled from 'styled-components';
import newstockIcon from '@assets/Stock/blueLogo.png';

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
const AnalysisModal: React.FC<AnalysisModalProps> = ({
  onClose,
  analysisData,
}) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <h2>Analysis</h2>
        <p>{analysisData?.macroReport}</p>
        <p>{analysisData?.microReport}</p>
        <h3>Related News</h3>
        <ul>
          {analysisData?.relatedNews.map((news) => (
            <li key={news.id}>
              <Flex>
                <img
                  src={news.thumbnail || newstockIcon}
                  alt={news.title}
                  style={{ width: '10rem' }}
                />
                <FlexColumn>
                  <Flex>
                    <SentimentIcon sentiment={String(news.sentiment)} />
                    <p>{news.title}</p>
                  </Flex>

                  <Flex>
                    <img
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                      }}
                      src={`https://stock.vaiv.kr/resources/images/news/${news.media}.png`}
                      onError={(e) => {
                        e.currentTarget.src = newstockIcon;
                      }}
                    />
                    <p>{news.media}</p>
                    <p>{news.upload_datetime}</p>
                  </Flex>
                </FlexColumn>
              </Flex>
            </li>
          ))}
        </ul>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AnalysisModal;
