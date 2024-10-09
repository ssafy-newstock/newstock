import { AkarIcon } from './Icon';
import {
  ScrapCardLeftDiv,
  ScrapCardRightBottomDiv,
  ScrapCardRightDiv,
} from '@features/Scrap/detail/scrapDetailRightStyledComponent';
import {
  CardTitleFontStyle,
  FontStyle,
} from '@features/MyNews/styledComponent';
import styled from 'styled-components';

import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';

const CardContainer = styled.div`
  display: flex;
  padding: 0.8rem 1rem;
  width: 90%;
  height: auto; /* 모든 카드의 높이를 일정하게 유지 */
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden; /* 내용이 넘치면 잘리도록 설정 */

  cursor: pointer;

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CustomFontStyle = styled(FontStyle)`
  color: ${({ theme }) => theme.grayTextColor};
  font-size: 0.8rem;
`;


const EconomicNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: #828282;
  font-size: 0.9rem;
  line-height: 1.5rem;
  width: 90%;
  margin-left: 0.2rem;
`;

interface ScrapCardProps {
  data: NewsData;
  scrapData: ScrapData;
  onClick?: () => void;
}

const ScrapCard: React.FC<ScrapCardProps> = ({ data, scrapData, onClick }) => {
  // const { imageUrls, content } = processArticle(data.article || '');
  const displayDate = scrapData.createdAt
    ? scrapData.createdAt.split('T')[0].replace(/-/g, '.')
    : data.uploadDatetime!.split('T')[0].replace(/-/g, '.');
  return (
    <CardContainer onClick={onClick}>
      {/* <CardInnerWrapper> */}
      <ScrapCardLeftDiv>
        <AkarIcon />
      </ScrapCardLeftDiv>

      <ScrapCardRightDiv>
        <CardTitleFontStyle
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {scrapData.title}
        </CardTitleFontStyle>
        <ScrapCardRightBottomDiv>
          <div>
            <EconomicNewsContent
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.title}
            </EconomicNewsContent>
          </div>
        </ScrapCardRightBottomDiv>
        <CustomFontStyle>{displayDate}</CustomFontStyle>
      </ScrapCardRightDiv>
      {/* </CardInnerWrapper> */}
    </CardContainer>
  );
};

export default ScrapCard;
