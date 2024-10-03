import styled from 'styled-components';
import {
  PositiveIcon as BasePositiveIcon,
  PositiveIconText,
  NegativeIcon as BaseNegativeIcon,
  NegativeIconText,
  NeutralIcon as BaseNeutralIcon,
  NeutralIconText,
} from '@features/News/PNicon';

const NewsBodyTitleWrapper = styled.div`
  display: flex;
  width: 19rem;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const NewsBodyTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 2rem;
  text-indent: 3.8rem;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
`;

const PositiveIcon = styled(BasePositiveIcon)`
  position: absolute;
  top: 0.15rem;
`;

const NegativeIcon = styled(BaseNegativeIcon)`
  position: absolute;
  top: 0.15rem;
`;

const NeutralIcon = styled(BaseNeutralIcon)`
  position: absolute;
  top: 0.15rem;
`;

interface NewsBodyTitleProps {
  title: string;
  sentiment: string;
}

const NewsBodyTitle: React.FC<NewsBodyTitleProps> = ({ title, sentiment }) => {
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
    <NewsBodyTitleWrapper>
      <IconComponent>{IconText}</IconComponent>
      <NewsBodyTitleText>{title}</NewsBodyTitleText>
    </NewsBodyTitleWrapper>
  );
};

export default NewsBodyTitle;
