import styled from 'styled-components';
import newstockIcon from '@assets/Stock/blueLogo.png';

const NewsBodyFooterWrapper = styled.div`
  display: flex;
  padding: 0 0.3rem;
  align-items: center;
  gap: 0.75rem;
`;

const NewsBodyFooterWriter = styled.p`
  color: #828282;
  font-size: 0.7rem;
  line-height: 1.9rem;
`;

const LineSVG = styled.div`
  width: 0.05rem;
  height: 0.7rem;
  background-color: #828282;
`;

const NewsBodyFooterDate = styled.p`
  color: #828282;
  font-size: 0.7rem;
  line-height: 1.9rem;
`;

const MediaLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain; /* 이미지 비율을 유지하면서 컨테이너 안에 맞춤 */
  border-radius: 50%;
`;

interface NewsBodyFooterProps {
  media: string;
  date: string;
}

const NewsBodyFooter: React.FC<NewsBodyFooterProps> = ({ media, date }) => {
  const formattedDate = date.split('T')[0].replace(/-/g, '.');
  const mediaImageUrl = `https://stock.vaiv.kr/resources/images/news/${media}.png`;

  return (
    <NewsBodyFooterWrapper>
      <MediaLogo
        src={mediaImageUrl}
        alt={media}
        onError={(e) => {
          e.currentTarget.src = newstockIcon; // 이미지 로드 실패 시 기본 이미지로 대체
        }}
      />
      <NewsBodyFooterWriter>{media}</NewsBodyFooterWriter>
      <LineSVG />
      <NewsBodyFooterDate>{formattedDate}</NewsBodyFooterDate>
    </NewsBodyFooterWrapper>
  );
};

export default NewsBodyFooter;
