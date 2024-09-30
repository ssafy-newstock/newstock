// import { Background, Modal, Overlay } from '@components/ModalComponents';
import {
  ModalContent,
  ModalOverlay,
  Text,
  TextLarge,
  CloseButton,
} from '@features/Stock/styledComponent';
import StockIcon from '@features/Stock/StockDetail/StockIcon';
import { formatNumber } from '@utils/formatNumber';
import { FlexAlignCenter } from '@components/styledComponent';
import { TradeModalProps } from '@features/Stock/types';

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
            <FlexAlignCenter>
              <StockIcon buySuccess={buySuccess} />
              <TextLarge
                style={{
                  color: buySuccess ? 'green' : 'gray',
                  marginLeft: '0.5rem',
                }}
              >
                {buySuccess ? '매수 성공' : '매수 실패'}
              </TextLarge>
            </FlexAlignCenter>
            {buySuccess ? (
              <>
                <Text>체결가 : {formatNumber(price ?? 0)}원</Text>
                <Text>주문 수량 : {amount}주</Text>
                <Text>
                  주문 금액 : {formatNumber((price ?? 0) * (amount ?? 0))}원
                </Text>
              </>
            ) : (
              <>{message}</>
            )}
          </>
        )}

        {/* 매도 결과가 있고 매수 결과가 없는 경우 */}
        {buySuccess === undefined && sellSuccess !== undefined && (
          <>
            <FlexAlignCenter>
              <StockIcon sellSuccess={sellSuccess} />
              <TextLarge
                style={{
                  color: sellSuccess ? 'red' : 'gray',
                  marginLeft: '0.5rem',
                }}
              >
                {sellSuccess ? '매도 성공' : '매도 실패'}
              </TextLarge>
            </FlexAlignCenter>
            {sellSuccess ? (
              <>
                <Text>체결가 : {formatNumber(price ?? 0)}원</Text>
                <Text>판매 수량 : {amount}주</Text>
                <Text>
                  판매 금액 : {formatNumber((price ?? 0) * (amount ?? 0))}원
                </Text>
              </>
            ) : (
              <>{message}</>
            )}
          </>
        )}
        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TradeModal;
