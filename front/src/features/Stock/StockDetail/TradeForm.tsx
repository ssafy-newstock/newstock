import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { axiosInstance } from '@api/axiosInstance';
import TradeModal from '@features/Stock/StockDetail/TradeModal';

interface FormValues {
  price: number;
  amount: number;
}

interface TradeFormProps {
  price: number;
  stockCode: string;
}

const FormWrapper = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 100%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  min-width: 60px;
  font-weight: bold;
`;

const InputTag = styled.input`
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  flex-grow: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button<{ $variant: 'buy' | 'sell' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
  background-color: ${(props) =>
    props.$variant === 'buy' ? '#4caf50' : '#f44336'};
  &:hover {
    opacity: 0.8;
  }
`;

const BuyForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [modalAmount, setModalAmount] = useState(0); // 모달로 보낼 amount 상태 추가
  const [modalPrice, setModalPrice] = useState(0); // 모달로 보낼 price 상태 추가

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      price: price,
      amount: 0,
    },
  });

  useEffect(() => {
    setValue('price', price);
  }, [price, setValue]);

  const onSubmit = async (data: FormValues) => {
    // const accessToken = sessionStorage.getItem('accessToken');
    // console.log('accessToken:', accessToken);
    const buyData = {
      price: data.price,
      amount: Number(data.amount),
    };
    console.log('Buy Data:', buyData);
    // 매수 로직
    try {
      // 매수 API 요청
      const response = await axiosInstance.post('/api/stock/transaction/buy', {
        stockCode: stockCode,
        stockTransactionAmount: buyData.amount,
        stockTransactionType: 'BUY',
      });
      console.log('Buy Response:', response.data);
      setModalMessage('주식을 성공적으로 매수했습니다.');
      setIsSuccess(true);
    } catch (error) {
      console.error('Buy Error:', error);
      setModalMessage('보유 금액이 부족합니다.');
      setIsSuccess(false);
    }
    setModalAmount(buyData.amount); // 입력한 amount 값을 설정
    setModalPrice(buyData.price); // 입력한 price 값을 설정
    setModalOpen(true); // 모달을 띄움
    reset({ price: price, amount: 0 }); // 폼 리셋
  };

  return (
    <ColumnWrapper>
      <InputWrapper>
        <InputRow>
          <InputLabel>Price:</InputLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputTag
                {...field}
                type="number"
                placeholder="Enter buy price"
                disabled
              />
            )}
          />
        </InputRow>
      </InputWrapper>
      <InputWrapper>
        <InputRow>
          <InputLabel>Amount:</InputLabel>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'Buy amount is required',
              min: {
                value: 1,
                message: 'Buy amount must be at least 1',
              },
            }}
            render={({ field }) => (
              <>
                <InputTag
                  {...field}
                  type="number"
                  placeholder="Enter buy amount"
                />
                {errors.amount && (
                  <p style={{ color: 'red' }}>{errors.amount.message}</p>
                )}
              </>
            )}
          />
        </InputRow>
      </InputWrapper>
      <ButtonWrapper>
        <Button type="button" $variant="buy" onClick={handleSubmit(onSubmit)}>
          Buy
        </Button>
      </ButtonWrapper>
      <TradeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        buySuccess={isSuccess}
        price={modalPrice}
        amount={modalAmount}
      />
    </ColumnWrapper>
  );
};

const SellForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [modalAmount, setModalAmount] = useState(0); // 모달로 보낼 amount 상태 추가
  const [modalPrice, setModalPrice] = useState(0); // 모달로 보낼 price 상태 추가

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      price: price,
      amount: 0,
    },
  });

  useEffect(() => {
    setValue('price', price);
  }, [price, setValue]);

  const onSubmit = async (data: FormValues) => {
    // const accessToken = sessionStorage.getItem('accessToken');
    const sellData = {
      price: data.price,
      amount: Number(data.amount),
    };
    console.log('Sell Data:', sellData);
    // 매도 로직
    try {
      // 매도 API 요청
      const response = await axiosInstance.post('/api/stock/transaction/sell', {
        stockCode: stockCode,
        stockTransactionAmount: sellData.amount,
        stockTransactionType: 'SELL',
      });
      console.log('Sell Response:', response.data);
      setModalMessage('주식을 성공적으로 매도했습니다.');
      setIsSuccess(true);
    } catch (error) {
      console.error('Sell Error:', error);
      setModalMessage('보유 주식이 부족합니다.');
      setIsSuccess(false);
    }
    setModalAmount(sellData.amount); // 입력한 amount 값을 설정
    setModalPrice(sellData.price); // 입력한 price 값을 설정
    setModalOpen(true);
    reset({ price: price, amount: 0 }); // 폼 리셋
  };

  return (
    <ColumnWrapper>
      <InputWrapper>
        <InputRow>
          <InputLabel>Price:</InputLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputTag
                {...field}
                type="number"
                placeholder="Enter sell price"
                disabled
              />
            )}
          />
        </InputRow>
      </InputWrapper>
      <InputWrapper>
        <InputRow>
          <InputLabel>Amount:</InputLabel>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'Sell amount is required',
              min: {
                value: 1,
                message: 'Sell amount must be at least 1',
              },
            }}
            render={({ field }) => (
              <>
                <InputTag
                  {...field}
                  type="number"
                  placeholder="Enter sell amount"
                />
                {errors.amount && (
                  <p style={{ color: 'red' }}>{errors.amount.message}</p>
                )}
              </>
            )}
          />
        </InputRow>
      </InputWrapper>
      <ButtonWrapper>
        <Button type="button" $variant="sell" onClick={handleSubmit(onSubmit)}>
          Sell
        </Button>
      </ButtonWrapper>
      <TradeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        sellSuccess={isSuccess}
        price={modalPrice}
        amount={modalAmount}
      />
    </ColumnWrapper>
  );
};

const TradeForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  return (
    <FormWrapper>
      <BuyForm price={price} stockCode={stockCode} />
      <SellForm price={price} stockCode={stockCode} />
    </FormWrapper>
  );
};

export default TradeForm;
