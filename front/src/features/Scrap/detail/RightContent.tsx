import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import ScrapCard from '@features/Scrap/detail/ScrapCard';

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
    Title:
      '나 이정준 첫 번째 스크랩뀨뀨뀨뀨뀨뀪뀨뀨뀨뀨뀨뀨뀨뀨뀨뀪뀨뀨뀨뀨뀨뀨뀨뀨뀨뀨뀪뀨뀨뀨',
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
<p><del>ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㅁㄴㅇㅁㅇㅁㅇ</del></p>
<p>ㅁㄴㅇㅁㅇㅁㄴㅇ마ㅣ움니라</p>
<p><strong>ㄴㅇㄹ;니어ㅡㅎ;ㅁㄴㅇ;ㅎ</strong></p>
<h3>ㅁㅁㅇㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁ</h3>
<p>😷</p>
<p>for i in &nbsp;range(1):</p>`,
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
