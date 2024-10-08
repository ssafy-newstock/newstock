// ModalComponents.ts
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: black;
  opacity: 0.5;
`;

export const Modal = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 24px;
  z-index: 50;
  width: 300px;
`;

export const BigModal = styled(Modal)`
  width: 1024px;
`;