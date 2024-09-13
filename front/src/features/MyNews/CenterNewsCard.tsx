import AshbhIcon from './AshbhIcon';
import {
  CardBottomContainer,
  CardContainer,
  CardContextDiv,
  CardKeywordDiv,
  CardKeywordFontStyle,
  CardTitleFontStyle,
  FontStyle,
  IconWrapper,
} from './StyledComponent';

interface Data {
  Title: string;
  Media: string;
  Date: string;
  keyword?: string;
}

interface CenterCardProps {
  data: Data;
}

const CenterNewsCard: React.FC<CenterCardProps> = ({ data }) => {
  return (
    <CardContainer>
      <CardTitleFontStyle>{data.Title}</CardTitleFontStyle>
      <CardContextDiv>
        <FontStyle>{data.Media}</FontStyle>
        <p>|</p>
        <FontStyle>{data.Date}</FontStyle>
      </CardContextDiv>
      <CardBottomContainer hasKeyword={!!data.keyword}>
        {data.keyword && (
          <CardKeywordDiv>
            <CardKeywordFontStyle>#{data.keyword}</CardKeywordFontStyle>
          </CardKeywordDiv>
        )}
        <IconWrapper>
          <AshbhIcon />
        </IconWrapper>
      </CardBottomContainer>
    </CardContainer>
  );
};

export default CenterNewsCard;
