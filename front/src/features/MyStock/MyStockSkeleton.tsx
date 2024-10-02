import { Center } from "@components/Center";
import LeftStock from "@components/LeftStock";
import { CenterDiv, MyStockHr } from "@features/MyStock/myStockStyledComponent";
import CenterTitle from "./CenterTitle";
import { CenterHistoryDiv, MyStockGridRow, StockGridColumn } from "@features/MyStock/myStockCenterStyledComponent";
import CenterContent from "@features/MyStock/CenterContent";
import { Flex } from "@components/styledComponent";
import SectionTitle from "@features/MyStock/SectionTitle";
import { StockHoldingsFirstRow } from "@features/MyStock/StockHoldingList";
import { TradingHistoryFirstRow } from "@features/MyStock/TradingHistoryList";
import { RightVacant } from "@components/RightVacant";

const MyStockSkeleton = () => {
  return (
    <>
      <LeftStock />
      <Center>
        <CenterDiv>
          <CenterTitle title={'관심 종목'} />
          <MyStockHr />
          <StockGridColumn>
            
          </StockGridColumn>
          <CenterTitle title={'나의 자산'} />
          <MyStockHr />
          <CenterContent />
          <Flex>
            <CenterHistoryDiv>
              <SectionTitle
                title="내 주식 TOP 10"
              />
              <MyStockHr />
              <MyStockGridRow>
                <StockHoldingsFirstRow />
                
              </MyStockGridRow>
            </CenterHistoryDiv>
            <CenterHistoryDiv>
              <SectionTitle
                title="최근 거래 내역"
              />
              <MyStockHr />
              <MyStockGridRow>
                <TradingHistoryFirstRow />

              </MyStockGridRow>
            </CenterHistoryDiv>
          </Flex>
        </CenterDiv>
      </Center>
      <RightVacant />
    </>
  );
};

export default MyStockSkeleton;
