import styled, { keyframes } from 'styled-components';
import BlueLogo from '@assets/Stock/blueLogo.png';

const waveAnimation = keyframes`
  0% {
    mask-position: 0%;
  }
  100% {
    mask-position: 200%;
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnimatedLogo = styled.img`
  width: 120%; /* 로고 크기 */
  height: 120%;
  animation: ${waveAnimation} 2s linear infinite;
  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-size: 200%;
  mask-position: 0%;
`;

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <AnimatedLogo src={BlueLogo} alt="Loading" />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
