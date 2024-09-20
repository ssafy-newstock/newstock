import styled from 'styled-components';
import { PositiveIcon, PositiveIconText } from '@features/News/PNSubicon';

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
  gap: 0.5rem;
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

const BookmarkedNewsTag = styled.div`
  display: flex;
  padding: 0.3rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.3rem;
  /* background-color: ${({ theme }) => theme.newsBackgroundColor}; */
  background-color: #e0e0e0;
  color: #000;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.875rem;
`;

interface StockNewsBodyProps {
  title: string;
  description: string;
  media: string;
  date: string;
  keywords: string[];
}

const StockNewsBody: React.FC<StockNewsBodyProps> = ({
  title,
  description,
  media,
  date,
  keywords,
}) => {
  const formattedDate = date?.split(' ')[0].replace(/-/g, '.') || '날짜 불명';
  return (
    <StockNewsBodyWrapper>
      <StockNewsTitleWrapper>
        <PositiveIcon>
          <PositiveIconText>긍정</PositiveIconText>
        </PositiveIcon>
        <StockNewsTitle>
          <StockNewsTitleText>{title}</StockNewsTitleText>
        </StockNewsTitle>
      </StockNewsTitleWrapper>

      <StockNewsContent>{description}</StockNewsContent>

      <StockNewsFooter>
        <FooterText>{media}</FooterText>
        <FooterText>{formattedDate}</FooterText>
      </StockNewsFooter>

      <BookmarkedNewsTagWrapper>
        {keywords.map((keyword, index) => (
          <BookmarkedNewsTag key={index}># {keyword}</BookmarkedNewsTag>
        ))}
      </BookmarkedNewsTagWrapper>
    </StockNewsBodyWrapper>
  );
};

export default StockNewsBody;
