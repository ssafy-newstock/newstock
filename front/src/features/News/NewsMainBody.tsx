import styled from 'styled-components';
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
  box-shadow: 0px 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
`;

const NewsBody = styled.div`
  display: flex;
  /* padding: 1px 0px; */
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  align-self: stretch;
`;

interface NewsMainBodyProps {
  title: string;
  description: string;
  media: string;
  date: string;
  header: string;
  newsType: string;
}

const NewsMainBody: React.FC<NewsMainBodyProps> = ({
  title,
  description,
  media,
  date,
  header,
  newsType,
}) => {
  const isEconomicNews = newsType === '시황';
  return (
    <NewsBodyInnerWrapper>
      <NewsBody>
        {isEconomicNews ? (
          <EconNewsMainBodyHeader header={header} />
        ) : (
          <StockNewsMainBodyHeader header={header} />
        )}
        <NewsBodyTitle title={title} />
        <NewsBodyContent content={description} />
        <NewsBodyFooter media={media} date={date} />
      </NewsBody>
    </NewsBodyInnerWrapper>
  );
};

export default NewsMainBody;
