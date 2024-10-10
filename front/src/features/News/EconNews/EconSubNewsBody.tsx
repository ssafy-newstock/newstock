import styled from 'styled-components';
import newstockIcon from '@assets/Stock/Logo.png';

const EconomicSubNewsWrapper = styled.div`
  display: flex;
  width: 24.5%;
  height: auto;
  /* padding: 0.6rem; */
  max-width: 18rem;
  min-width: 13rem;
`;

const EconomicSubNewsThumbnail = styled.div`
  /* width: 16rem; */
  width: 100%;

  height: 12.5rem;
  flex-shrink: 0;
  align-self: stretch;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem; /* 둥근 모서리 추가 */
  }
`;

interface EconSubNewsBodyProps {
  thumbnail?: string;
}

const EconSubNewsBody: React.FC<EconSubNewsBodyProps> = ({ thumbnail }) => {
  return (
    <EconomicSubNewsWrapper>
      {/* <EconomicSubNewsBody> */}
      <EconomicSubNewsThumbnail>
        <img src={thumbnail || newstockIcon} alt="thumbnail" />
      </EconomicSubNewsThumbnail>
      {/* </EconomicSubNewsBody> */}
    </EconomicSubNewsWrapper>
  );
};

export default EconSubNewsBody;
