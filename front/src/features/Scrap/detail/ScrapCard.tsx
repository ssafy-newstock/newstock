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
  stockNewsStockCodes?: string[];
  stockKeywords?: string[];
}

interface ScrapCardProps {
  data: ScrapData;
  onClick?: () => void;
}

const ScrapCard: React.FC<ScrapCardProps> = ({ data, onClick }) => {
  return (
    <ScrapCardDiv onClick={onClick}>
      <ScrapCardLeftDiv>
        <AkarIcon />
      </ScrapCardLeftDiv>
      <ScrapCardRightDiv>
        <TextP_24_NOTGRAY
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.title}
        </TextP_24_NOTGRAY>
        <ScrapCardRightBottomDiv>
          <div>
            <TextP_16
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.article || data.description || '내용 없음'}
            </TextP_16>
          </div>
          <TextP_16>
            {data.uploadDatetime
              ? data.uploadDatetime.split(' ')[0]
              : '날짜 없음'}
          </TextP_16>
        </ScrapCardRightBottomDiv>
      </ScrapCardRightDiv>
    </ScrapCardDiv>
  );
};

export default ScrapCard;
