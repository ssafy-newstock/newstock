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
import { ScrapData, NewsData } from '@pages/News/ScrapNewsInterface';

const ScrapDetailPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<ScrapData | null>(null);
  const [selectedNewsCard, setSelectedNewsCard] = useState<NewsData | null>(
    null
  );
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
  } = useScrapStore();

  const [scrapList, setScrapList] = useState<ScrapData[]>([]);
  const [scrapNewsList, setScrapNewsList] = useState<NewsData[]>([]);

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
    console.log('scrap-detail의 시황 및 종목 스크랩 : ', scraps);
    console.log('scrap-detail의 시황 뉴스 : ', scrapNews);
    console.log('scrap-detail의 종목 스크랩 : ', stockScraps);
    console.log('scrap-detail의 종목 뉴스 : ', scrapStockNews);
    const combinedScraps = [...scraps, ...stockScraps]; // 시황 및 종목 스크랩 통합
    const combinedScrapNews = [...scrapNews, ...scrapStockNews]; // 시황 및 종목 뉴스 통합
    setScrapList(combinedScraps); // 스크랩 데이터
    setScrapNewsList(combinedScrapNews); // 뉴스 데이터
  }, [scraps, stockScraps, scrapNews, scrapStockNews]);

  useEffect(() => {
    console.log('scrap-detail의 스크랩 통합 : ', scrapList);
    console.log('scrap-detail의 뉴스 통합 : ', scrapNewsList);
  }, [scrapList, scrapNewsList]);

  const handleCardClick = async (scrap: ScrapData, scrapNews: NewsData) => {
    console.log('scrap : ', scrap);
    console.log('scrapNews : ', scrapNews);
    setSelectedCard(scrap);
    setSelectedNewsCard(scrapNews);
  };

  useEffect(() => {
    console.log('selectedCard : ', selectedCard);
    console.log('selectedNewsCard : ', selectedNewsCard);
  }, [selectedCard, selectedNewsCard, setSelectedCard, setSelectedNewsCard]);

  return (
    <>
      <Center>
        {selectedCard ? (
          <CenterDiv>
            <CenterTitle
              selectedCard={selectedCard}
              selectedNewsCard={selectedNewsCard!}
            />
            <ScrapHr />
            <CenterContent
              selectedCard={selectedCard}
              selectedNewsCard={selectedNewsCard!}
            />
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
            scrapDatas={scrapList} // 통합된 스크랩 데이터 전달
            scrapNewsDatas={scrapNewsList} // 통합된 뉴스 데이터 전달
          />
        </RightDiv>
      </Right>
    </>
  );
};

export default ScrapDetailPage;
