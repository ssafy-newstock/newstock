import {
  DivTag,
  FlexGap,
  FlexGapCenter,
  FlexGapColumn,
} from '@components/styledComponent';
import styled from 'styled-components';
import newstockIcon from '@assets/Stock/Logo.png';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  Text,
  TextBoldLeft,
  TextBoldLarge,
  HrTag,
  TextLeftLine,
} from '@features/Stock/styledComponent';
import { useNavigate } from 'react-router-dom';

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
  min-width: 20rem;
  max-width: 60rem;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  padding: 1rem;
  border-radius: 1rem;
  min-width: 15rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  width: 8rem;
  height: 6rem;
  border-radius: 1rem;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 1fr, 1fr);
  gap: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0.5rem 1rem;
`;

const NewsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0.5rem 1rem;
  align-items: center;
  cursor: pointer;
`;

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  onClose,
  analysisData,
}) => {
  const navigate = useNavigate();
  const onClickNews = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    event.stopPropagation();
    navigate(`/subnews-main/economic-news/${id}`);
  }
  if (analysisData?.macroReport === '') {
    return (
      <ModalOverlay>
        <ModalContent>
          <Text>분석 결과가 없습니다.</Text>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalContent>
      </ModalOverlay>
    );
  }
  return (
    <ModalOverlay>
      {analysisData ? (
        <ModalContent>
          <>
            <DivTag style={{ width: '100%' }}>
              <TextBoldLarge>차트 분석</TextBoldLarge>
              <HrTag />
              <FlexGap $gap="1rem">
                <Container>
                  <Text>시장 분석</Text>
                  <TextLeftLine
                    dangerouslySetInnerHTML={{
                      __html: analysisData?.macroReport,
                    }}
                  />
                </Container>
                <Container>
                  <Text>종목 분석</Text>
                  <TextLeftLine
                    dangerouslySetInnerHTML={{
                      __html: analysisData?.microReport,
                    }}
                  />
                </Container>
              </FlexGap>
            </DivTag>

            <DivTag style={{ width: '100%' }}>
              <TextBoldLarge>관련 뉴스</TextBoldLarge>
              <HrTag />
              {analysisData?.relatedNews.length === 0 && (
                <Text>관련 뉴스가 없습니다.</Text>
              )}
              <NewsGrid>
                {analysisData?.relatedNews.map((news) => (
                    <NewsContainer key={news.id} onClick={(event) => onClickNews(event, news.id)}>
                    {/* <NewsContainer key={news.id} onClick={onClickNews}> */}
                      <ImgTag
                        src={news.thumbnail || newstockIcon}
                        alt={news.title}
                      />
                      <FlexGapColumn $gap="0.5rem">
                        <TextBoldLeft>{news.title}</TextBoldLeft>

                        <FlexGapCenter
                          $gap="0.5rem"
                          style={{ paddingLeft: '0.5rem' }}
                        >
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
                          <Text>{news.media}</Text>
                          <Text>{news.upload_datetime.split(' ')[0]}</Text>
                        </FlexGapCenter>
                      </FlexGapColumn>
                    </NewsContainer>
                ))}
              </NewsGrid>
            </DivTag>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </>
        </ModalContent>
      ) : (
        <LoadingSpinner />
      )}
    </ModalOverlay>
  );
};

export default AnalysisModal;
