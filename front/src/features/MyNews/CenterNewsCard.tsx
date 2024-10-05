import AshbhIcon from '@features/MyNews/AshbhIcon';
import {
  CardBottomContainer,
  CardContainer,
  CardContextDiv,
  CardTitleFontStyle,
  FontStyle,
  IconWrapper,
} from './styledComponent';
import { translateIndustry } from '@api/dummyData/DummyData';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { NewsTag } from '@features/News/NewsIconTag';
import styled from 'styled-components';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';

const CustomFontStyle = styled(FontStyle)`
  color: ${({ theme }) => theme.grayTextColor};
  font-size: 0.8rem;
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.25rem;
  background: #e0e0e0;
`;

interface NewsData {
  id: number;
  title: string;
  subtitle: string | null;
  media: string;
  description: string;
  thumbnail: string;
  uploadDatetime: string;
  article: string;
  sentiment: string;
  industry?: string;
  stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
}

interface CenterCardProps {
  title: string;
  data: NewsData;
  onDelete: (id: number) => void;
}

const CenterNewsCard: React.FC<CenterCardProps> = ({
  data,
  title,
  onDelete,
}) => {
  const navigate = useNavigate();
  //"YYYY-MM-DD HH:MM" => "YYYY.MM.DD"
  const formatTransactionDate = (isoDate: string): string => {
    return format(new Date(isoDate), 'yyyy.MM.dd'); // date-fns의 올바른 포맷 형식 사용
  };

  const handleDetail = () => {
    if (title === '시황 뉴스') {
      navigate(`/subnews-main/economic-news/${data.id}`);
    } else {
      navigate(`/subnews-main/stock-news/${data.id}`);
    }
  };

  // handleDelete 정의
  const handleDelete = () => {
    onDelete(data.id); // 삭제 작업 처리
  };

  const formattedDate = formatTransactionDate(data.uploadDatetime);

  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const stockCode = data.stockNewsStockCodes?.[0];
  const stockDetail =
    allStock?.find((s) => s.stockCode === stockCode) ||
    top10Stock?.find((s) => s.stockCode === stockCode);
  const stockName = stockDetail?.stockName || 'Unknown Stock';

  return (
    <CardContainer style={{ cursor: 'pointer' }} onClick={handleDetail}>
      <CardTitleFontStyle>{data.title}</CardTitleFontStyle>
      <CardContextDiv>
        <CustomFontStyle>{data.media}</CustomFontStyle>
        <BookmarkedNewsMiddleLine />
        <CustomFontStyle>{formattedDate}</CustomFontStyle>
      </CardContextDiv>
      <CardBottomContainer>
        {stockCode && <NewsTag $tagName={stockName}># {stockName}</NewsTag>}
        {data.industry && (
          <NewsTag $tagName={translateIndustry(data.industry)}>
            #{translateIndustry(data.industry)}
          </NewsTag>
        )}
        <IconWrapper>
          <AshbhIcon id={data.id} title={title} onDelete={handleDelete} />
        </IconWrapper>
      </CardBottomContainer>
    </CardContainer>
  );
};

export default CenterNewsCard;
