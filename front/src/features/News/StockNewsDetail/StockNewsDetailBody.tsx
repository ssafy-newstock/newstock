import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import newsData from '@api/dummyData/20240907.json';

const StockNewsDetailBodyWrapper = styled.div`
  display: flex;
  padding: 1rem 0.625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;
const NewsSubTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1.875rem;
  align-items: flex-start;
`;
const NewsSubTitleLine = styled.div`
  width: 0.15rem;
  height: auto;
  background-color: ${({ theme }) => theme.textColor};
  align-self: stretch;
`;

const NewsSubTitleText = styled.p`
  color: ${({ theme }) => theme.grayTextColor};
  width: 60%;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.875rem; /* 150% */
`;

const NewsThumbnailWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1.25rem 0rem 3.75rem 0rem;
`;
const NewsContentText = styled.p`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.875rem;
`;

const StockNewsDetailBody: React.FC = () => {
  const { newsId } = useParams();

  const news = newsData.data.find((newsItem) => newsItem.stockId === newsId);
  const subtitle = news ? news.subtitle : '제목 없음';
  const thumbnail = news ? news.thumbnail : '이미지 없음';
  const content = news ? news.description : '내용 없음';

  return (
    <>
      <StockNewsDetailBodyWrapper>
        <NewsSubTitleWrapper>
          <NewsSubTitleLine />
          <NewsSubTitleText>{subtitle}</NewsSubTitleText>
        </NewsSubTitleWrapper>
        <NewsThumbnailWrapper>
          <img src={thumbnail} alt="thumbnail" />
        </NewsThumbnailWrapper>
        <NewsContentText>{content}</NewsContentText>
      </StockNewsDetailBodyWrapper>
    </>
  );
};

export default StockNewsDetailBody;
