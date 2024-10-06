import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일드 컴포넌트 정의
const HeaderWrapper = styled.div`
  display: flex;
  padding: 1.5rem 0;
  /* justify-content: space-between; */
  justify-content: flex-start; /* 왼쪽 정렬로 설정 */
  align-self: stretch;
  align-items: baseline;
  min-width: 50rem;
`;

const NewsHeaderText = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-size: 2rem;
`;

const MoreInfoTextWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0;
  align-items: center;
  gap: 0.3rem;
  margin-left: auto; /* 오른쪽 끝으로 밀림 */
`;

const MoreInfoText = styled.div`
  color: #828282;
  font-size: 1.25rem;
  line-height: 1.9rem;
`;

const MoreInfoSVG = styled.div`
  width: 0.5rem;
  height: 1rem;

  svg {
    fill: ${({ theme }) => theme.textColor}; /* 여기서 theme.textColor로 설정 */
  }
`;

interface NewsMainHeaderProps {
  newsType: string;
}

const NewsMainHeader: React.FC<NewsMainHeaderProps> = ({ newsType }) => {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    const newsTxt = newsType === '시황' ? 'economic-news' : 'stock-news';
    navigate(`/subnews-main/${newsTxt}`);
  };

  return (
    <HeaderWrapper>
      <NewsHeaderText>{newsType} 뉴스</NewsHeaderText>
      <MoreInfoTextWrapper
        onClick={handleMoreInfoClick}
        style={{ cursor: 'pointer' }}
      >
        <MoreInfoText>더보기</MoreInfoText>
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
      </MoreInfoTextWrapper>
    </HeaderWrapper>
  );
};

export default NewsMainHeader;
