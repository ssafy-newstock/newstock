import styled from 'styled-components';
import {
  // PositiveIcon,
  // PositiveIconText,
  NegativeIcon,
  NegativeIconText,
  // NeutralIcon,
  // NeutralIconText,
} from '@features/News/PNicon';

const NewsBodyTitleWrapper = styled.div`
  display: flex;
  width: 299px;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const NewsBodyTitleText = styled.p`
  width: 299px;
  height: 64px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.highlightColor};
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 아이콘 크기에 맞춰 수정 */
  text-indent: 55px;

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
  // const trimmedTitle = title.length > 27 ? `${title.slice(0, 27)}...` : title;

  return (
    <NewsBodyTitleWrapper>
      <NewsBodyTitleText>{title}</NewsBodyTitleText>
      <NegativeIcon>
        <NegativeIconText>부정</NegativeIconText>
      </NegativeIcon>
      {/* <PositiveIcon>
        <PositiveIconText>긍정</PositiveIconText>
      </PositiveIcon> */}
      {/* <NeutralIcon>
        <NeutralIconText>중립</NeutralIconText>
      </NeutralIcon> */}
    </NewsBodyTitleWrapper>
  );
};

export default NewsBodyTitle;
