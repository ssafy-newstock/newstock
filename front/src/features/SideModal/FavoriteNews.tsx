import styled from 'styled-components';
import { NewsTag } from '@features/News/NewsIconTag';
import { bookmarkedIcon } from '@features/News/NewsIconTag';
import { useNavigate } from 'react-router-dom';
import { CenteredMessage } from '@features/SideModal/styledComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import useAuthStore from '@store/useAuthStore';
import { useStockNews, useIndustryNews } from '@hooks/useFavoriteNewsQuery';

const FavoriteNewsCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const BookmarkedNewsWrapper = styled.div`
  display: flex;
  padding: 0.8rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BookmarkedNewsTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarkedNewsMiddle = styled.div`
  display: flex;
  padding: 0 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const BookmarkedNewsMiddleText = styled.p`
  color: ${({ theme }) => theme.grayTextColor};
  font-size: 0.8rem;
  line-height: 1.875rem;
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.25rem;
  background: #e0e0e0;
`;

const BookmarkedNewsFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-items: stretch;
`;

const FavoriteNews: React.FC = () => {
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  // 커스텀 훅을 사용하여 뉴스 데이터 가져오기
  const {
    data: stockNews,
    isLoading: stockLoading,
    error: stockError,
  } = useStockNews();
  const {
    data: industryNews,
    isLoading: industryLoading,
    error: industryError,
  } = useIndustryNews();

  const allBookmarkedNews = [...(stockNews || []), ...(industryNews || [])];

  // 로딩 상태와 오류 처리
  if (!isLogin) {
    return <CenteredMessage>로그인 후 이용해주세요.</CenteredMessage>;
  }

  if (stockLoading || industryLoading) {
    return (
      <CenteredMessage>
        <LoadingSpinner />
      </CenteredMessage>
    );
  }

  if (stockError || industryError) {
    return (
      <CenteredMessage>
        뉴스 데이터를 불러오는 중 오류가 발생했습니다.
      </CenteredMessage>
    );
  }

  return (
    <FavoriteNewsCenter>
      {allBookmarkedNews.length > 0 ? (
        allBookmarkedNews.map((newsItem, index) => {
          const uploadDate = newsItem.uploadDatetime
            ? newsItem.uploadDatetime.split('T')[0].replace(/-/g, '.')
            : '날짜 없음';

          const isStockNews = 'stockNewsStockCodes' in newsItem;

          return (
            <BookmarkedNewsWrapper
              key={index}
              onClick={() =>
                navigate(
                  isStockNews
                    ? `/subnews-main/stock-news/${newsItem.id}`
                    : `/subnews-main/economic-news/${newsItem.id}`
                )
              }
            >
              <BookmarkedNewsTitle>
                {newsItem.title || '제목 없음'}
              </BookmarkedNewsTitle>
              <BookmarkedNewsMiddle>
                <BookmarkedNewsMiddleText>
                  {newsItem.media || '미디어 정보 없음'}
                </BookmarkedNewsMiddleText>
                <BookmarkedNewsMiddleLine />
                <BookmarkedNewsMiddleText>
                  {uploadDate}
                </BookmarkedNewsMiddleText>
              </BookmarkedNewsMiddle>

              <BookmarkedNewsFooter>
                <NewsTag $tagName={isStockNews ? '종목' : '시황'}>
                  #{isStockNews ? '종목' : '시황'}
                </NewsTag>
                <div>{bookmarkedIcon}</div>
              </BookmarkedNewsFooter>
            </BookmarkedNewsWrapper>
          );
        })
      ) : (
        <CenteredMessage>
          뉴스 페이지에서 관심 뉴스를 추가해보세요.
        </CenteredMessage>
      )}
    </FavoriteNewsCenter>
  );
};

export default FavoriteNews;
