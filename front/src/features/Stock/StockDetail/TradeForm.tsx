import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';

interface FormValues {
  price: number;
  amount: number;
}

interface TradeFormProps {
  initialPrice: number;
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

const Button = styled.button<{ variant: 'buy' | 'sell' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === 'buy' ? '#4caf50' : '#f44336'};
  &:hover {
    opacity: 0.8;
  }
`;

const BuyForm: React.FC<{ initialPrice: number }> = ({ initialPrice }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      price: initialPrice,
      amount: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    const buyData = {
      price: data.price,
      amount: data.amount,
    };
    console.log('Buy Data:', buyData);
    // 매수 로직
    reset({ price: initialPrice, amount: 0 }); // 폼 리셋
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
                message: 'Buy amount must be at least 1'
              }
            }}
            render={({ field }) => (
              <>
                <InputTag {...field} type="number" placeholder="Enter buy amount" />
                {errors.amount && (
                  <p style={{ color: 'red' }}>{errors.amount.message}</p>
                )}
              </>
            )}
          />
        </InputRow>
      </InputWrapper>
      <ButtonWrapper>
        <Button type="button" variant="buy" onClick={handleSubmit(onSubmit)}>
          Buy
        </Button>
      </ButtonWrapper>
    </ColumnWrapper>
  );
};

const SellForm: React.FC<{ initialPrice: number }> = ({ initialPrice }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      price: initialPrice,
      amount: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    const sellData = {
      price: data.price,
      amount: data.amount,
    };
    console.log('Sell Data:', sellData);
    // 매도 로직
    reset({ price: initialPrice, amount: 0 }); // 폼 리셋
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
                message: 'Sell amount must be at least 1'
              }
            }}
            render={({ field }) => (
              <>
                <InputTag {...field} type="number" placeholder="Enter sell amount" />
                {errors.amount && (
                  <p style={{ color: 'red' }}>{errors.amount.message}</p>
                )}
              </>
            )}
          />
        </InputRow>
      </InputWrapper>
      <ButtonWrapper>
        <Button type="button" variant="sell" onClick={handleSubmit(onSubmit)}>
          Sell
        </Button>
      </ButtonWrapper>
    </ColumnWrapper>
  );
};

const TradeForm: React.FC<TradeFormProps> = ({ initialPrice }) => {
  return (
    <FormWrapper>
      <BuyForm initialPrice={initialPrice} />
      <SellForm initialPrice={initialPrice} />
    </FormWrapper>
  );
};

export default TradeForm;