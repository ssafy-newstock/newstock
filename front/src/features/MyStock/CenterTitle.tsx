import { TitleDiv, TitleP } from '@features/MyStock/myStockStyledComponent';

interface CenterTitleProps {
  title: string;
}

const CenterTitle: React.FC<CenterTitleProps> = ({ title }) => {
  return (
    <TitleDiv>
      <TitleP>{title}</TitleP>
    </TitleDiv>
  );
};

export default CenterTitle;
