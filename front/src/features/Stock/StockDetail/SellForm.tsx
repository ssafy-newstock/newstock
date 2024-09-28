import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { axiosInstance } from '@api/axiosInstance';
import TradeModal from '@features/Stock/StockDetail/TradeModal';
import {
  ColumnWrapper,
  InputRow,
  InputTag,
  InputWrapper,
  TradeButtonWrapper,
  TradeButton,
  InputLabel,
} from '@features/Stock/styledComponent';
import { FormValues, TradeFormProps } from '@features/Stock/types';

const SellForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [modalAmount, setModalAmount] = useState(0); // 모달로 보낼 amount 상태 추가
  const [modalPrice, setModalPrice] = useState(0); // 모달로 보낼 price 상태 추가
  const [totalPrice, setTotalPrice] = useState(0); // 구매 금액 상태 추가

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      price: price,
      amount: 0,
    },
  });

  const amount = watch('amount'); // amount 값 가져오기(실시간)

  useEffect(() => {
    setValue('price', price);
  }, [price, setValue]);

  useEffect(() => {
    setTotalPrice(Number(price) * Number(amount));
  }, [amount, price]);

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
          <InputLabel>거래가:</InputLabel>
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
          <InputLabel>수량:</InputLabel>
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
      <InputWrapper>
        <InputRow>
          <InputLabel>매도가: </InputLabel>
          <InputTag type="text" value={totalPrice.toLocaleString()} disabled />
        </InputRow>
      </InputWrapper>
      <TradeButtonWrapper>
        <TradeButton type="button" $variant="sell" onClick={handleSubmit(onSubmit)}>
          Sell
        </TradeButton>
      </TradeButtonWrapper>
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

export default SellForm;