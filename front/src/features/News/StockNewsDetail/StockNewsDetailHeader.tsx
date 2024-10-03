import styled from 'styled-components';
import StockPriceHeader from '@features/News/StockNewsDetail/StockPriceHeader';
import {
  PositiveIcon as BasePositiveIcon,
  PositiveIconText as BasePositiveIconText,
  NegativeIcon as BaseNegativeIcon,
  NegativeIconText as BaseNegativeIconText,
  NeutralIcon as BaseNeutralIcon,
  NeutralIconText as BaseNeutralIconText,
} from '@features/News/PNSubicon';
import { NewsTag, bookmarkedIcon, unbookmarkedIcon } from '../NewsIconTag';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@api/axiosInstance';
import { useOutletContext } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';

const StockNewsDetailHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.75rem 0.625rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1.25rem;
`;

const HeaderGapWrapper = styled.div<{ $gapSize: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gapSize }) => `${$gapSize}rem`};
  width: 100%;
`;

const StockNewsTitleWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 0.5rem;
  align-self: stretch;
  position: relative;
`;

const StockNewsTitleText = styled.p`
  /* color: #0448a5; */
  color: ${({ theme }) => theme.textColor};
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.6;
  text-indent: 6.5rem;
  padding-left: 0.5rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding-left: 0.5rem;
`;

const TagBookmarkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  width: 100%;
`;

const NewsMediaText = styled.p`
  color: ${({ theme }) => theme.textColor};
  /* color: #828282; */
  font-size: 1rem;
  line-height: 1.875rem; /* 176.471% */
`;

const NewsAuthorInfoText = styled.p`
  color: ${({ theme }) => theme.grayTextColor};
  /* color: #828282; */
  font-size: 1rem;
  line-height: 1.875rem; /* 176.471% */
`;

const Border = styled.div`
  width: 100%;
  height: 0.06rem;
  background-color: ${({ theme }) => theme.grayTextColor};
  margin-top: 1rem;
`;

const PositiveIcon = styled(BasePositiveIcon)`
  position: absolute;
  width: 6rem;
  height: 3rem;
  padding: 0.3rem;
  border: 0.125rem solid #ea1212;
`;

const PositiveIconText = styled(BasePositiveIconText)`
  font-size: 2rem;
  font-weight: 500;
`;

const NegativeIcon = styled(BaseNegativeIcon)`
  position: absolute;
  width: 6rem;
  height: 3rem;
  padding: 0.3rem;
  border: 0.125rem solid #006dff;
`;

const NegativeIconText = styled(BaseNegativeIconText)`
  font-size: 2rem;
  font-weight: 500;
`;

const NeutralIcon = styled(BaseNeutralIcon)`
  position: absolute;
  width: 6rem;
  height: 3rem;
  padding: 0.3rem;
  border: 0.125rem solid #828282;
`;

const NeutralIconText = styled(BaseNeutralIconText)`
  font-size: 2rem;
  font-weight: 500;
`;

interface StockNewsDetailHeaderProps {
  title: string;
  media: string;
  uploadDate: string;
  sentiment: string;
  tagList: string[];
  stockNewsStockCodes?: string[];
  id: number;
}

const StockNewsDetailHeader: React.FC<StockNewsDetailHeaderProps> = ({
  title,
  media,
  uploadDate,
  sentiment,
  tagList,
  stockNewsStockCodes,
  id,
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // bookmark 상태가 변경되면 다시 갱신하는 함수
  const { onBookmarkSuccess, bookmarkUpdated } = useOutletContext<{
    onBookmarkSuccess: () => void;
    bookmarkUpdated: boolean;
  }>();

  // 북마크 상태를 불러오는 함수
  const loadBookmarkState = async () => {
    try {
      const response = await axiosInstance.get('/api/news/favorite/stock/list');
      const bookmarkedNews = response.data.data;
      const isBookmarkedNews = bookmarkedNews.some(
        (newsItem: { id: number }) => newsItem.id === id
      );
      setIsBookmarked(isBookmarkedNews);
    } catch (error) {
      console.error('Failed to load bookmark state: ', error);
    }
  };

  // 페이지 로드 시 북마크 상태를 불러옴
  useEffect(() => {
    loadBookmarkState();
  }, [id]);

  // 북마크 상태가 업데이트되면 다시 갱신
  useEffect(() => {
    if (bookmarkUpdated) {
      loadBookmarkState();
    }
  }, [bookmarkUpdated]);

  const handleBookmarkClick = async () => {
    try {
      if (isBookmarked) {
        await axiosInstance.delete(`/api/news/favorite/stock/${id}`);
      } else {
        await axiosInstance.post(`/api/news/favorite/stock/${id}`);
      }
      setIsBookmarked(!isBookmarked);
      onBookmarkSuccess(); // 북마크 상태 갱신 요청
    } catch (error) {
      console.error('Failed to update bookmark: ', error);
    }
  };

  const date = uploadDate.split('T')[0].replace(/-/g, '.');
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const stockCode = stockNewsStockCodes?.[0];
  const stockDetail =
    allStock?.find((s) => s.stockCode === stockCode) ||
    top10Stock?.find((s) => s.stockCode === stockCode);
  const stockName = stockDetail?.stockName || 'Unknown Stock';

  // 감정 분석에 따른 아이콘 설정
  let IconComponent;
  let IconText;

  switch (sentiment) {
    case '0': // 부정적
      IconComponent = NegativeIcon;
      IconText = <NegativeIconText>부정</NegativeIconText>;
      break;
    case '1': // 중립적
      IconComponent = NeutralIcon;
      IconText = <NeutralIconText>중립</NeutralIconText>;
      break;
    case '2': // 긍정적
      IconComponent = PositiveIcon;
      IconText = <PositiveIconText>긍정</PositiveIconText>;
      break;
    default:
      IconComponent = NeutralIcon; // 기본값으로 중립 아이콘을 사용
      IconText = <NeutralIconText>중립</NeutralIconText>;
      break;
  }

  return (
    <>
      <StockNewsDetailHeaderWrapper>
        <HeaderGapWrapper $gapSize={1.25}>
          <StockPriceHeader header={stockName} stockDetail={stockDetail!} />
          <StockNewsTitleWrapper>
            {/* <PositiveIcon>
              <PositiveIconText>긍정</PositiveIconText>
            </PositiveIcon> */}
            <IconComponent>{IconText}</IconComponent>
            <StockNewsTitleText>{title}</StockNewsTitleText>
          </StockNewsTitleWrapper>
        </HeaderGapWrapper>

        <HeaderGapWrapper $gapSize={1}>
          <InfoWrapper>
            <NewsMediaText>{media}</NewsMediaText>
            <NewsAuthorInfoText>{date}</NewsAuthorInfoText>
          </InfoWrapper>

          <TagBookmarkWrapper>
            <InfoWrapper>
              {tagList.map((tag, index) => (
                <NewsTag key={index} $tagName={tag}>
                  # {tag}
                </NewsTag>
              ))}
            </InfoWrapper>
            <div onClick={handleBookmarkClick} style={{ cursor: 'pointer' }}>
              {isBookmarked ? bookmarkedIcon : unbookmarkedIcon}
            </div>
          </TagBookmarkWrapper>
        </HeaderGapWrapper>

        <Border />
      </StockNewsDetailHeaderWrapper>
    </>
  );
};

export default StockNewsDetailHeader;
