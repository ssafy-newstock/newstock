import LeftNews from '@components/LeftNews';
import RightTitle from '@features/Scrap/detail/RightTitle';
import RightContent from '@features/Scrap/detail/RightContent';
import CenterTitle from '@features/Scrap/detail/CenterTitle';
import CenterContent from '@features/Scrap/detail/CenterContent';
import { useState } from 'react';
import { Center } from '@components/Center';
import { Right } from '@components/Right';
import {
  CenterDiv,
  NoMessageP,
  RightDiv,
  ScrapHr,
} from '@features/Scrap/scrapStyledComponent';

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

const ScrapDetailPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  // 날짜 범위 변경 핸들러
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setSelectedDateRange(dates);
  };
  return (
    <>
      <LeftNews />
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
          />
        </RightDiv>
      </Right>
    </>
  );
};

export default ScrapDetailPage;
