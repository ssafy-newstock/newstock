import styled from 'styled-components';
import newstockIcon from '@assets/Stock/blueLogo.png';

const EconomicSubNewsWrapper = styled.div`
  width: 25%;
  height: 100%;
  /* padding: 0.6rem; */
`;

const EconomicSubNewsBody = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  height: 100%;
`;

const EconomicSubNewsThumbnail = styled.div`
  width: 100%;
  height: 12.5rem;
  /* padding: 1rem 1rem; */
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
      <EconomicSubNewsBody>
        <EconomicSubNewsThumbnail>
          <img src={thumbnail || newstockIcon} alt="thumbnail" />
        </EconomicSubNewsThumbnail>
      </EconomicSubNewsBody>
    </EconomicSubNewsWrapper>
  );
};

export default EconSubNewsBody;
