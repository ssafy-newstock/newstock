import styled from 'styled-components';
import bookmarkedNewsData from '@api/dummyData/bookmarkedData.json';
import { useNavigate } from 'react-router-dom';
import { ArrowIcon, bookmarkedIcon, NewsTag } from './NewsIconTag';

const BookmarkedNewsHeader = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 0.625rem;
`;

const BookmarkedNewsHeaderText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.875rem;
`;

const BookmarkedNewsHeaderSVG = styled.div`
  width: 0.5rem;
  height: 1rem;
`;

const BookmarkedNewsMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const BookmarkedNewsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  padding: 1rem 1.3rem;
  flex-direction: column;
  align-items: flex-start;
  align-items: stretch;
  gap: 0.625rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

const BookmarkedNewsTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.25rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarkedNewsMiddle = styled.div`
  display: flex;
  padding: 0 0.625rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

const BookmarkedNewsMiddleText = styled.p`
  /* color: #828282; */
  color: ${({ theme }) => theme.grayTextColor};
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  line-height: 1.875rem;
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.75rem;
  background: #e0e0e0;
`;

const BookmarkedNewsFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-items: stretch;
`;

interface BookmarkedNewsItem {
  title: string;
  media: string;
  uploadDatetime: string;
}

const BookmarkedNews: React.FC = () => {
  const navigate = useNavigate();
  const bookmarkedNews: BookmarkedNewsItem[] = bookmarkedNewsData.data;

  const handleInterestNewsClick = () => {
    navigate(`/my-news`);
  };

  return (
    <>
      <BookmarkedNewsHeader
        onClick={handleInterestNewsClick}
        style={{ cursor: 'pointer' }}
      >
        <BookmarkedNewsHeaderText>관심 뉴스</BookmarkedNewsHeaderText>
        <BookmarkedNewsHeaderSVG>
          <ArrowIcon />
        </BookmarkedNewsHeaderSVG>
      </BookmarkedNewsHeader>
      {bookmarkedNews.map((news, index) => (
        <BookmarkedNewsMain key={index}>
          <BookmarkedNewsWrapper>
            <BookmarkedNewsTitle>{news.title}</BookmarkedNewsTitle>
            <BookmarkedNewsMiddle>
              <BookmarkedNewsMiddleText>{news.media}</BookmarkedNewsMiddleText>
              <BookmarkedNewsMiddleLine />
              <BookmarkedNewsMiddleText>
                {news.uploadDatetime.split(' ')[0].replace(/-/g, '.')}
              </BookmarkedNewsMiddleText>
            </BookmarkedNewsMiddle>

            <BookmarkedNewsFooter>
              <NewsTag># 싸피</NewsTag>
              {bookmarkedIcon}
            </BookmarkedNewsFooter>
          </BookmarkedNewsWrapper>
        </BookmarkedNewsMain>
      ))}
    </>
  );
};

export default BookmarkedNews;
