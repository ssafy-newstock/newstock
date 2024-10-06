import {
  TextP_16,
  TextP_20,
  TextP_24_NOTGRAY,
} from '@features/Scrap/scrapStyledComponent';
import {
  CenterContentDiv,
  CenterNewsContextDiv,
  CenterNewsDiv,
  CenterNewsLeftDiv,
  CenterNewsLeftTopDiv,
  CenterNewsRightDiv,
  CenterNewsRightImg,
} from '@features/Scrap/detail/scrapDetailCenterStyledComponent';

interface ScrapData {
  id: number;
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
  stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
}

interface CardData {
  ScrapData: ScrapData;
  context: string;
}

interface CenterContentProps {
  selectedCard: CardData;
}

const CenterContent: React.FC<CenterContentProps> = ({ selectedCard }) => {
  const formattedDate =
    selectedCard.ScrapData.uploadDatetime?.split(' ')[0].replace(/-/g, '.') ||
    '날짜 불명';
  return (
    <CenterContentDiv>
      <CenterNewsDiv>
        <CenterNewsLeftDiv>
          <TextP_24_NOTGRAY
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {selectedCard.ScrapData.title}
          </TextP_24_NOTGRAY>
          <TextP_20
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {selectedCard.ScrapData.description}
          </TextP_20>

          <CenterNewsLeftTopDiv>
            <TextP_16>{selectedCard.ScrapData.media}</TextP_16>
            <TextP_16> {formattedDate}</TextP_16>
          </CenterNewsLeftTopDiv>
        </CenterNewsLeftDiv>
        {selectedCard.ScrapData.thumbnail ? (
          <CenterNewsRightImg src={selectedCard.ScrapData.thumbnail} />
        ) : (
          <CenterNewsRightDiv />
        )}
      </CenterNewsDiv>
      <CenterNewsContextDiv>
        <div dangerouslySetInnerHTML={{ __html: selectedCard.context }} />
      </CenterNewsContextDiv>
    </CenterContentDiv>
  );
};

export default CenterContent;
