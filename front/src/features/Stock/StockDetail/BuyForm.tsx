// api.ts
import { authRequest } from '@api/axiosInstance';

export interface BuyStockRequest {
  stockCode: string;
  stockTransactionAmount: number;
  stockTransactionType: 'BUY';
}

export interface BuyStockResponseData {
  stockCode: string;
  currentPrice: number;
  amount: number;
  totalPrice: number;
}

export interface BuyStockResponse {
  success: boolean;
  data: BuyStockResponseData;
}

export interface ApiError {
  message: string;
}

export const buyStock = async (data: BuyStockRequest): Promise<BuyStockResponse> => {
  const response = await authRequest.post<BuyStockResponse>('/stock/transaction/buy', data);
  return response.data;
};

// hooks/useBuyStock.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface BuyStockVariables {
  stockCode: string;
  amount: number;
}

export const useBuyStock = () => {
  return useMutation<BuyStockResponse, ApiError, BuyStockVariables>({
    mutationFn: ({ stockCode, amount }) => 
      buyStock({
        stockCode,
        stockTransactionAmount: amount,
        stockTransactionType: 'BUY',
      }),
  });
};

// BuyForm.tsx
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
import { FlexGap } from '@components/styledComponent';

interface FormValues {
  price: number;
  amount: number;
}

interface TradeFormProps {
  price: number;
  stockCode: string;
}

const BuyForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const mutation = useBuyStock();
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
    mutation.mutate(
      {
        stockCode,
        amount: Number(formData.amount),
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
    if (mutation.isError) return '보유 금액이 부족합니다.';
    if (mutation.isSuccess) {
      return `${mutation.data.data.amount}주를 ${mutation.data.data.currentPrice.toLocaleString()}원에 매수했습니다.`;
    }
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
                message: '1주 이상을 선택해주세요.',
              },
            }}
            render={({ field }) => (
              <>
                <InputTag
                  {...field}
                  type="number"
                  placeholder="Enter buy amount"
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
            <InputLabel>매수가: </InputLabel>
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
            $variant="buy"
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '처리중...' : '매수'}
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
        buySuccess={mutation.isSuccess}
        price={mutation.data?.data.currentPrice ?? price}
        amount={mutation.data?.data.amount ?? amount}
      />
    </ColumnWrapper>
  );
};

export default BuyForm;