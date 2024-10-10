import { IStockNews } from '@hooks/useTop4news';
import styled from 'styled-components';
import newstockIcon from '@assets/Stock/Logo.png';
import { useNavigate } from 'react-router-dom';

const NewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: cen;
  align-items: start;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImgTag = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 1.25rem;
`;

const NewsTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 0rem;
`;

const NewsInfo = styled.div`
  font-size: 0.8rem;
  color: gray;
  align-self: flex-start;
`;

const timeAgo = (uploadDatetime: string) => {
  const uploadDate = new Date(uploadDatetime);
  const now = new Date();
  const diffMs = now.getTime() - uploadDate.getTime(); // 밀리초 차이 계산

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  } else if (diffHours > 0) {
    return `${diffHours}시간 전`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}분 전`;
  } else {
    return `${diffSeconds}초 전`;
  }
}

const NewsCard = ({ news }: { news: IStockNews }) => {
  const navigate = useNavigate();
  const onNewsClick = () => {
    navigate(`/subnews-main/stock-news/${news.id}`);
  };
  return (
    <NewsCardContainer onClick={onNewsClick}>
      <ImgTag src={news.thumbnail || newstockIcon} alt=""/>
      <NewsTitle>{news.title}</NewsTitle>
      <NewsInfo>{news.media} · {timeAgo(news.uploadDatetime)}</NewsInfo>
      {/* <div>{news.stockNewsStockCodes}</div> */}
    </NewsCardContainer>
  );
};

export default NewsCard;
