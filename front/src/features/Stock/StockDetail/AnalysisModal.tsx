import styled from 'styled-components';

interface INews {
  title: string;
  upload_datetime: string;
  media: string;
  thumbnail?: string;
}

interface AnalysisModalProps {
  onClose?: () => void;
  message?: string;
  newsList?: INews[]
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  padding: 1rem;
  border-radius: 1rem;
  min-width: 15rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;
const AnalysisModal: React.FC<AnalysisModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AnalysisModal;
