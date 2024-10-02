import { FlexGap } from '@components/styledComponent';
import { Link } from 'react-router-dom';
import { DetailPageButton } from '@features/Stock/styledComponent';
import { ChartLinkProps } from '@features/Stock/types';

const ChartLink = ({ stock }: ChartLinkProps) => {
  return (
    <FlexGap $gap="1rem">
      <Link to={`/stock-detail/${stock.stockCode}/day-chart`} state={{ stock }}>
        <DetailPageButton>1일</DetailPageButton>
      </Link>

      <Link
        to={`/stock-detail/${stock.stockCode}/week-chart`}
        state={{ stock }}
      >
        <DetailPageButton>1주</DetailPageButton>
      </Link>

      <Link
        to={`/stock-detail/${stock.stockCode}/month-chart`}
        state={{ stock }}
      >
        <DetailPageButton>1개월</DetailPageButton>
      </Link>

      <Link
        to={`/stock-detail/${stock.stockCode}/three-month-chart`}
        state={{ stock }}
      >
        <DetailPageButton>3개월</DetailPageButton>
      </Link>

      <Link
        to={`/stock-detail/${stock.stockCode}/year-chart`}
        state={{ stock }}
      >
        <DetailPageButton>1년</DetailPageButton>
      </Link>

      <Link
        to={`/stock-detail/${stock.stockCode}/three-year-chart`}
        state={{ stock }}
      >
        <DetailPageButton>3년</DetailPageButton>
      </Link>

      <Link
        to={`/stock-detail/${stock.stockCode}/five-year-chart`}
        state={{ stock }}
      >
        <DetailPageButton>5년</DetailPageButton>
      </Link>
    </FlexGap>
  );
};

export default ChartLink;
