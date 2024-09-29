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
interface NewsItem {
  title: string;
  description: string;
  media: string;
  uploadDatetime: string;
  thumbnail?: string;
  stockId: string;
}

interface CardData {
  NewsItem: NewsItem;
  context: string;
}

interface CenterContentProps {
  selectedCard: CardData;
}

const CenterContent: React.FC<CenterContentProps> = ({ selectedCard }) => {
  const formattedDate =
    selectedCard.NewsItem.uploadDatetime?.split(' ')[0].replace(/-/g, '.') ||
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
            {selectedCard.NewsItem.title}
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
            {selectedCard.NewsItem.description}
          </TextP_20>

          <CenterNewsLeftTopDiv>
            <TextP_16>{selectedCard.NewsItem.media}</TextP_16>
            <TextP_16> {formattedDate}</TextP_16>
          </CenterNewsLeftTopDiv>
        </CenterNewsLeftDiv>
        {selectedCard.NewsItem.thumbnail ? (
          <CenterNewsRightImg src={selectedCard.NewsItem.thumbnail} />
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
