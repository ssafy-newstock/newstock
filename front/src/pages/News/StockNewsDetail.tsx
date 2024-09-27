// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StockNewsDetailHeader from '@features/News/StockNewsDetail/StockNewsDetailHeader';
import StockNewsDetailBody from '@features/News/StockNewsDetail/StockNewsDetailBody';

const SubCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-width: 106rem;
  width: 100%;
`;

const NewsWrapper = styled.div`
  display: flex;
  padding: 1.6rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
`;

const StockNewsDetailPage: React.FC = () => {
  // const { newsId } = useParams();

  return (
    <div>
      <SubCenter>
        <NewsWrapper>
          <StockNewsDetailHeader />
          <StockNewsDetailBody />
        </NewsWrapper>
      </SubCenter>
    </div>
  );
};

export default StockNewsDetailPage;
