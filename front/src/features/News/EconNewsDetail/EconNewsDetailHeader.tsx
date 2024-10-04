import styled from 'styled-components';
// import StockNewsHeader from '@features/News/StockNews/StockNewsHeader';
import {
  PositiveIcon as BasePositiveIcon,
  PositiveIconText as BasePositiveIconText,
  NegativeIcon as BaseNegativeIcon,
  NegativeIconText as BaseNegativeIconText,
  NeutralIcon as BaseNeutralIcon,
  NeutralIconText as BaseNeutralIconText,
} from '@features/News/PNSubicon';
import { bookmarkedIcon, unbookmarkedIcon } from '../NewsIconTag';
import { useEffect } from 'react';
import { useBookmarkStore } from '@store/useBookmarkStore';

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
  font-size: 2rem;
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
  const {
    bookmarkedNewsIds,
    addBookmark,
    removeBookmark,
    fetchBookmarkedNews,
  } = useBookmarkStore(); // zustand로부터 상태 및 함수 불러오기

  const isBookmarked = bookmarkedNewsIds.includes(id);

  useEffect(() => {
    fetchBookmarkedNews(); // 컴포넌트 마운트 시 북마크 상태 불러오기
  }, [fetchBookmarkedNews]);

  const handleBookmarkClick = async () => {
    try {
      if (isBookmarked) {
        await removeBookmark(id); // 북마크 삭제
      } else {
        await addBookmark(id); // 북마크 추가
      }
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
