import styled from 'styled-components';
import { StockPrev, StockImage } from '@features/Stock/styledComponent';
import summaryIcon from '@assets/Chat/summaryIcon.png';
import { bookmarkedIcon, unbookmarkedIcon } from '@features/News/NewsIconTag';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';

const StockNewsOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const CustomStockImage = styled(StockImage)`
  width: 2.25rem;
  height: 2.25rem;
  margin-right: 0.7rem;
`;

const StockNewsPrice = styled.div`
  display: flex;
  gap: 0.3rem;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
`;

const CustomStockPrev = styled(StockPrev)`
  font-size: 1.5rem;
`;

const EconomicSubNewsHeader = styled.div`
  display: flex;
  width: 100%;
  /* padding: 0 0.625rem 0.625rem 0.625rem; */
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
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

interface IStockDetail {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: number;
  prdyVrss: number;
  prdyCtrt: number;
  acmlVol: number;
  acmlTrPbmn: number;
}

interface StockNewsHeaderProps {
  header: string;
  stockDetail: IStockDetail;
  isBookmarked: boolean;
  onBookmarkIconClick: (event: React.MouseEvent) => void;
  onSummaryClick: (event: React.MouseEvent) => void;
}

const StockNewsHeader: React.FC<StockNewsHeaderProps> = ({
  header,
  stockDetail,
  isBookmarked,
  onBookmarkIconClick,
  onSummaryClick,
}) => {
  if (!stockDetail) {
    console.log('stockDetail이 아직 정의되지 않음.');
    return null; // 또는 로딩 상태 등을 반환할 수 있습니다.
  }

  return (
    <StockNewsOuter>
      <CustomStockImage
        src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stockDetail.stockCode}.png`}
        alt="stock image"
        onError={(e) => {
          e.currentTarget.src = blueLogo;
        }} // 이미지 로드 실패 시 기본 이미지로 대체
      />
      <StockNewsCorpText>{header}</StockNewsCorpText>
      <EconomicSubNewsHeader>
        <EconomicSubNewsPNG
          src={summaryIcon}
          alt="summaryIcon"
          onClick={onSummaryClick}
        />
        <div onClick={onBookmarkIconClick}>
          {isBookmarked ? bookmarkedIcon : unbookmarkedIcon}
        </div>
      </EconomicSubNewsHeader>
      <StockNewsPrice>
        <StockNewsCorpText>
          {formatNumber(stockDetail.stckPrpr)}원
        </StockNewsCorpText>
        {/* <StockNewsPriceText>-300 (-0.3%)</StockNewsPriceText> */}
        <CustomStockPrev
          $isPositive={stockDetail.prdyVrss.toString().startsWith('-')}
        >
          {formatChange(formatNumber(stockDetail.prdyVrss))} (
          {stockDetail.prdyCtrt}
          %)
        </CustomStockPrev>
      </StockNewsPrice>
    </StockNewsOuter>
  );
};

export default StockNewsHeader;
