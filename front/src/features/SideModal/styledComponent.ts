import styled from 'styled-components';

export const ModalContainer = styled.div<{
  $isOpen: boolean;
  $isFullyClosed: boolean;
}>`
  position: fixed;
  right: ${({ $isOpen }) => ($isOpen ? '66px' : '-332px')};
  display: flex;
  flex-direction: column;
  width: 332px;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: -0.2rem 0rem 0.5rem rgba(0, 0, 0, 0.1);
  transition:
    right 0.5s ease,
    opacity 0.5s ease; /* right는 바로, opacity는 지연 */
  overflow: auto;
  opacity: ${({ $isOpen, $isFullyClosed }) =>
    $isOpen || !$isFullyClosed ? '1' : '0'};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  z-index: 0;
`;

export const ModalLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ModalLeftTop = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  min-height: 4rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-bottom: 0.125rem solid #b3b3b3;
  opacity: ${({ $isOpen }) =>
    $isOpen ? '1' : '0'}; /* 모달 열릴 때만 보이도록 */
  gap: 1rem;
`;

export const TextP_24 = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const TextP_20 = styled.p`
  font-size: 1.25rem;
`;

export const TextP_18 = styled.p`
  font-size: 1.125rem;
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

export const TextP_14 = styled.p`
  color: #828282;
  font-size: 0.875rem;
  margin-top: auto;
  margin-bottom: auto;
`;

export const ContentDiv = styled.div`
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
  gap: 0.8rem;
`;

export const CardLeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

export const CardLeftRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
`;

export const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
