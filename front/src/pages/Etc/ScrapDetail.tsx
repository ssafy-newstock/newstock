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
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';
import styled from 'styled-components';
import { CenteredMessage } from '@features/SideModal/styledComponent'; // CenteredMessage 임포트

const CustomCenterDiv = styled(CenterDiv)`
  min-width: 30rem;
  max-width: 100rem;
`;

const CustomRightDiv = styled(RightDiv)`
  min-width: 20rem;
  max-width: 60rem;
`;

const ScrapDetailPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<ScrapData | null>(null);
  const [selectedNewsCard, setSelectedNewsCard] = useState<NewsData | null>(
    null
  );

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
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  // 스크랩 데이터 가져오기 (시황 및 종목 뉴스 모두)
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        await fetchScrapData(); // 시황 뉴스 스크랩 데이터 가져오기
        await fetchScrapStockData(); // 종목 뉴스 스크랩 데이터 가져오기
      } catch (err) {
        setError('데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
      }
    };

    fetchData();
  }, [fetchScrapData, fetchScrapStockData]);

  // scraps + stockScraps 통합 및 scrapNews + scrapStockNews 통합
  useEffect(() => {
    const combinedScraps = [...scraps, ...stockScraps]; // 시황 및 종목 스크랩 통합
    const combinedScrapNews = [...scrapNews, ...scrapStockNews]; // 시황 및 종목 뉴스 통합
    setScrapList(combinedScraps); // 스크랩 데이터
    setScrapNewsList(combinedScrapNews); // 뉴스 데이터
  }, [scraps, stockScraps, scrapNews, scrapStockNews]);

  const handleCardClick = async (scrap: ScrapData, scrapNews: NewsData) => {
    setSelectedCard(scrap);
    setSelectedNewsCard(scrapNews);
  };

  // 에러가 발생한 경우 에러 메시지 표시
  if (error) {
    return <CenteredMessage>{error}</CenteredMessage>;
  }

  return (
    <>
      <Center>
        {selectedCard ? (
          <CustomCenterDiv>
            <CenterTitle
              selectedCard={selectedCard}
              selectedNewsCard={selectedNewsCard!}
            />
            <ScrapHr />
            <CenterContent
              selectedCard={selectedCard}
              selectedNewsCard={selectedNewsCard!}
            />
          </CustomCenterDiv>
        ) : (
          <NoMessageP>조회할 스크랩을 선택해주세요.</NoMessageP>
        )}
      </Center>
      <Right>
        <CustomRightDiv>
          <RightTitle />
          <ScrapHr />
          {scrapList.length === 0 ? (
            <CenteredMessage>스크랩한 뉴스가 없습니다.</CenteredMessage>
          ) : (
            <RightContent
              onCardClick={handleCardClick}
              scrapDatas={scrapList} // 통합된 스크랩 데이터 전달
              scrapNewsDatas={scrapNewsList} // 통합된 뉴스 데이터 전달
            />
          )}
        </CustomRightDiv>
      </Right>
    </>
  );
};

export default ScrapDetailPage;
