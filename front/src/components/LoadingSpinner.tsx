import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 스피너 스타일 정의
const Spinner = styled.div`
  border: 1rem solid #192340; /* 외부 색상 */
  border-top: 1rem solid #453de0; /* 상단 색상 */
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  animation: ${spin} 1s linear infinite;
  /* margin: 5rem auto; */
`;

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
