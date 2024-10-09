import { Center } from '@components/Center';
import { Right } from '@components/Right';
import CenterContent from '@features/Scrap/create/CenterContent';
import RightContent from '@features/Scrap/create/RightContent';
import RightTitle from '@features/Scrap/create/RightTitle';
import { RightDiv, ScrapHr } from '@features/Scrap/scrapStyledComponent';
import { CenterDiv } from '@features/MyNews/styledComponent';
import { useState, useEffect } from 'react';
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
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const {
    bookmarkedDetailNews: economicNews,
    bookmarkedDetailStockNews: stockNews,
    fetchBookmarkedDetailNews,
    fetchBookmarkedDetailStockNews,
  } = useBookmarkStore();

  useEffect(() => {
    fetchBookmarkedDetailNews();
    fetchBookmarkedDetailStockNews();
  }, [fetchBookmarkedDetailNews, fetchBookmarkedDetailStockNews]);

  // 날짜 범위 변경 핸들러
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setSelectedDateRange(dates);
  };
  return (
    <>
      <Center>
        <CustomCenterDiv>
          <CenterContent />
        </CustomCenterDiv>
      </Center>
      <Right>
        <CustomRightDiv>
          <RightTitle onDateRangeChange={handleDateRangeChange} />
          <ScrapHr />
          <RightContent
            selectedDateRange={selectedDateRange}
            economicNews={economicNews}
            stockNews={stockNews}
          />
        </CustomRightDiv>
      </Right>
    </>
  );
};

export default ScrapCreatePage;
