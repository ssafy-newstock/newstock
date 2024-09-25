import { AkarIcon } from './Icon';
import {
  TextP_24_NOTGRAY,
  TextP_16,
} from '@features/Scrap/scrapStyledComponent';
import {
  ScrapCardDiv,
  ScrapCardLeftDiv,
  ScrapCardRightBottomDiv,
  ScrapCardRightDiv,
} from '@features/Scrap/detail/scrapDetailRightStyledComponent';

interface NewsItem {
  title: string;
}

interface Data {
  Title: string;
  NewsItem: NewsItem;
  Date: string;
}

interface ScrapCardProps {
  data: Data;
  onClick?: () => void;
}

const ScrapCard: React.FC<ScrapCardProps> = ({ data, onClick }) => {
  return (
    <ScrapCardDiv onClick={onClick}>
      <ScrapCardLeftDiv>
        <AkarIcon />
      </ScrapCardLeftDiv>
      <ScrapCardRightDiv>
        <TextP_24_NOTGRAY>{data.Title}</TextP_24_NOTGRAY>
        <ScrapCardRightBottomDiv>
          <TextP_16>{data.NewsItem.title}</TextP_16>
          <TextP_16>{data.Date}</TextP_16>
        </ScrapCardRightBottomDiv>
      </ScrapCardRightDiv>
    </ScrapCardDiv>
  );
};

export default ScrapCard;
