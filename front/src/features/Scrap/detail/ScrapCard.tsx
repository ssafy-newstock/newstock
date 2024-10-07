import { AkarIcon } from './Icon';
import {
  ScrapCardDiv,
  ScrapCardLeftDiv,
  ScrapCardRightBottomDiv,
  ScrapCardRightDiv,
} from '@features/Scrap/detail/scrapDetailRightStyledComponent';
import styled from 'styled-components';

const EconomicNewsTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  width: 80%; /* 텍스트가 영역을 벗어나지 않도록 조정 */
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
  font-size: 1rem;
  line-height: 1.5rem;
  width: 90%;
`;

const FooterText = styled.p`
  color: #828282;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9rem;
`;

interface ScrapData {
  id?: number;
  article?: string;
  description?: string;
  industry?: string;
  media?: string;
  sentiment?: string;
  subtitle?: string | null;
  thumbnail?: string;
  title: string;
  uploadDatetime?: string;
  newsType?: string;
  content?: string;
  stockNewsStockCodes?: string[];
  stockKeywords?: string[];
  newsId?: number;
}

interface ScrapCardProps {
  data: ScrapData;
  scrapData: ScrapData;
  onClick?: () => void;
}

// const processArticle = (
//   article: string
// ): { imageUrls: string[]; content: string } => {
//   const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/g;
//   const imageUrls: string[] = [];
//   let content = article;
//   let match;

//   // 모든 ImageTag를 찾아서 이미지 URL 추출
//   while ((match = imageTagRegex.exec(article)) !== null) {
//     imageUrls.push(match[1]); // 이미지 URL을 배열에 추가
//   }

//   // 이미지 태그를 제거한 본문 내용
//   content = article.replace(imageTagRegex, '').trim();

//   return { imageUrls, content };
// };

const ScrapCard: React.FC<ScrapCardProps> = ({ data, scrapData, onClick }) => {
  // const { imageUrls, content } = processArticle(data.article || '');
  return (
    <ScrapCardDiv onClick={onClick}>
      <ScrapCardLeftDiv>
        <AkarIcon />
      </ScrapCardLeftDiv>
      <ScrapCardRightDiv>
        <EconomicNewsTitleText
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {scrapData.title}
        </EconomicNewsTitleText>
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
        <FooterText>
          {data.uploadDatetime
            ? data.uploadDatetime.split('T')[0].replace(/-/g, '.')
            : ''}
        </FooterText>
      </ScrapCardRightDiv>
    </ScrapCardDiv>
  );
};

export default ScrapCard;
