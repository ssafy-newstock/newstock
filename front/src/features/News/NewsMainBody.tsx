import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NewsBodyFooter from './NewsBodyFooter';
import NewsBodyContent from './NewsBodyContent';
import NewsBodyTitle from './NewsBodyTitle';
import EconNewsMainBodyHeader from './EconNewsMain/EconNewsMainBodyHeader';
import StockNewsMainBodyHeader from './StockNewsMain/StockNewsMainBodyHeader';

const NewsBodyInnerWrapper = styled.div`
  display: flex;
  width: 21rem;
  padding: 0.8rem 0.9rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
  cursor: pointer;

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NewsBody = styled.div`
  display: flex;
  /* padding: 1px 0px; */
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  align-self: stretch;
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


interface NewsMainBodyProps {
  title: string;
  description: string;
  media: string;
  date: string;
  stockDetail?: IStockDetail;
  header: string;
  newsType: string;
  id: number;
  sentiment: string;
}

const NewsMainBody: React.FC<NewsMainBodyProps> = ({
  title,
  description,
  media,
  date,
  stockDetail,
  header,
  newsType,
  id,
  sentiment,
}) => {
  const isEconomicNews = newsType === '시황';
  const navigate = useNavigate();

  const handleNewsClick = (id: number, newsType: string) => {
    if (newsType.trim() === '시황') {
      navigate(`/subnews-main/economic-news/${id}`);
    } else {
      navigate(`/subnews-main/stock-news/${id}`);
    }
  };

  return (
    <NewsBodyInnerWrapper onClick={() => handleNewsClick(id, newsType)}>
      <NewsBody>
        {isEconomicNews ? (
          <EconNewsMainBodyHeader header={header} />
        ) : (
          <StockNewsMainBodyHeader header={header} stockDetail={stockDetail!} />
        )}
        <NewsBodyTitle title={title} sentiment={sentiment} />
        <NewsBodyContent content={description} />
        <NewsBodyFooter media={media} date={date} />
      </NewsBody>
    </NewsBodyInnerWrapper>
  );
};

export default NewsMainBody;
