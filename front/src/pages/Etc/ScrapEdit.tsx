import { Center } from '@components/Center';
import { Right } from '@components/Right';
import CenterContent from '@features/Scrap/edit/CenterContent';
import RightContent from '@features/Scrap/create/RightContent';
import RightTitle from '@features/Scrap/create/RightTitle';
import { RightDiv, ScrapHr } from '@features/Scrap/scrapStyledComponent';
import { CenterDiv } from '@features/MyNews/styledComponent';
import { useEffect } from 'react';
import { useBookmarkStore } from '@store/useBookmarkStore';
// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ScrapEditPage = () => {
  const location = useLocation();
  const { selectedCard, selectedNewsCard } = location.state || {};
  // const { scrapId } = useParams<{ scrapId: string }>();

  const { fetchBookmarkedDetailNews, fetchBookmarkedDetailStockNews } =
    useBookmarkStore();

  useEffect(() => {
    fetchBookmarkedDetailNews();
    fetchBookmarkedDetailStockNews();
  }, [fetchBookmarkedDetailNews, fetchBookmarkedDetailStockNews]);

  return (
    <>
      <Center>
        <CenterDiv>
          <CenterContent
            selectedCard={selectedCard}
            selectedNewsCard={selectedNewsCard}
          />
        </CenterDiv>
      </Center>
      <Right>
        <RightDiv>
          <RightTitle />
          <ScrapHr />
          <RightContent />
        </RightDiv>
      </Right>
    </>
  );
};

export default ScrapEditPage;
