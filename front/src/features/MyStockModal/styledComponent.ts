import styled from 'styled-components';

export const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  right: ${({ $isOpen }) =>
    $isOpen ? '0' : '-400px'}; /* 모달이 열리면 0, 닫히면 -360px */
  display: flex;
  flex-direction: row;
  width: 400px; /* 고정된 너비 */
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: -3px 0px 10px rgba(0, 0, 0, 0.1);
  transition: right 0.5s ease; /* 슬라이드 애니메이션 */
`;

export const ModalButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  top: 45%;
  right: ${({ $isOpen }) =>
    $isOpen ? '400px' : '0'}; /* 모달이 열리면 360px 왼쪽으로 이동 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.switchBackgroundColor};
  color: ${({ theme }) => theme.switchHandleColor};
  border: none;
  width: 1rem;
  padding: 0.5rem 0.1rem;
  border-radius: 0.625rem 0 0 0.625rem;
  cursor: pointer;
  transition:
    right 0.5s ease,
    background-color 0.5s ease,
    height 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverColor};
  }
`;

export const ModalLeft = styled.div`
  width: 83%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  color: ${({ theme }) => theme.textColor};
`;

export const ModalLeftTop = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #b3b3b3;
`;

export const ModalRight = styled.div`
  width: 17%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  border-left: 2px solid #b3b3b3;
  padding: 0.5rem;
`;

export const TextP_24 = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.5s ease;
`;

export const TextP_12 = styled.p`
  font-size: 0.72rem;
  /* font-weight: bold; */
`;

export const TextP_14_NOTGRAY = styled.p`
  font-size: 0.875rem;
  margin-top: auto;
  margin-bottom: auto;
`;

export const RightContentDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0rem 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const CenteredMessage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 20rem;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.textColor};
`;

export const StockImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

export const CardDiv = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  width: calc(100% - 1rem);
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin: 0rem 0.5rem;
  box-sizing: border-box;
`;

export const CardRightDiv = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const CardLeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const CardLeftRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
`;

export const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
