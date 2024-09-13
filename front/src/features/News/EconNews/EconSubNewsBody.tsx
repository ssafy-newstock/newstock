import styled from 'styled-components';
import summaryIcon from '@features/summaryIcon.png';

const EconomicSubNewsWrapper = styled.div`
  width: 28%;
  background-color: #f0f0f0; /* 배경색 설정 */
  padding: 10px;
`;

const EconomicSubNewsBody = styled.div`
  display: flex;
  /* width: 135px; */
  max-width: 20%;
  padding-right: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;
  /* height: 100%; */
  /* background-color: black; */
`;

const EconomicSubNewsHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 10px 10px 10px;
  justify-content: space-between;
  align-items: center;
`;

const EconomicSubNewsPNG = styled.img`
  height: 30px;
  width: auto;
  border-radius: 5px;
  color: #828282;
`;

const EconomicSubNewsThumbnail = styled.div`
  width: 150px;
  aspect-ratio: 16/12;
  flex-shrink: 0;
  align-self: stretch;

  img {
    width: 100%;
    max-height: 100px;
    object-fit: cover; /* 이미지가 부모 요소를 덮도록 설정 */
    border-radius: 5px; /* 둥근 모서리 추가 */
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
