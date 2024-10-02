import styled from 'styled-components';
// import StockNewsHeader from '@features/News/StockNews/StockNewsHeader';
import {
  PositiveIcon as BasePositiveIcon,
  PositiveIconText,
  NegativeIcon as BaseNegativeIcon,
  NegativeIconText,
  NeutralIcon as BaseNeutralIcon,
  NeutralIconText,
} from '@features/News/PNSubicon';
import { bookmarkedIcon, unbookmarkedIcon } from '../NewsIconTag';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@api/axiosInstance';
import { useOutletContext } from 'react-router-dom';

const EconNewsDetailHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.75rem 0.625rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1.25rem;
`;

const EconNewsTitleWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 0.5rem;
  align-self: stretch;
  position: relative;
  justify-content: space-between;
`;

const EconNewsTitleText = styled.p`
  /* color: #0448a5; */
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6;
  text-indent: 6.5rem;
  padding-left: 0.5rem;
`;

const NewsInfoOuterWrapper = styled.div`
  display: flex;
  padding: 0rem 0.625rem;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;

const NewsInfoInnerWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

const NewsMediaText = styled.p`
  color: ${({ theme }) => theme.textColor};
  /* color: #828282; */
  font-size: 1rem;
  font-style: normal;
  line-height: 1.875rem; /* 176.471% */
`;

const NewsAuthorInfoText = styled.p`
  color: ${({ theme }) => theme.grayTextColor};
  /* color: #828282; */
  font-size: 1rem;
  font-style: normal;
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
`;

const NegativeIcon = styled(BaseNegativeIcon)`
  position: absolute;
`;

const NeutralIcon = styled(BaseNeutralIcon)`
  position: absolute;
`;

interface EconNewsDetailHeaderProps {
  title: string;
  media: string;
  uploadDate: string;
  sentiment: string;
  id: number;
}

const EconNewsDetailHeader: React.FC<EconNewsDetailHeaderProps> = ({
  title,
  media,
  uploadDate,
  sentiment,
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
      const response = await axiosInstance.get(
        '/api/news/favorite/industry/list'
      );
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
        await axiosInstance.delete(`/api/news/favorite/industry/${id}`);
      } else {
        await axiosInstance.post(`/api/news/favorite/industry/${id}`);
      }
      setIsBookmarked(!isBookmarked);
      onBookmarkSuccess(); // 북마크 상태 갱신 요청
    } catch (error) {
      console.error('Failed to update bookmark: ', error);
    }
  };

  const date = uploadDate.split('T')[0].replace(/-/g, '.');

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
      <EconNewsDetailHeaderWrapper>
        <EconNewsTitleWrapper>
          <IconComponent>{IconText}</IconComponent>
          <EconNewsTitleText>{title}</EconNewsTitleText>
        </EconNewsTitleWrapper>

        <NewsInfoOuterWrapper>
          <NewsInfoInnerWrapper>
            <NewsMediaText>{media}</NewsMediaText>
            <NewsAuthorInfoText>{date}</NewsAuthorInfoText>
          </NewsInfoInnerWrapper>
          <NewsInfoInnerWrapper>
            <div onClick={handleBookmarkClick} style={{ cursor: 'pointer' }}>
              {isBookmarked ? bookmarkedIcon : unbookmarkedIcon}
            </div>
          </NewsInfoInnerWrapper>
        </NewsInfoOuterWrapper>

        <Border />
      </EconNewsDetailHeaderWrapper>
    </>
  );
};

export default EconNewsDetailHeader;
