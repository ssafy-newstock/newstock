import styled from 'styled-components';
import { StockPrev, StockImage } from '@features/Stock/styledComponent';
import summaryIcon from '@assets/Chat/summaryIcon.png';
import { bookmarkedIcon, unbookmarkedIcon } from '@features/News/NewsIconTag';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';
import { useFindStockByCode } from '@utils/uesFindStockByCode';
import { Fragment, useState } from 'react';
import { FlexGap, FlexGapCenter } from '@components/styledComponent';
import { useNavigate } from 'react-router-dom';

const StockNewsOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  align-self: stretch;
`;

const StockNewsCorpText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.875rem;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
`;

const StockNewsText = styled.p<{ selected: boolean }>`
color: ${({ theme, selected }) => (selected ? theme.textColor : 'gray')};
font-size: 1.5rem;
font-weight: 600;
line-height: 1.875rem;
white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
cursor: pointer;
`;

const CustomStockImage = styled(StockImage)`
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
`;

const StockNewsPrice = styled.div`
  display: flex;
  gap: 0.3rem;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
`;

const CustomStockPrev = styled(StockPrev)`
  font-size: 1.5rem;
`;

const EconomicSubNewsPNG = styled.img`
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 0.3rem;
  color: #828282;
  margin-bottom: 0.2rem;
  cursor: pointer; /* 클릭 가능한 커서 설정 */

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

interface StockNewsHeaderProps {
  isBookmarked: boolean;
  onBookmarkIconClick: (event: React.MouseEvent) => void;
  onSummaryClick: (event: React.MouseEvent) => void;
  stockNewsStockCodes: string[];
}

const StockNewsHeader: React.FC<StockNewsHeaderProps> = ({
  isBookmarked,
  onBookmarkIconClick,
  onSummaryClick,
  stockNewsStockCodes,
}) => {
  const [selectedStockCode, setSelectedStockCode] = useState(
    stockNewsStockCodes[0]
  );
  const navigate = useNavigate();

  const stock = useFindStockByCode(selectedStockCode);

  if (!stock) {
    return <div>Loading...</div>; // Handle loading or empty state
  }

  const handleStockClick = (stockCode: string) => {
    setSelectedStockCode(stockCode);
  };

  // 주식 상세 페이지 + 월봉 차트 조회
  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}/day-chart`, { state: { stock } });
  };

  return (
    <StockNewsOuter>
      <FlexGap $gap="0.5rem">
        <CustomStockImage
          src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
          alt="stock image"
          onError={(e) => {
            e.currentTarget.src = blueLogo;
          }}
          onClick={handleNavigate} // Add onClick event handler
        />
        <FlexGapCenter $gap="0.5rem">
          {stockNewsStockCodes.slice(0, 3).map((code, index) => (
            <Fragment key={code}>
              <StockNewsText
                selected={code === selectedStockCode}
                onClick={() => handleStockClick(code)}
              >
                {useFindStockByCode(code)?.stockName}
              </StockNewsText>
              {index !== stockNewsStockCodes.slice(0, 3).length - 1 && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  ·
                </span>
              )}
            </Fragment>
          ))}
          <FlexGapCenter $gap="1rem">
            <EconomicSubNewsPNG
              src={summaryIcon}
              alt="summaryIcon"
              onClick={onSummaryClick}
            />
            <div onClick={onBookmarkIconClick}>
              {isBookmarked ? bookmarkedIcon : unbookmarkedIcon}
            </div>
          </FlexGapCenter>
        </FlexGapCenter>
      </FlexGap>

      <StockNewsPrice>
        <StockNewsCorpText>
          {formatNumber(stock.stckPrpr)}원
        </StockNewsCorpText>
        <CustomStockPrev
          $isPositive={stock.prdyVrss.toString().startsWith('-')}
        >
          {formatChange(formatNumber(stock.prdyVrss))} (
          {stock.prdyCtrt}%)
        </CustomStockPrev>
      </StockNewsPrice>
    </StockNewsOuter>
  );
};

export default StockNewsHeader;
