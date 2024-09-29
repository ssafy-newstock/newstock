import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import ScrapCard from '@features/Scrap/detail/ScrapCard';
import { useEffect, useState } from 'react';
import { isWithinInterval, parse } from 'date-fns';

interface NewsItem {
  title: string;
  description: string;
  media: string;
  uploadDatetime: string;
  thumbnail?: string;
  stockId: string;
}

interface CardData {
  Title: string;
  NewsItem: NewsItem;
  Date: string;
  context: string;
}

// 더미 데이터
const cards: CardData[] = [
  {
    Title: '첫 번 째 스 크 랩 입니다.',
    NewsItem: {
      title: "\"'한국'만 들어가면 난리나요\"...해외에서 더 열광하는 '이것'",
      description:
        '[비즈니스 포커스]‘참이슬’, ‘진로’ 등의 소주 브랜드를 보유한 하이트진로는 현재 베트남에 첫 해외 소주 공장을 짓고 있다. 동남아시아에서 소주가 큰 인기를 끌자 급증하// [비즈니스 포커스]‘참이슬’, ‘진로’ 등의 소주 브랜드를 보유한 하이트진로는 현재 베트남에 첫 해외 소주 공장을 짓고 있다. 동남아시아에서 소주가 큰 인기를 끌자 급증하',
      media: '한경비즈니스',
      thumbnail:
        'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202409/07/kedbiz/20240907093504339mqsb.jpg',
      uploadDatetime: '2024-09-07 09:35:00',
      stockId: '20240907093501345',
    },
    Date: '2024.08.18',
    context: `<p><br></p>
<p><em>기울임 스타일</em></p>
<p><del>취소선 테스트</del></p>
<p>이건 뭐지</p>
<p><strong>스트롱?</strong></p>
<h3>h3 태그</h3>
<p>😷</p>
<p>for i in &nbsp;range(1):</p>`,
  },
];

interface RightContentProps {
  onCardClick: (card: CardData) => void; // 클릭 시 호출되는 함수
  selectedDateRange: [Date | null, Date | null];
}

const RightContent: React.FC<RightContentProps> = ({
  onCardClick,
  selectedDateRange,
}) => {
  const [filteredScrap, setFilteredScrap] = useState(cards);
  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      const filtered = cards.filter((card) => {
        const cardDate = parse(card.Date, 'yyyy.MM.dd', new Date()); // card.Date를 Date 객체로 변환
        return isWithinInterval(cardDate, {
          start: startDate, // 여기에 Date 객체 사용
          end: endDate,
        });
      });

      setFilteredScrap(filtered);
    } else {
      setFilteredScrap(cards); // 날짜가 없으면 전체 뉴스
    }
  }, [selectedDateRange, cards]);

  return (
    <>
      {cards.length > 0 ? (
        filteredScrap.map((data, index) => (
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
