import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import RightNewsCard from '@features/Scrap/create/RightNewsCard';

interface CardData {
  title: string;
  media: string;
  description: string;
  uploadDatetime: string;
  thumbnail?: string;
  keywords?: string[];
}

// 더미 데이터
const cards: CardData[] = [
  {
    title: "\"'한국'만 들어가면 난리나요\"...해외에서 더 열광하는 '이것'",
    media: '한경비즈니스',
    description:
      '[비즈니스 포커스]‘참이슬’, ‘진로’ 등의 소주 브랜드를 보유한 하이트진로는 현재 베트남에 첫 해외 소주 공장을 짓고 있다. 동남아시아에서 소주가 큰 인기를 끌자 급증하// [비즈니스 포커스]‘참이슬’, ‘진로’ 등의 소주 브랜드를 보유한 하이트진로는 현재 베트남에 첫 해외 소주 공장을 짓고 있다. 동남아시아에서 소주가 큰 인기를 끌자 급증하',
    uploadDatetime: '2024-09-07 09:35:00',
    thumbnail:
      'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202409/07/kedbiz/20240907093504339mqsb.jpg',
    keywords: ['케이푸드', '해외', '수출', '하이트진로', '소주'],
  },
  {
    title: 'K-배터리 美공장에 \'강성\' 전미자동차노조 확산…"인건비 압박"',
    media: '뉴스1',
    description:
      '(서울=뉴스1) 박종홍 기자 = 미국 인플레이션감축법(IRA) 혜택을 보고 현지에 진출한 국내 전기차 배터리 제조 업체들이 커지는 노조 입김에 고심하고 있다. 전기차 캐즘',
    uploadDatetime: '2024-09-07 06:31:00',
    thumbnail:
      'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202409/07/NEWS1/20240907063143044jceu.jpg',
    keywords: ['노조', '셀즈', '배터리', '공장', '캐즘'],
  },
  {
    title: '길어진 여름, 주류업계 실적 선방…지난해 말 출고가 인상 효과',
    media: '지디넷코리아',
    description:
      '(지디넷코리아=김민아 기자)긴 여름이 이어지면서 주류업체가 2분기 선방한 실적을 냈지만, 주가는 반짝 상승에 그친 것으로 나타났다. 증권가에서는 하반기 실적 개선이 전망된',
    uploadDatetime: '2024-09-07 12:00:00',
    thumbnail:
      'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202409/07/ZDNetKorea/20240907120040227vuyk.jpg',
    keywords: ['하이트진로', '실적', '주가', '분기', '롯데칠성'],
  },
  {
    title: "중국발 태풍에 휘청이는 폭스바겐…'예방주사' 맞은 현대차, 추격 고삐",
    media: '뉴스1',
    description:
      "(서울=뉴스1) 이동희 기자 = '전화위복.'글로벌 완성차 업계에 충격을 준 '독일 국민차' 폭스바겐의 독일 공장 폐쇄 소식 이후 현대차그룹을 향한 국내 완성차 업계의 반",
    uploadDatetime: '2024-09-07 07:01:00',
    thumbnail:
      'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202409/07/NEWS1/20240907070155932cyqh.jpg',
    keywords: ['폭스바겐', '현대차그룹', '중국', '공장폐쇄', '완성차'],
  },
  {
    title: "[신상잇슈] 정관장 '홍이장군 점프스틱'·안주야 '소곱창 볶음한판'",
    media: '연합뉴스',
    description:
      "▲ 오뚜기는 롯데마트와 롯데슈퍼 전용 신제품인 '카레치킨'과 '열김치우동'을 출시했다. 카레치킨은 오뚜기 카레 55주년을 맞아 출시한 제품으로, 100% 닭다리살에 오뚜기",
    uploadDatetime: '2024-09-07 07:03:00',
    thumbnail:
      'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202409/07/yonhap/20240907070309865rxcb.jpg',
    keywords: ['홍이장군', '카레', '제품', '오뚜기', '안주야'],
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
