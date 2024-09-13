import styled from 'styled-components';
import NewsBodyFooter from './StockNewsBodyFooter';
import NewsBodyContent from './StockNewsBodyContent';
import NewsBodyTitle from './StockNewsBodyTitle';
import NewsBodyHeader from './StockNewsBodyHeader';

const NewsBodyInnerWrapper = styled.div`
  display: flex;
  width: 334px;
  padding: 13px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const NewsBody = styled.div`
  display: flex;
  padding: 1px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

interface NewsMainBodyProps {
  title: string;
  description: string;
  media: string;
  date: string;
  header: string;
}

const NewsMainBody: React.FC<NewsMainBodyProps> = ({
  title,
  description,
  media,
  date,
  header,
}) => {
  return (
    <NewsBodyInnerWrapper>
      <NewsBody>
        <NewsBodyHeader header={header} />
        <NewsBodyTitle title={title} />
        <NewsBodyContent content={description} />
        <NewsBodyFooter media={media} date={date} />
      </NewsBody>
    </NewsBodyInnerWrapper>
  );
};

export default NewsMainBody;
