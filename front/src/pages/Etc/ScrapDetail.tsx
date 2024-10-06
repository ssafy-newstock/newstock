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

  const { scrapNews, scrapStockNews, fetchScrapData, fetchScrapStockData } =
    useScrapStore();
  const [allScraps, setAllScraps] = useState<ScrapData[]>([]);

  // 날짜 범위 변경 핸들러
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setSelectedDateRange(dates);
  };

  // 스크랩 데이터 가져오기 (시황 및 종목 뉴스 모두)
  useEffect(() => {
    fetchScrapData(); // 시황 뉴스 스크랩 데이터 가져오기
    fetchScrapStockData(); // 종목 뉴스 스크랩 데이터 가져오기
  }, [fetchScrapData, fetchScrapStockData]);

  // 시황 뉴스와 종목 뉴스를 하나의 리스트로 통합
  useEffect(() => {
    const combinedScrapNews = [...scrapNews, ...scrapStockNews];
    setAllScraps(combinedScrapNews);
  }, [scrapNews, scrapStockNews]);

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
            onCardClick={setSelectedCard}
            selectedDateRange={selectedDateRange}
            scrapData={allScraps}
          />
        </RightDiv>
      </Right>
    </>
  );
};

export default ScrapDetailPage;
