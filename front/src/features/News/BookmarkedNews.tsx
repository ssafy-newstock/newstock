import styled from 'styled-components';
import bookmarkedNewsData from '@api/dummyData/bookmarkedData.json';
import { useNavigate } from 'react-router-dom';

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

const StyledArrowIcon = styled.svg`
  width: 0.5;
  height: 1rem;
  fill: ${({ theme }) => theme.textColor}; /* 테마에 따른 색상 변경 */
`;

const ArrowIcon = () => (
  <StyledArrowIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 18"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.55354 1.1713L8.79654 8.4273C8.86174 8.4896 8.91347 8.56461 8.94856 8.64768C8.98365 8.73075 9.00134 8.82013 9.00054 8.9103C9.00094 9.0025 8.98313 9.09386 8.94812 9.17915C8.91311 9.26444 8.8616 9.34198 8.79654 9.4073C6.17654 11.9633 3.65154 14.4303 1.22154 16.8083C1.09654 16.9253 0.59654 17.2163 0.21054 16.7843C-0.17546 16.3513 0.0585399 15.9743 0.21054 15.8183L7.27854 8.9103L0.53154 2.1513C0.28554 1.81197 0.30554 1.49897 0.59154 1.2123C0.878207 0.925638 1.19887 0.911304 1.55354 1.1713Z"
    />
  </StyledArrowIcon>
);

const BookmarkedNewsMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  /* height: 100%; */
`;

const BookmarkedNewsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  padding: 16px 21px;
  flex-direction: column;
  align-items: flex-start;
  align-items: stretch;
  gap: 10px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const BookmarkedNewsTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.25rem;
  width: 80%;
  /* width: 300px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarkedNewsMiddle = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const BookmarkedNewsMiddleText = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  line-height: 30px; /* 166.667% */
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 1.5px;
  height: 28px;
  background: #e0e0e0;
`;

const BookmarkedNewsFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-items: stretch;
`;

const BookmarkedNewsTag = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background-color: #e0e0e0;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  line-height: 30px;
`;

const BookmarkedNews = () => {
  const navigate = useNavigate();
  const bookmarkedNews = bookmarkedNewsData.data;

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
              <BookmarkedNewsTag># 싸피</BookmarkedNewsTag>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path
                  d="M7.5 31.5V7.5C7.5 6.675 7.794 5.969 8.382 5.382C8.97 4.795 9.676 4.501 10.5 4.5H25.5C26.325 4.5 27.0315 4.794 27.6195 5.382C28.2075 5.97 28.501 6.676 28.5 7.5V31.5L18 27L7.5 31.5Z"
                  fill="#006DFF"
                />
              </svg>
            </BookmarkedNewsFooter>
          </BookmarkedNewsWrapper>
        </BookmarkedNewsMain>
      ))}
    </>
  );
};

export default BookmarkedNews;
