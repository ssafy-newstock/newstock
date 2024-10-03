import styled, {keyframes} from "styled-components";

const pulseAnimation = keyframes`
  0% {
    background-color: rgba(255, 255, 255, 0.6); // 시작 색상
  }
  50% {
    background-color: rgba(240, 240, 240, 0.8); // 중간 색상
  }
  100% {
    background-color: rgba(255, 255, 255, 0.6); // 종료 색상
  }
`;


export const NewsMainWrapperSkeleton = styled.div`
  display: flex;
  padding: 1.2rem 0.25rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 1.25rem;
`;

export const NewsCardSkeleton = styled.div`
  /* width: 21rem; */
  width: 21rem;
  height: 18rem;
  padding: 1.5rem 1.2rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  animation: ${pulseAnimation} 3s infinite;

`;

export const NewsContainerSkeleton = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-width: 100rem;
  width: 100%;
`;

export const RowNewsCardSkeleton = styled.div`
  margin: 0 0 2.5rem 0;
  /* align-self: stretch; */
  border-radius: 2rem;
  height: 100px;
  width: 85%;
  height: 100%;
  gap: 2rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  animation: ${pulseAnimation} 3s infinite;
`;