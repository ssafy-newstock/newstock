import styled from 'styled-components';
import {
  PositiveIcon,
  PositiveIconText,
  NegativeIcon,
  NegativeIconText,
  NeutralIcon,
  NeutralIconText,
} from '@features/News/PNSubicon';
import { NewsTag } from '../NewsIconTag';

const StockNewsBodyWrapper = styled.div`
  display: flex;
  /* max-width: 72%; */
  width: 72%;
  margin-right: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.625rem 0;
`;

const StockNewsTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;
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
  /* color: #0448a5; */
  color: ${({ theme }) => theme.highlightColor};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: #828282;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`;

const StockNewsFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const FooterText = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.9rem;
`;

const BookmarkedNewsTagWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

interface StockNewsBodyProps {
  title: string;
  content: string;
  media: string;
  date: string;
  keywords: string[];
  sentiment: string;
}

const StockNewsBody: React.FC<StockNewsBodyProps> = ({
  title,
  content,
  media,
  date,
  keywords,
  sentiment,
}) => {
  const formattedDate = date?.split(' ')[0].replace(/-/g, '.') || '날짜 불명';

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
    <StockNewsBodyWrapper>
      <StockNewsTitleWrapper>
        <IconComponent>{IconText}</IconComponent>
        <StockNewsTitle>
          <StockNewsTitleText>{title}</StockNewsTitleText>
        </StockNewsTitle>
      </StockNewsTitleWrapper>

      <StockNewsContent>{content}</StockNewsContent>

      <StockNewsFooter>
        <FooterText>{media}</FooterText>
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
  );
};

export default StockNewsBody;
