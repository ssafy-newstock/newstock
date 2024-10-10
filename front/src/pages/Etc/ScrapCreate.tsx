import { Center } from '@components/Center';
import { Right } from '@components/Right';
import CenterContent from '@features/Scrap/create/CenterContent';
import RightContent from '@features/Scrap/create/RightContent';
import RightTitle from '@features/Scrap/create/RightTitle';
import { RightDiv, ScrapHr } from '@features/Scrap/scrapStyledComponent';
import { CenterDiv } from '@features/MyNews/styledComponent';
import { useEffect } from 'react';
import { useBookmarkStore } from '@store/useBookmarkStore';
import styled from 'styled-components';

const CustomCenterDiv = styled(CenterDiv)`
  min-width: 30rem;
  max-width: 100rem;
`;

const CustomRightDiv = styled(RightDiv)`
  min-width: 20rem;
  max-width: 60rem;
`;

const ScrapCreatePage = () => {
  const { fetchBookmarkedDetailNews, fetchBookmarkedDetailStockNews } =
    useBookmarkStore();

  useEffect(() => {
    fetchBookmarkedDetailNews();
    fetchBookmarkedDetailStockNews();
  }, [fetchBookmarkedDetailNews, fetchBookmarkedDetailStockNews]);

  return (
    <>
      <Center>
        <CustomCenterDiv>
          <CenterContent />
        </CustomCenterDiv>
      </Center>
      <Right>
        <CustomRightDiv>
          <RightTitle />
          <ScrapHr />
          <RightContent />
        </CustomRightDiv>
      </Right>
    </>
  );
};

export default ScrapCreatePage;
