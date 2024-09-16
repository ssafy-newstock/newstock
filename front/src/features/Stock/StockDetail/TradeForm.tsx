import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';

interface FormValues {
  buyPrice: number;
  buyAmount: number;
  sellPrice: number;
  sellAmount: number;
}

interface TradeFormProps {
  initialPrice: number;
}

const FormWrapper = styled.form`
  display: flex;
  gap: 2rem;
  max-width: 100%;
  /* margin: 0 auto; */
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button<{ variant: 'buy' | 'sell' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === 'buy' ? '#4caf50' : '#f44336'};
  &:hover {
    opacity: 0.8;
  }
`;

const TradeForm: React.FC<TradeFormProps> = ({initialPrice}) => {
  const { control, reset, getValues } = useForm<FormValues>({
    defaultValues: {
      buyPrice: initialPrice,
      buyAmount: 0,
      sellPrice: initialPrice,
      sellAmount: 0,
    },
  });

  const handleBuy = () => {
    const values = getValues();
    const buyData = {
      price: values.buyPrice,
      amount: values.buyAmount,
    };
    console.log('Buy Data:', buyData);
    // 매수 로직을 여기에 추가합니다.
    // 예: sendBuyOrder(buyData);
    reset(); // 폼 리셋
  };

  const handleSell = () => {
    const values = getValues();
    const sellData = {
      price: values.sellPrice,
      amount: values.sellAmount,
    };
    console.log('Sell Data:', sellData);
    // 매도 로직을 여기에 추가합니다.
    // 예: sendSellOrder(sellData);
    reset(); // 폼 리셋
  };

  return (
    <FormWrapper>
      <ColumnWrapper>
        <h3>Buy</h3>
        <InputWrapper>
          <Controller
            name="buyPrice"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Buy Price"
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            )}
          />
        </InputWrapper>
        <InputWrapper>
          <Controller
            name="buyAmount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Buy Amount"
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            )}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button type="button" variant="buy" onClick={handleBuy}>
            Buy
          </Button>
        </ButtonWrapper>
      </ColumnWrapper>

      <ColumnWrapper>
        <h3>Sell</h3>
        <InputWrapper>
          <Controller
            name="sellPrice"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Sell Price"
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            )}
          />
        </InputWrapper>
        <InputWrapper>
          <Controller
            name="sellAmount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Sell Amount"
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            )}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button type="button" variant="sell" onClick={handleSell}>
            Sell
          </Button>
        </ButtonWrapper>
      </ColumnWrapper>
    </FormWrapper>
  );
};

export default TradeForm;
