// import { Background, Modal, Overlay } from '@components/ModalComponents';
import { Text, TextLarge } from '@features/Stock/styledComponent';
import StockIcon from '@features/Stock/StockDetail/StockIcon';
import styled from 'styled-components';
import {formatNumber} from '@utils/formatNumber';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buySuccess?: boolean;
  sellSuccess?: boolean;
  price?: number;
  amount?: number;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  /* width: 300px; */
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

const TradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  message,
  buySuccess,
  sellSuccess,
  price,
  amount,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        {/* 매수 결과가 있을 경우 */}
        {buySuccess !== undefined && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StockIcon buySuccess={buySuccess} />
              <TextLarge
                style={{
                  color: buySuccess ? 'green' : 'gray',
                  marginLeft: '0.5rem',
                }}
              >
                {buySuccess ? '매수 성공' : '매수 실패'}
              </TextLarge>
            </div>
            {buySuccess ? (
              <>
                <Text>체결가 : {formatNumber(price ?? 0)}원</Text>
                <Text>주문 수량 : {amount}주</Text>
                <Text>주문 금액 : {formatNumber((price ?? 0) * (amount ?? 0))}원</Text>
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {/* 매도 결과가 있고 매수 결과가 없는 경우 */}
        {buySuccess === undefined && sellSuccess !== undefined && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StockIcon sellSuccess={sellSuccess} />
              <TextLarge
                style={{
                  color: sellSuccess ? 'red' : 'gray',
                  marginLeft: '0.5rem',
                }}
              >
                {sellSuccess ? '매도 성공' : '매도 실패'}
              </TextLarge>
            </div>
            {sellSuccess ? (
              <>
                <Text>체결가 : {formatNumber(price ?? 0)}원</Text>
                <Text>판매 수량 : {amount}주</Text>
                <Text>판매 금액 : {formatNumber((price ?? 0) * (amount ?? 0))}원</Text>
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {/* 메시지 */}
        <p>{message}</p>

        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TradeModal;
