import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일드 컴포넌트 정의
const HeaderWrapper = styled.div`
  display: flex;
  padding: 25px 0px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  max-width: 1400px;
  overflow: hidden;
`;
const NewsHeaderTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NewsHeaderText = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  /* font-weight: 400; */
  /* line-height: 30px; */
`;

const MoreInfoTextWrapper1 = styled.div`
  display: flex;
  padding: 9px 0px;
  align-items: center;
`;

const MoreInfoTextWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MoreInfoText = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  /* font-weight: 400;
  line-height: 30px; */
`;

const MoreInfoSVGWrapper = styled.div`
  display: flex;
  padding: 2px 5px;
  align-items: center;
  gap: 10px;
`;

const MoreInfoSVG = styled.div`
  width: 9px;
  height: 16px;
  fill: #828282;
`;

const NewsMainHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    navigate('/subNewsMain/economicNews');
  };

  return (
    <HeaderWrapper>
      <NewsHeaderTextWrapper>
        <NewsHeaderText>시황 뉴스</NewsHeaderText>
      </NewsHeaderTextWrapper>
      <MoreInfoTextWrapper1
        onClick={handleMoreInfoClick}
        style={{ cursor: 'pointer' }}
      >
        <MoreInfoTextWrapper2>
          <MoreInfoText>더보기</MoreInfoText>
        </MoreInfoTextWrapper2>
        <MoreInfoSVGWrapper>
          <MoreInfoSVG>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="18"
              viewBox="0 0 9 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.55305 1.1713L8.79605 8.4273C8.86125 8.4896 8.91298 8.56461 8.94807 8.64768C8.98316 8.73075 9.00085 8.82013 9.00005 8.9103C9.00045 9.0025 8.98264 9.09386 8.94763 9.17915C8.91262 9.26444 8.86111 9.34198 8.79605 9.4073C6.17605 11.9633 3.65105 14.4303 1.22105 16.8083C1.09605 16.9253 0.596052 17.2163 0.210052 16.7843C-0.175948 16.3513 0.0580517 15.9743 0.210052 15.8183L7.27805 8.9103L0.531052 2.1513C0.285052 1.81197 0.305052 1.49897 0.591052 1.2123C0.877718 0.925638 1.19838 0.911304 1.55305 1.1713Z"
                fill="#828282"
              />
            </svg>
          </MoreInfoSVG>
        </MoreInfoSVGWrapper>
      </MoreInfoTextWrapper1>
    </HeaderWrapper>
  );
};

export default NewsMainHeader;
