import {
  FormWrapper,
} from '@features/Stock/styledComponent';
import { TradeFormProps } from '@features/Stock/types';
import BuyForm from '@features/Stock/StockDetail/BuyForm';
import SellForm from '@features/Stock/StockDetail/SellForm';


const TradeForm: React.FC<TradeFormProps> = ({ price, stockCode }) => {
  return (
    <FormWrapper>
      <BuyForm price={price} stockCode={stockCode} />
      <SellForm price={price} stockCode={stockCode} />
    </FormWrapper>
  );
};

export default TradeForm;
