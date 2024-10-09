import {
  CenterContentDiv,
  CenterNewsContextDiv,
  CenterNewsDiv,
  CenterNewsLeftDiv,
  CenterNewsRightDiv,
  CustomCenterNewsRightImg,
  EconomicNewsTitleText,
  EconomicNewsContent,
  EconomicNewsFooter,
  FooterText,
  MediaWrapper,
  MediaLogo,
} from '@features/Scrap/detail/scrapDetailCenterStyledComponent';
import newstockIcon from '@assets/Stock/blueLogo.png';
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CustomCenterNewsDiv = styled(CenterNewsDiv)`
  gap: 1.2rem;
  cursor: pointer;

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

interface CenterContentProps {
  selectedCard: ScrapData;
  selectedNewsCard: NewsData;
}

const processArticle = (
  article: string
): { imageUrls: string[]; content: string } => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/g;
  const imageUrls: string[] = [];
  let content = article;
  let match;

  // 모든 ImageTag를 찾아서 이미지 URL 추출
  while ((match = imageTagRegex.exec(article)) !== null) {
    imageUrls.push(match[1]); // 이미지 URL을 배열에 추가
  }

  // 이미지 태그를 제거한 본문 내용
  content = article.replace(imageTagRegex, '').trim();

  return { imageUrls, content };
};

const CenterContent: React.FC<CenterContentProps> = ({
  selectedCard,
  selectedNewsCard,
}) => {
  const navigate = useNavigate();
  // 업로드 날짜를 포맷팅
  const formattedDate =
    selectedNewsCard.uploadDatetime?.split('T')[0].replace(/-/g, '.') ||
    '날짜 불명';

  const mediaImageUrl = selectedNewsCard?.media
    ? `https://stock.vaiv.kr/resources/images/news/${selectedNewsCard.media}.png`
    : '';

  // article이 undefined일 경우 기본값을 제공
  const { content } = processArticle(selectedNewsCard.article || '');

  // CenterNewsDiv 클릭 시 상세 페이지로 이동
  const handleNewsClick = () => {
    if (selectedCard.newsType === 'stock') {
      navigate(`/subnews-main/stock-news/${selectedNewsCard.id}`);
    } else {
      navigate(`/subnews-main/economic-news/${selectedNewsCard.id}`);
    }
  };

  return (
    <CenterContentDiv>
      <CustomCenterNewsDiv onClick={handleNewsClick}>
        {selectedNewsCard.thumbnail ? (
          <CustomCenterNewsRightImg src={selectedNewsCard.thumbnail} />
        ) : (
          <CenterNewsRightDiv />
        )}
        <CenterNewsLeftDiv style={{ overflow: 'hidden' }}>
          <EconomicNewsTitleText
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {selectedNewsCard.title}
          </EconomicNewsTitleText>
          <EconomicNewsContent
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {content}
          </EconomicNewsContent>

          <EconomicNewsFooter>
            <MediaWrapper>
              <MediaLogo
                src={mediaImageUrl}
                alt="media"
                onError={(e) => {
                  e.currentTarget.src = newstockIcon; // 이미지 로드 실패 시 기본 이미지로 대체
                }}
              />
              <FooterText>{selectedNewsCard.media}</FooterText>
            </MediaWrapper>
            <FooterText> {formattedDate}</FooterText>
          </EconomicNewsFooter>
        </CenterNewsLeftDiv>
      </CustomCenterNewsDiv>
      <CenterNewsContextDiv>
        <div dangerouslySetInnerHTML={{ __html: selectedCard.content || '' }} />
      </CenterNewsContextDiv>
    </CenterContentDiv>
  );
};

export default CenterContent;
