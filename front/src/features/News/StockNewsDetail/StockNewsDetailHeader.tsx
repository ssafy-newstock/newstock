import styled from 'styled-components';
import StockNewsHeader from '@features/News/StockNews/StockNewsHeader';
import {
  PositiveIcon as BasePositiveIcon,
  PositiveIconText,
  NegativeIcon as BaseNegativeIcon,
  NegativeIconText,
  NeutralIcon as BaseNeutralIcon,
  NeutralIconText,
} from '@features/News/PNSubicon';
import { NewsTag, bookmarkedIcon } from '../NewsIconTag';

const StockNewsDetailHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.75rem 0.625rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  /* gap: 1.25rem; */
  gap: 1rem;
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
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
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

interface StockNewsDetailHeaderProps {
  title: string;
  media: string;
  uploadDate: string;
  sentiment: string;
  tagList: string[];
}

const StockNewsDetailHeader: React.FC<StockNewsDetailHeaderProps> = ({
  title,
  media,
  uploadDate,
  sentiment,
  tagList,
}) => {
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
      <StockNewsDetailHeaderWrapper>
        <HeaderGapWrapper $gapSize={1.25}>
          <StockNewsHeader />
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
            {bookmarkedIcon}
          </TagBookmarkWrapper>
        </HeaderGapWrapper>

        <Border />
      </StockNewsDetailHeaderWrapper>
    </>
  );
};

export default StockNewsDetailHeader;
