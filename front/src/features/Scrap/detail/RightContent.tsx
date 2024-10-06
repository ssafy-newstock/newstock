import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import ScrapCard from '@features/Scrap/detail/ScrapCard';
import { useEffect, useState } from 'react';
import { isWithinInterval, parse } from 'date-fns';

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

// interface CardData {
//   Title: string;
//   NewsItem: ScrapData;
//   Date: string;
//   context: string;
// }

// // 더미 데이터
// const cards: ScrapData[] = [
//   {
//     title:
//       '첫번째 스크랩 입니다.첫번째 스크랩 입니다첫번째 스크랩 입니다첫번째 스크랩 입니다',
//     NewsItem: {
//       title:
//         "\"'한국'만 들어가면 난리나요\"해외에서 더 열광하는 '이것'첫번째 스크랩 입니다첫번째 스크랩 입니다첫번째 스크랩 입니다첫번째 스크랩 입니다첫번째 스크랩 입니다",
//       description:
//         '[비즈니스 포커스]‘참이슬’, ‘진로’ 등의 소주 브랜드를 보유한 하이트진로는 현재 베트남에 첫 해외 소주 공장을 짓고 있다. 동남아시아에서 소주가 큰 인기를 끌자 급증하// [비즈니스 포커스]‘참이슬’, ‘진로’ 등의 소주 브랜드를 보유한 하이트진로는 현재 베트남에 첫 해외 소주 공장을 짓고 있다. 동남아시아에서 소주가 큰 인기를 끌자 급증하',
//       media: '한경비즈니스',
//       thumbnail:
//         'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202409/07/kedbiz/20240907093504339mqsb.jpg',
//       uploadDatetime: '2024-09-07 09:35:00',
//       stockId: '20240907093501345',
//     },
//     Date: '2024.08.18',
//     context: `<p><em>기울임 스타일</em></p>
// <p><del>취소선 테스트</del></p>
// <p>이건 뭐지</p>
// <p><strong>스트롱?</strong></p>
// <h3>h3 태그</h3>
// <p>😷</p>
// <p>for i in &nbsp;range(1):</p>`,
//   },
// ];

interface RightContentProps {
  onCardClick: (card: ScrapData) => void; // 클릭 시 호출되는 함수
  selectedDateRange: [Date | null, Date | null];
  scrapData: ScrapData[];
}

const RightContent: React.FC<RightContentProps> = ({
  onCardClick,
  selectedDateRange,
  scrapData,
}) => {
  const [filteredScrap, setFilteredScrap] = useState<ScrapData[]>(scrapData);

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      const filtered = scrapData.filter((scrap) => {
        const scrapDate = parse(
          scrap.uploadDatetime ?? '',
          'yyyy.MM.dd',
          new Date()
        ); // card.Date를 Date 객체로 변환
        return isWithinInterval(scrapDate, {
          start: startDate, // 여기에 Date 객체 사용
          end: endDate,
        });
      });

      setFilteredScrap(filtered);
    } else {
      setFilteredScrap(scrapData); // 날짜가 없으면 전체 뉴스
    }
  }, [selectedDateRange, scrapData]);

  return (
    <>
      {filteredScrap.length > 0 ? (
        filteredScrap.map((scrap) => (
          <ScrapCard
            key={scrap.id}
            data={scrap}
            onClick={() => onCardClick(scrap)}
          />
        ))
      ) : (
        <NoMessageP>스크랩한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
