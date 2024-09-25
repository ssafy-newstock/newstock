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
          <RightTitle />
          <ScrapHr />
          <RightContent onCardClick={setSelectedCard} />
        </RightDiv>
      </Right>
    </>
  );
};

export default ScrapDetailPage;
