import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { authRequest } from '@api/axiosInstance';
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

const BuyForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [modalAmount, setModalAmount] = useState(0);
  const [modalPrice, setModalPrice] = useState(0); 
  const [totalPrice, setTotalPrice] = useState(0);

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
    const buyData = {
      price: data.price,
      amount: Number(data.amount),
    };
    console.log('Buy Data:', buyData);
    // 매수 로직
    try {
      // 매수 API 요청
      const response = await authRequest.post('/stock/transaction/buy', {
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
          <InputLabel>거래가:</InputLabel>
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
          <InputLabel>수량:</InputLabel>
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
      <InputWrapper>
        <InputRow>
          <InputLabel>매수가: </InputLabel>
          <InputTag type="text" value={totalPrice.toLocaleString()} disabled />
        </InputRow>
      </InputWrapper>
      <TradeButtonWrapper>
        <TradeButton type="button" $variant="buy" onClick={handleSubmit(onSubmit)}>
          Buy
        </TradeButton>
      </TradeButtonWrapper>
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

export default BuyForm;