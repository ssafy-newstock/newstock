import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1.25rem;
  gap: 1.25rem;
`;

const NewsHeaderText = styled.p`
  font-weight: 600;
  font-size: 1.25rem;
`;

const NewsOuterWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  gap: 1rem;
`;

const NewsItemWrapper = styled.div`
  flex: 0 0 auto;
  width: 18%;
  height: 12.5rem;
  padding: 1.25rem 1rem;
  border: 1px solid #d1d1d1;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
`;

const NewsMedia = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
`;

const NewsTitle = styled.p`
  font-size: 1.2rem;
`;

const NewsDate = styled.p`
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

// NewsItem 타입 정의
interface NewsItem {
  id: number;
  upload_datetime: string;
  title: string;
  media: string;
  thumbnail?: string;
  sentiment: number;
  type: string;
}

// AINews 컴포넌트 Props 타입 정의
interface AINewsProps {
  newsList: NewsItem[];
}

const AINews: React.FC<AINewsProps> = ({ newsList }) => {
  const navigate = useNavigate();

  // 뉴스 아이템 클릭 핸들러
  const handleNewsClick = (news: NewsItem) => {
    if (news.type === 'industry') {
      navigate(`/subnews-main/economic-news/${news.id}`);
    } else if (news.type === 'stock') {
      navigate(`/subnews-main/stock-news/${news.id}`);
    }
  };

  return (
    <NewsWrapper>
      <NewsHeaderText>관련 뉴스</NewsHeaderText>
      <NewsOuterWrapper>
        {newsList.map((news, index) => (
          <NewsItemWrapper
            key={index}
            onClick={() => handleNewsClick(news)} // 클릭 시 라우팅 처리
          >
            <NewsMedia>{news.media}</NewsMedia>
            <NewsDate>
              {news.upload_datetime.split('T')[0].replace(/-/g, '.')}
            </NewsDate>
            <NewsTitle>{news.title}</NewsTitle>
          </NewsItemWrapper>
        ))}
      </NewsOuterWrapper>
    </NewsWrapper>
  );
};

export default AINews;
