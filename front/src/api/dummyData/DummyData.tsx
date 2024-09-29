import economicData from '@api/dummyData/20210624-industry.json'; // 실제 파일 경로에 맞게 변경
import stockData from '@api/dummyData/20210624-stock.json'; // 실제 파일 경로에 맞게 변경

// 산업 관련 뉴스 데이터 타입 정의
interface NewsItem {
  title: string;
  subtitle?: string;
  media: string;
  description: string;
  thumbnail?: string;
  uploadDatetime: string;
  article: string;
  newsId: string;
  industry: string;
}

// 주식 관련 뉴스 데이터 타입 정의
interface StockNewsItem {
  title: string;
  subtitle?: string;
  media: string;
  description: string;
  thumbnail?: string;
  uploadDatetime: string;
  article: string;
  newsId: string;
  stockCodes: string[];
  keywords: string[];
}

// 산업 뉴스 데이터 타입
interface EconomicData {
  newsDate: string;
  collectDate: string;
  totalCnt: number;
  data: NewsItem[];
}

// 주식 뉴스 데이터 타입
interface StockData {
  newsDate: string;
  collectDate: string;
  totalCnt: number;
  data: StockNewsItem[];
}

// 두 데이터를 함께 반환하는 함수
export const getNewsData = () => {
  return {
    economic: economicData as EconomicData,
    stock: stockData as StockData,
  };
};

// 산업 종류 리스트
export const industryList: string[] = [
  'all',
  'finance', // 금융
  'industry', // 산업
  'employ', // 고용
  'autos', // 자동차
  'stock', // 주식
  'estate', // 부동산
  'consumer', // 소비자
  'worldeconomy', // 세계 경제
  'coin',
  'pension',
  'policy',
  'startup',
  // 필요한 다른 산업 종류들을 여기에 추가
];

// industry 값을 한글로 변환해주는 함수
export const translateIndustry = (industry: string): string => {
  const translations: { [key: string]: string } = {
    all: '전체 기사',
    finance: '금융',
    industry: '산업',
    employ: '취업/고용',
    autos: '자동차',
    stock: '주식',
    estate: '부동산',
    consumer: '소비자',
    worldeconomy: '국제경제',
    coin: '가상자산',
    pension: '연금/노후',
    policy: '경제정책',
    startup: '벤처/스타트업',
    // 필요한 다른 번역 값들을 여기에 추가
  };

  // 해당 industry 값이 번역 목록에 있으면 반환하고, 없으면 원래 값을 반환
  return translations[industry] || industry;
};

// 한글 industry를 영어로 변환하는 함수
export const translateCategoryToEnglish = (category: string): string => {
  const translations: { [key: string]: string } = {
    '전체 기사': 'all',
    금융: 'finance',
    산업: 'industry',
    '취업/고용': 'employ',
    자동차: 'autos',
    주식: 'stock',
    부동산: 'estate',
    소비자: 'consumer',
    국제경제: 'worldeconomy',
    가상자산: 'coin',
    '연금/노후': 'pension',
    경제정책: 'policy',
    '벤처/스타트업': 'startup',
  };

  // 해당 category 값이 번역 목록에 있으면 영문 값을 반환하고, 없으면 그대로 반환
  return translations[category] || category;
};
