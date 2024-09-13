import AshbhIcon from './AshbhIcon';
import {
  CardBottomContainer,
  CardContainer,
  CardContextDiv,
  CardTitleFontStyle,
  FontStyle,
  IconWrapper,
} from './StyledComponent';

interface Data {
  Title: string;
  NewsTitle: string;
  Date: string;
}

interface CenterCardProps {
  data: Data;
}

const CenterScrapCard: React.FC<CenterCardProps> = ({ data }) => {
  return (
    <CardContainer>
      <CardTitleFontStyle>{data.Title}</CardTitleFontStyle>
      <CardContextDiv>
        <FontStyle>{data.NewsTitle}</FontStyle>
      </CardContextDiv>
      <CardBottomContainer hasKeyword={!!data.Date}>
        {data.Date && (
          <CardContextDiv>
            <FontStyle>{data.Date}</FontStyle>
          </CardContextDiv>
        )}
        <IconWrapper>
          <AshbhIcon />
        </IconWrapper>
      </CardBottomContainer>
    </CardContainer>
  );
};

export default CenterScrapCard;
