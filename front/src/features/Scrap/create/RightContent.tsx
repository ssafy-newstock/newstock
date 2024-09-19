import { NoMessageP } from '../scrapStyledComponent';
import RightNewsCard from './RightNewsCard';

interface CardData {
  Title: string;
  Media: string;
  Date: string;
  keyword?: string;
}

// 더미 데이터
const cards: CardData[] = [
  {
    Title: '[청년 디지털 인재] “AI부터 ...',
    Media: '청년일보',
    Date: '2024.08.18',
    keyword: '삼성전자',
  },
  {
    Title: '[청년 디지털 인재] “AI부터 ...',
    Media: '청년일보',
    Date: '2024.08.18',
    keyword: '삼성전자',
  },
  {
    Title: '[청년 디지털 인재] “AI부터 ...',
    Media: '청년일보',
    Date: '2024.08.18',
  },
  {
    Title: '[청년 디지털 인재] “AI부터 ...',
    Media: '청년일보',
    Date: '2024.08.18',
  },
];

const RightContent: React.FC = () => {
  return (
    <>
      {cards.length > 0 ? (
        cards.map((data, index) => <RightNewsCard key={index} data={data} />)
      ) : (
        <NoMessageP>스크랩한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
