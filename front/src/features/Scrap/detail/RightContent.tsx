import { NoMessageP } from '../scrapStyledComponent';
import ScrapCard from './ScrapCard';

interface CardData {
  Title: string;
  NewsTitle: string;
  Date: string;
}

// 더미 데이터
const cards: CardData[] = [
  {
    Title: '나 이정준 첫 번째 스크랩',
    NewsTitle: '[청년 디지털 인재] “AI부터 ...',
    Date: '2024.08.18',
  },
  {
    Title: '나 이주호 두 번째 스크랩',
    NewsTitle: '[청년 디지털 인재] “AI부터 ...',
    Date: '2024.08.18',
  },
  {
    Title: '아 숙제하기 싫다.',
    NewsTitle: '[청년 디지털 인재] “AI부터 ...',
    Date: '2024.08.18',
  },
];

interface RightContentProps {
  onCardClick: (card: CardData) => void; // 클릭 시 호출되는 함수
}

const RightContent: React.FC<RightContentProps> = ({ onCardClick }) => {
  return (
    <>
      {cards.length > 0 ? (
        cards.map((data, index) => (
          <ScrapCard
            key={index}
            data={data}
            onClick={() => onCardClick(data)}
          />
        ))
      ) : (
        <NoMessageP>스크랩한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
