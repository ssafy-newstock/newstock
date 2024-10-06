import { Center } from '@components/Center';
import { CenterDiv, MyStockHr } from '@features/MyStock/myStockStyledComponent';
import CenterTitle from '@features/MyStock/CenterTitle';
import {
  CenterHistoryDiv,
  MyStockCartRowSkeleton,
  MyStockGridRow,
  StockGridColumn,
} from '@features/MyStock/myStockCenterStyledComponent';
import { Flex } from '@components/styledComponent';
import SectionTitle from '@features/MyStock/SectionTitle';
import { StockHoldingsFirstRow } from '@features/MyStock/StockHoldingList';
import { TradingHistoryFirstRow } from '@features/MyStock/TradingHistoryList';
import MyStockSkeletonCenter from '@features/MyStock/skeleton/MyStockSkeletonCenter';
import { StockCardColumnSkeleton } from '@features/Stock/styledComponent';

const MyStockSkeleton = () => {
  return (
    <>
      <Center>
        <CenterDiv>
          <CenterTitle title={'관심 종목'} />
          <MyStockHr />
          <StockGridColumn>
            {Array.from({ length: 5 }).map((_, index) => (
              <StockCardColumnSkeleton key={index} />
            ))}
          </StockGridColumn>
          <CenterTitle title={'나의 자산'} />
          <MyStockHr />
          {/* 여기 수정하고 리액트 쿼리 바꾸기 */}
          <MyStockSkeletonCenter />
          <Flex>
            <CenterHistoryDiv>
              <SectionTitle title="내 주식 TOP 10" />
              <MyStockHr />
              <MyStockGridRow>
                <StockHoldingsFirstRow />
                {Array.from({ length: 5 }).map((_, index) => (
                  <MyStockCartRowSkeleton key={index} />
                ))}
              </MyStockGridRow>
            </CenterHistoryDiv>
            <CenterHistoryDiv>
              <SectionTitle title="최근 거래 내역" />
              <MyStockHr />
              <MyStockGridRow>
                <TradingHistoryFirstRow />
                {Array.from({ length: 5 }).map((_, index) => (
                  <MyStockCartRowSkeleton key={index} />
                ))}
              </MyStockGridRow>
            </CenterHistoryDiv>
          </Flex>
        </CenterDiv>
      </Center>
    </>
  );
};

export default MyStockSkeleton;
