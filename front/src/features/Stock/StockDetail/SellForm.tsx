// api.ts (기존 파일에 추가)
import { authRequest } from '@api/axiosInstance';
export interface SellStockRequest {
  stockCode: string;
  stockTransactionAmount: number;
  stockTransactionType: 'SELL';
}

export interface ApiError {
  message: string;
}

export const sellStock = async (data: SellStockRequest) => {
  await authRequest.post('/stock/transaction/sell', data);
};

// hooks/useSellStock.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface SellStockVariables {
  stockCode: string;
  amount: number;
}

export const useSellStock = () => {
  return useMutation<void, ApiError, SellStockVariables>({
    mutationFn: ({ stockCode, amount }) => 
      sellStock({
        stockCode,
        stockTransactionAmount: amount,
        stockTransactionType: 'SELL',
      }),
  });
};

// SellForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { FlexGap } from '@components/styledComponent';

const SellForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalAmount, setModalAmount] = useState(0);

  const mutation = useSellStock();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      price,
      amount: 0,
    },
  });

  const amount = watch('amount');

  useEffect(() => {
    setValue('price', price);
  }, [price, setValue]);

  useEffect(() => {
    setTotalPrice(Number(price) * Number(amount));
  }, [amount, price]);

  const onSubmit = (formData: FormValues) => {
    const sellAmount = Number(formData.amount);
    setModalAmount(sellAmount);
    
    mutation.mutate(
      {
        stockCode,
        amount: sellAmount,
      },
      {
        onSuccess: () => {
          setModalOpen(true);
          resetForm({ price, amount: 0 });
          queryClient.invalidateQueries({queryKey:['my-Holding', stockCode]});
        },
        onError: () => {
          setModalOpen(true);
        },
      }
    );
  };

  const getModalMessage = () => {
    if (mutation.isPending) return '처리중...';
    if (mutation.isError) return '매도 실패: 보유 주식이 부족합니다.';
    if (mutation.isSuccess) return `${modalAmount}주를 ${price.toLocaleString()}원에 매도했습니다.`;
    return '';
  };

  return (
    <ColumnWrapper>
      <InputWrapper>
        <InputRow>
          <InputLabel>시장가:</InputLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputTag
                {...field}
                type="text"
                value={Number(field.value).toLocaleString()}
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
                message: '1주 이상을 선택해주세요.',
              },
            }}
            render={({ field }) => (
              <>
                <InputTag
                  {...field}
                  type="number"
                  placeholder="Enter sell amount"
                  disabled={mutation.isPending}
                />
                {errors.amount && (
                  <p style={{ color: 'red' }}>{errors.amount.message}</p>
                )}
              </>
            )}
          />
        </InputRow>
      </InputWrapper>
      <FlexGap $gap="1rem">
        <InputWrapper>
          <InputRow>
            <InputLabel>매도가: </InputLabel>
            <InputTag
              type="text"
              value={totalPrice.toLocaleString()}
              disabled
            />
          </InputRow>
        </InputWrapper>

        <TradeButtonWrapper>
          <TradeButton
            type="button"
            $variant="sell"
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '처리중...' : '매도'}
          </TradeButton>
        </TradeButtonWrapper>
      </FlexGap>
      <TradeModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          mutation.reset();
        }}
        message={getModalMessage()}
        sellSuccess={mutation.isSuccess}
        price={price}
        amount={modalAmount}
      />
    </ColumnWrapper>
  );
};

export default SellForm;