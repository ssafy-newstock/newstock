import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LeftDiv = styled.div`
  display: flex;
  width: 220px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const SubNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TextTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
`;

const TextP = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`;

const Lefthr = styled.hr`
  background: #e0e0e0;
  width: 180px;
  height: 2px;
`;

const LeftStock: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LeftDiv>
      <SubNav>
        <TextDiv>
          <TextTitle>주식</TextTitle>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/allStock')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 2C8.24493 2.00003 8.48134 2.08996 8.66437 2.25272C8.84741 2.41547 8.96434 2.63975 8.993 2.883L9 3V5C9.76521 4.99996 10.5015 5.29233 11.0583 5.81728C11.615 6.34224 11.9501 7.06011 11.995 7.824L12 8V14C12 14.7652 11.7077 15.5015 11.1827 16.0583C10.6578 16.615 9.93989 16.9501 9.176 16.995L9 17V21C8.99972 21.2549 8.90212 21.5 8.72715 21.6854C8.55218 21.8707 8.31305 21.9822 8.05861 21.9972C7.80416 22.0121 7.55362 21.9293 7.35817 21.7657C7.16271 21.6021 7.0371 21.3701 7.007 21.117L7 21V17C6.23479 17 5.49849 16.7077 4.94174 16.1827C4.38499 15.6578 4.04989 14.9399 4.005 14.176L4 14V8C3.99996 7.23479 4.29233 6.49849 4.81728 5.94174C5.34224 5.38499 6.06011 5.04989 6.824 5.005L7 5V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2ZM17 2C17.2449 2.00003 17.4813 2.08996 17.6644 2.25272C17.8474 2.41547 17.9643 2.63975 17.993 2.883L18 3V7C18.7652 6.99996 19.5015 7.29233 20.0583 7.81728C20.615 8.34224 20.9501 9.06011 20.995 9.824L21 10V16C21 16.7652 20.7077 17.5015 20.1827 18.0583C19.6578 18.615 18.9399 18.9501 18.176 18.995L18 19V21C17.9997 21.2549 17.9021 21.5 17.7272 21.6854C17.5522 21.8707 17.313 21.9822 17.0586 21.9972C16.8042 22.0121 16.5536 21.9293 16.3582 21.7657C16.1627 21.6021 16.0371 21.3701 16.007 21.117L16 21V19C15.2348 19 14.4985 18.7077 13.9417 18.1827C13.385 17.6578 13.0499 16.9399 13.005 16.176L13 16V10C13 9.23479 13.2923 8.49849 13.8173 7.94174C14.3422 7.38499 15.0601 7.04989 15.824 7.005L16 7V3C16 2.73478 16.1054 2.48043 16.2929 2.29289C16.4804 2.10536 16.7348 2 17 2ZM18 9H16C15.7551 9.00003 15.5187 9.08996 15.3356 9.25272C15.1526 9.41547 15.0357 9.63975 15.007 9.883L15 10V16C15 16.2449 15.09 16.4813 15.2527 16.6644C15.4155 16.8474 15.6397 16.9643 15.883 16.993L16 17H18C18.2449 17 18.4813 16.91 18.6644 16.7473C18.8474 16.5845 18.9643 16.3603 18.993 16.117L19 16V10C19 9.75507 18.91 9.51866 18.7473 9.33563C18.5845 9.15259 18.3603 9.03566 18.117 9.007L18 9ZM9 7H7C6.75507 7.00003 6.51866 7.08996 6.33563 7.25272C6.15259 7.41547 6.03566 7.63975 6.007 7.883L6 8V14C6.00003 14.2449 6.08996 14.4813 6.25272 14.6644C6.41547 14.8474 6.63975 14.9643 6.883 14.993L7 15H9C9.24493 15 9.48134 14.91 9.66437 14.7473C9.84741 14.5845 9.96434 14.3603 9.993 14.117L10 14V8C9.99997 7.75507 9.91004 7.51866 9.74728 7.33563C9.58453 7.15259 9.36025 7.03566 9.117 7.007L9 7Z"
              fill="#828282"
            />
          </svg>
          <TextP>전체 종목 조회</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/favoriteStock')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 15.39L8.24 17.66L9.23 13.38L5.91 10.5L10.29 10.13L12 6.09L13.71 10.13L18.09 10.5L14.77 13.38L15.76 17.66M22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24Z"
              fill="#828282"
            />
          </svg>
          <TextP>관심 종목 조회</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/sectionStock')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM8 20H4V10H8V20ZM14 20H10V10H14V20ZM20 20H16V10H20V20ZM20 8H4V4H20V8Z"
              fill="#828282"
            />
          </svg>
          <TextP>분야별 주식 조회</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/myStock')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4.58 8.60696L2 8.45396C3.849 3.70396 9.158 0.999958 14.333 2.34396C19.846 3.77696 23.121 9.26196 21.647 14.594C20.428 19.005 16.343 21.931 11.847 22"
              stroke="#828282"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 22C6.5 22 2 17 2 11M13.604 9.72202C13.252 9.35202 12.391 8.48502 11.029 9.10202C9.668 9.71702 9.452 11.698 11.511 11.909C12.441 12.004 13.048 11.799 13.604 12.379C14.16 12.961 14.263 14.577 12.843 15.013C11.423 15.449 10.502 14.729 10.255 14.504M11.908 8.02002V8.81002M11.908 15.147V16.02"
              stroke="#828282"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <TextP>내 주식 조회</TextP>
        </TextDiv>
      </SubNav>
      <Lefthr />
    </LeftDiv>
  );
};

export default LeftStock;