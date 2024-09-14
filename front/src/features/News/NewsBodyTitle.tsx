import styled from 'styled-components';
import {
  PositiveIcon,
  PositiveIconText,
  // NegativeIcon,
  // NegativeIconText,
  // NeutralIcon,
  // NeutralIconText,
} from '@features/News/PNicon';

const NewsBodyTitleWrapper = styled.div`
  display: flex;
  width: 19rem;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const NewsBodyTitleText = styled.p`
  color: ${({ theme }) => theme.highlightColor};
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  text-indent: 3.8rem;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
`;

interface NewsBodyTitleProps {
  title: string;
}

const NewsBodyTitle: React.FC<NewsBodyTitleProps> = ({ title }) => {
  return (
    <NewsBodyTitleWrapper>
      <PositiveIcon>
        <PositiveIconText>긍정</PositiveIconText>
      </PositiveIcon>
      <NewsBodyTitleText>{title}</NewsBodyTitleText>
    </NewsBodyTitleWrapper>
  );
};

export default NewsBodyTitle;
