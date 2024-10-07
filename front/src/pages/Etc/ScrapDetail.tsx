import RightTitle from '@features/Scrap/detail/RightTitle';
import RightContent from '@features/Scrap/detail/RightContent';
import CenterTitle from '@features/Scrap/detail/CenterTitle';
import CenterContent from '@features/Scrap/detail/CenterContent';
import { useState, useEffect } from 'react';
import { Center } from '@components/Center';
import { Right } from '@components/Right';
import {
  CenterDiv,
  NoMessageP,
  RightDiv,
  ScrapHr,
} from '@features/Scrap/scrapStyledComponent';
import { useScrapStore } from '@store/useScrapStore';

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
  newsId?: number;
}

// interface CardData {
//   Title: string;
//   ScrapData: ScrapData;
//   Date: string;
//   context: string;
// }

const ScrapDetailPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<ScrapData | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const {
    scraps,
    scrapNews,
    stockScraps,
    scrapStockNews,
    fetchScrapData,
    fetchScrapStockData,
    fetchSpecificScrap,
  } = useScrapStore();

  const [scrapNewsList, setScrapNewsList] = useState<ScrapData[]>([]);
  const [scrapList, setScrapList] = useState<ScrapData[]>([]);

  // 날짜 범위 변경 핸들러
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setSelectedDateRange(dates);
  };

  // 스크랩 데이터 가져오기 (시황 및 종목 뉴스 모두)
  useEffect(() => {
    fetchScrapData(); // 시황 뉴스 스크랩 데이터 가져오기
    fetchScrapStockData(); // 종목 뉴스 스크랩 데이터 가져오기
  }, [fetchScrapData, fetchScrapStockData]);

  // scraps + stockScraps 통합 및 scrapNews + scrapStockNews 통합
  useEffect(() => {
    const combinedScraps = [...scraps, ...stockScraps]; // 시황 및 종목 스크랩 통합
    const combinedScrapNews = [...scrapNews, ...scrapStockNews]; // 시황 및 종목 뉴스 통합
    setScrapList(combinedScraps); // 스크랩 데이터
    setScrapNewsList(combinedScrapNews); // 뉴스 데이터
  }, [scraps, stockScraps, scrapNews, scrapStockNews]);

  const handleCardClick = async (scrap: ScrapData) => {
    console.log('해당 스크랩의 뉴스아이디 : ', scrap.id!);
    try {
      // 특정 스크랩 조회 요청
      await fetchSpecificScrap(scrap.id!);

      // 조회된 industryScrapDto와 industryNewsDto를 Zustand store에서 가져옴
      const { industryScrapDto, industryNewsDto } = useScrapStore.getState();
      console.log(industryScrapDto);
      console.log(industryNewsDto);

      // industryScrapDto와 industryNewsDto가 존재하는 경우 상태로 설정
      if (industryScrapDto.length > 0 && industryNewsDto.length > 0) {
        console.log('23232');

        setSelectedCard({
          ...industryScrapDto[0], // 북마크 정보 (첫 번째 요소)
          ...industryNewsDto[0], // 관련 뉴스 정보 (첫 번째 요소)
        });
      } else {
        console.log('232');
        setSelectedCard(scrap); // 관련 뉴스가 없으면 기존 스크랩 정보만 설정
      }
    } catch (error) {
      console.error('시황 뉴스 스크랩 조회 중 오류 발생:', error);
      // 오류 메시지를 사용자에게 보여줄 수 있는 로직을 추가할 수 있음
    }
  };
  console.log(selectedCard);
  return (
    <>
      <Center>
        {selectedCard ? (
          <CenterDiv>
            <CenterTitle selectedCard={selectedCard} />
            <ScrapHr />
            <CenterContent selectedCard={selectedCard} />
          </CenterDiv>
        ) : (
          <NoMessageP>조회할 스크랩을 선택해주세요.</NoMessageP>
        )}
      </Center>
      <Right>
        <RightDiv>
          <RightTitle onDateRangeChange={handleDateRangeChange} />
          <ScrapHr />
          <RightContent
            onCardClick={handleCardClick}
            selectedDateRange={selectedDateRange}
            scrapData={scrapList} // 통합된 스크랩 데이터 전달
            scrapNewsData={scrapNewsList} // 통합된 뉴스 데이터 전달
          />
        </RightDiv>
      </Right>
    </>
  );
};

export default ScrapDetailPage;
