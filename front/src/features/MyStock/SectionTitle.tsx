import {
  MoreDiv,
  TextP_20_NOTGRAY,
  TitleDiv,
  TitleP,
} from '@features/MyStock/myStockStyledComponent';
import { UiwRight } from '@features/MyStock/Icon';

interface SectionTitleProps {
  title: string;
  onMoreClick: () => void;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, onMoreClick }) => {
  return (
    <TitleDiv>
      <TitleP>{title}</TitleP>
      <MoreDiv style={{ cursor: 'pointer' }} onClick={onMoreClick}>
        <TextP_20_NOTGRAY>더보기</TextP_20_NOTGRAY>
        <UiwRight />
      </MoreDiv>
    </TitleDiv>
  );
};

export default SectionTitle;
