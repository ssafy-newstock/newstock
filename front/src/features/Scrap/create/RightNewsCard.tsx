import { TextP_16, TextP_22 } from '@features/Scrap/scrapStyledComponent';
import {
  RightNewsCardBottomDiv,
  RightNewsCardDiv,
  RightNewsCardTagDiv,
  RightNewsCardTagP,
} from '@features/Scrap/create/scrapCreateRightStyledComponent';
import { format, parseISO } from 'date-fns';

interface NewsData {
  id: number;
  title: string;
  subtitle: string | null;
  media: string;
  description: string;
  thumbnail: string;
  uploadDatetime: string;
  article: string;
  sentiment: string;
  industry?: string;
  stockNewsStockCodes?: { stockCode: string; stockName: string }[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
}
interface RightNewsProps {
  data: NewsData;
}

const RightNewsCard: React.FC<RightNewsProps> = ({ data }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
    e.dataTransfer.effectAllowed = 'move'; // 이동 가능한 요소로 설정
    document.body.style.cursor = 'grabbing'; // 드래그 시작 시 커서 변경
  };

  const handleDragEnd = () => {
    document.body.style.cursor = 'default'; // 드래그 끝난 후 커서 원래대로
  };

  const formattedDate = format(parseISO(data.uploadDatetime), 'yyyy.MM.dd');
  return (
    <RightNewsCardDiv
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd} // 드래그 끝난 후 커서 복구
      style={{ cursor: 'grab' }} // 기본적으로 'grab' 커서
    >
      <TextP_22
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {data.title}
      </TextP_22>
      <RightNewsCardBottomDiv>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <TextP_16>{data.media}</TextP_16>
          <TextP_16>{formattedDate}</TextP_16>
        </div>
        {data.stockKeywords && (
          <RightNewsCardTagDiv>
            <RightNewsCardTagP>#{data.stockKeywords[0]}</RightNewsCardTagP>
          </RightNewsCardTagDiv>
        )}
      </RightNewsCardBottomDiv>
    </RightNewsCardDiv>
  );
};

export default RightNewsCard;
