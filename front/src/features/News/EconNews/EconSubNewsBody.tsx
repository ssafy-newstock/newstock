import styled from 'styled-components';
import summaryIcon from '@features/summaryIcon.png';

const EconomicSubNewsWrapper = styled.div`
  width: 25%;
  height: 100%;
  /* background-color: #f0f0f0; */
  padding: 0.6rem;
`;

const EconomicSubNewsBody = styled.div`
  display: flex;
  max-width: 100%;
  /* padding-right: 0.625rem; */
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 0.3rem;
  height: 100%;
`;

const EconomicSubNewsHeader = styled.div`
  display: flex;
  width: 80%;
  padding: 0 0.625rem 0.625rem 0.625rem;
  justify-content: space-between;
  align-items: center;
  /* background-color: aqua; */
`;

const EconomicSubNewsPNG = styled.img`
  height: 1.9rem;
  width: 1.9rem;
  border-radius: 0.3rem;
  color: #828282;
`;

const EconomicSubNewsThumbnail = styled.div`
  width: 100%;
  height: 10rem;
  /* aspect-ratio: 16/12; */
  flex-shrink: 0;
  align-self: stretch;
  background-color: white;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3rem; /* 둥근 모서리 추가 */
  }
`;

interface EconSubNewsBodyProps {
  thumbnail: string;
}

const EconSubNewsBody: React.FC<EconSubNewsBodyProps> = ({ thumbnail }) => {
  return (
    <EconomicSubNewsWrapper>
      <EconomicSubNewsBody>
        <EconomicSubNewsHeader>
          <EconomicSubNewsPNG src={summaryIcon} alt="summaryIcon" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M7.5 31.5V7.5C7.5 6.675 7.794 5.969 8.382 5.382C8.97 4.795 9.676 4.501 10.5 4.5H25.5C26.325 4.5 27.0315 4.794 27.6195 5.382C28.2075 5.97 28.501 6.676 28.5 7.5V31.5L18 27L7.5 31.5Z"
              fill="#006DFF"
            />
          </svg>
        </EconomicSubNewsHeader>
        <EconomicSubNewsThumbnail>
          <img src={thumbnail} alt="thumbnail" />
        </EconomicSubNewsThumbnail>
      </EconomicSubNewsBody>
    </EconomicSubNewsWrapper>
  );
};

export default EconSubNewsBody;
