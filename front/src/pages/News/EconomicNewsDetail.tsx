// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EconNewsDetailHeader from '@features/News/EconNewsDetail/EconNewsDetailHeader';
import EconNewsDetailBody from '@features/News/EconNewsDetail/EconNewsDetailBody';

const SubCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-width: 106rem;
  width: 64rem;
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
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

const EconomicNewsDetailPage: React.FC = () => {
  // const { newsId } = useParams();

  return (
    <div>
      <SubCenter>
        <NewsWrapper>
          <EconNewsDetailHeader />
          <EconNewsDetailBody />
        </NewsWrapper>
      </SubCenter>
    </div>
  );
};

export default EconomicNewsDetailPage;
