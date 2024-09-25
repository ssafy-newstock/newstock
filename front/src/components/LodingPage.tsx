import React from 'react';
import styled, { keyframes } from 'styled-components';

// 스타일 컴포넌트 정의
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const LoadingAnimation = styled.div`
  text-align: center;
`;

const StockChart = styled.div`
  width: 200px;
  height: 100px;
  background: linear-gradient(to right, #453DE0, #192340);
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

// 라인 움직임 애니메이션 정의
const moveLine = keyframes`
  from {
    left: -150px;
  }
  to {
    left: 200px;
  }
`;

const ChartLine = styled.div`
  width: 300px;
  height: 5px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: -150px;
  animation: ${moveLine} 2s infinite linear;
`;

const NewsTicker = styled.div`
  font-size: 18px;
  color: #333;

  p {
    animation: ${keyframes`
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-100%);
      }
    `} 5s linear infinite;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    width: 100%;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
`;


const LoadingPage: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingAnimation>
        {/* 주식 차트 애니메이션 */}
        <StockChart>
          <ChartLine />
        </StockChart>
        {/* 뉴스 헤드라인 애니메이션 */}
        <NewsTicker>
          <Text>Loading latest news and stock data...</Text>
        </NewsTicker>
      </LoadingAnimation>
    </LoadingContainer>
  );
};

export default LoadingPage;