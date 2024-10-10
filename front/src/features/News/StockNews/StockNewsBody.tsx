import styled from 'styled-components';
import SentimentIcon from '@features/News/PNSubicon';
import newstockIcon from '@assets/Stock/blueLogo.png';
import StockNewsHeader from './StockNewsHeader';
import { useEffect, useState } from 'react';
import NewsSummary from '@features/News/NewsSummary';
import { Overlay, Background, Modal } from '@components/ModalComponents';
import { NewsTag } from '../NewsIconTag';
import { useBookmarkStore } from '@store/useBookmarkStore';
import useAuthStore from '@store/useAuthStore';
import { toast } from 'react-toastify';
import { useShortQuery } from '@hooks/useShortQuery';

const StockNewsBodyWrapper = styled.div`
  display: flex;
  /* max-width: 72%; */
  width: 74.5%;
  /* margin-right: 1.5rem; */
  flex-direction: column;
  align-items: flex-start;
  padding: 0.625rem;
`;

const StockNewsTitleWrapper = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const StockNewsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  max-width: 100%;
  overflow: hidden;
`;

const StockNewsTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: #828282;
  font-size: 1rem;
  line-height: 2rem;
  width: 100%;
`;

const StockNewsFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  color: #828282;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9rem;
`;

const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BookmarkedNewsTagWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const MediaLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain; /* 이미지 비율을 유지하면서 컨테이너 안에 맞춤 */
  border-radius: 50%;
`;

interface IStockDetail {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: number;
  prdyVrss: number;
  prdyCtrt: number;
  acmlVol: number;
  acmlTrPbmn: number;
}

interface StockNewsBodyProps {
  id: string;
  title: string;
  content: string;
  media: string;
  date: string;
  keywords: string[];
  sentiment: string;
  onShowSummaryChange: (showSummary: boolean) => void;
  header: string;
  stockDetail: IStockDetail;
}

const StockNewsBody: React.FC<StockNewsBodyProps> = ({
  id,
  title,
  content,
  media,
  date,
  keywords,
  sentiment,
  onShowSummaryChange,
  header,
  stockDetail,
}) => {
  const formattedDate = date.split('T')[0].replace(/-/g, '.');
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const mediaImageUrl = `https://stock.vaiv.kr/resources/images/news/${media}.png`;

  // zustand store에서 북마크 상태 관리 함수와 데이터 가져오기
  const {
    bookmarkedStockNewsIds,
    addStockBookmark,
    removeStockBookmark,
    fetchBookmarkedStockNews,
  } = useBookmarkStore();

  const isBookmarked = bookmarkedStockNewsIds.includes(id); // 북마크 여부 확인

  const { isLogin } = useAuthStore();

  const handleBookmarkIconClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isLogin) {
      // 로그인하지 않은 상태에서는 북마크 기능 제한
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!isBookmarked) {
      try {
        await addStockBookmark(id);
      } catch (error) {
        console.error('Bookmark registration failed', error);
      }
    } else {
      try {
        await removeStockBookmark(id);
      } catch (error) {
        console.error('Bookmark removal failed', error);
      }
    }
  };

  // 컴포넌트 마운트 시 북마크 상태 로드
  useEffect(() => {
    if (isLogin) {
      fetchBookmarkedStockNews(); // zustand에서 북마크 상태 로드
    }
  }, [fetchBookmarkedStockNews, isLogin]);

  // 쿼리 훅 사용하여 데이터 가져오기
  const { data, refetch } = useShortQuery(
    { id: id, newsType: 'stock' }, // 예시로 'summary'를 newsType으로 사용
    {
      enabled: false, // 자동 실행 방지
    }
  );

  const handleSummaryClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지
    if (!showSummary) {
      setShowSummary(true);
      onShowSummaryChange(true);
      try {
        await refetch(); // 쿼리 실행
      } catch (error) {
        console.error('Failed to fetch news summary:', error);
      }
    }
  };

  const handleCloseSummary = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setShowSummary(false);
    onShowSummaryChange(false);
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중지
  };

  return (
    <>
      <StockNewsBodyWrapper>
        {/* stockName을 전달 */}
        <StockNewsHeader
          header={header}
          stockDetail={stockDetail!}
          isBookmarked={isBookmarked}
          onBookmarkIconClick={handleBookmarkIconClick}
          onSummaryClick={handleSummaryClick}
        />
        {showSummary && (
          <Overlay>
            <Background onClick={handleCloseSummary} />
            <Modal onClick={handleModalClick}>
              {/* {isFetching && <LoadingSpinner />} */}
              <NewsSummary onClose={handleCloseSummary} data={data} />
            </Modal>
          </Overlay>
        )}
        <StockNewsTitleWrapper>
          <SentimentIcon sentiment={sentiment} /> {/* SentimentIcon 사용 */}
          <StockNewsTitle>
            <StockNewsTitleText>{title}</StockNewsTitleText>
          </StockNewsTitle>
        </StockNewsTitleWrapper>

        <StockNewsContent>{content}</StockNewsContent>

        <StockNewsFooter>
          <MediaWrapper>
            <MediaLogo
              src={mediaImageUrl}
              alt={media}
              onError={(e) => {
                e.currentTarget.src = newstockIcon; // 이미지 로드 실패 시 기본 이미지로 대체
              }}
            />
            <FooterText>{media}</FooterText>
          </MediaWrapper>
          <FooterText>{formattedDate}</FooterText>
        </StockNewsFooter>

        <BookmarkedNewsTagWrapper>
          {Array.isArray(keywords) && keywords.length > 0 ? (
            keywords.map((keyword, index) => (
              <NewsTag key={index} $tagName={keyword}>
                # {keyword}
              </NewsTag>
            ))
          ) : (
            <p>키워드 없음</p> // 키워드가 없을 경우 처리
          )}
        </BookmarkedNewsTagWrapper>
      </StockNewsBodyWrapper>
    </>
  );
};

export default StockNewsBody;
