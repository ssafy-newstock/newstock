import { useNavigate } from 'react-router-dom';
import {
  NewsDate,
  NewsHeaderText,
  NewsItemWrapper,
  NewsMedia,
  NewsOuterWrapper,
  NewsTitle,
  NewsWrapper,
} from './AIChatBotStyledComponent';

// NewsItem 타입 정의
interface NewsItem {
  id: string;
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
