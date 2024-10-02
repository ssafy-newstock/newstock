import styled from 'styled-components';

export const ModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: ${({ isOpen }) =>
    isOpen ? '0' : '-400px'}; /* 모달이 열리면 0, 닫히면 -360px */
  display: flex;
  flex-direction: row;
  width: 400px; /* 고정된 너비 */
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: -3px 0px 10px rgba(0, 0, 0, 0.1);
  transition: right 0.5s ease; /* 슬라이드 애니메이션 */
`;

export const ModalButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  top: 45%;
  right: ${({ isOpen }) =>
    isOpen ? '400px' : '0'}; /* 모달이 열리면 360px 왼쪽으로 이동 */
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
  width: 85%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textColor};
`;

export const ModalLeftTop = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #828282;
`;

export const ModalRight = styled.div`
  width: 17%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  border-left: 1px solid #828282;
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
`;

export const TextP_12 = styled.p`
  font-size: 0.72rem;
  /* font-weight: bold; */
`;
