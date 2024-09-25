import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getNewsData } from '@api/dummyData/DummyData';

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

const ThumbnailImage = styled.img`
  width: 100%; /* 너비에 맞게 꽉 차도록 설정 */
  height: auto; /* 이미지의 원래 비율을 유지 */
  object-fit: cover; /* 비율을 유지하면서 컨테이너에 맞추되, 넘치는 부분은 잘라냄 */
`;

const NewsContentText = styled.p`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.875rem;
`;

// 이미지 URL과 나머지 기사 내용을 분리하는 함수
const processArticle = (article: string) => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/;
  const match = imageTagRegex.exec(article);

  let imageUrl = '';
  let content = article;

  if (match && match[1]) {
    imageUrl = match[1]; // 이미지 URL 추출
    content = article.replace(imageTagRegex, '').trim(); // 이미지 태그 제거 후 남은 기사 내용
  }

  return { imageUrl, content };
};

const StockNewsDetailBody: React.FC = () => {
  const { newsId } = useParams();
  const { stock } = getNewsData();

  const news = stock.data.find((newsItem) => newsItem.newsId === newsId);
  const { imageUrl, content } = news
    ? processArticle(news.article)
    : { imageUrl: '이미지 없음', content: '내용 없음' };
  const subtitle = news ? news.subtitle : '제목 없음';

  const paragraphs = content.split('\n\n').map((paragraph) =>
    paragraph.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  );

  return (
    <>
      <StockNewsDetailBodyWrapper>
        <NewsSubTitleWrapper>
          <NewsSubTitleLine />
          <NewsSubTitleText>{subtitle}</NewsSubTitleText>
        </NewsSubTitleWrapper>
        <NewsThumbnailWrapper>
          <ThumbnailImage src={imageUrl} alt="imageUrl" />
        </NewsThumbnailWrapper>
        {paragraphs.map((paragraph, index) => (
          <NewsContentText key={index}>{paragraph}</NewsContentText>
        ))}
      </StockNewsDetailBodyWrapper>
    </>
  );
};

export default StockNewsDetailBody;
