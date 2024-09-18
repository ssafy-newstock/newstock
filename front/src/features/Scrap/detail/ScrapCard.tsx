import { AkarIcon } from './Icon';
import { TextP_24_NOTGRAY, TextP_16 } from '../scrapStyledComponent';
import {
  ScrapCardDiv,
  ScrapCardLeftDiv,
  ScrapCardRightBottomDiv,
  ScrapCardRightDiv,
} from './scrapDetailRightStyledComponent';

interface Data {
  Title: string;
  NewsTitle: string;
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
          <TextP_16>{data.NewsTitle}</TextP_16>
          <TextP_16>{data.Date}</TextP_16>
        </ScrapCardRightBottomDiv>
      </ScrapCardRightDiv>
    </ScrapCardDiv>
  );
};

export default ScrapCard;
