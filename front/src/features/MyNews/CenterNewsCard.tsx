import AshbhIcon from '@features/MyNews/AshbhIcon';
import {
  CardBottomContainer,
  CardContainer,
  CardContextDiv,
  CardKeywordDiv,
  CardKeywordFontStyle,
  CardTitleFontStyle,
  FontStyle,
  IconWrapper,
} from './styledComponent';

interface NewsData {
  title: string;
  subtitle: string;
  media: string;
  description: string;
  thumbnail: string;
  uploadDatetime: string;
  article: string;
  newsId: string;
  industry?: string;
  stockCodes?: string[];
  keywords?: string[];
}

interface CenterCardProps {
  data: NewsData;
}

const CenterNewsCard: React.FC<CenterCardProps> = ({ data }) => {
  return (
    <CardContainer>
      <CardTitleFontStyle>{data.title}</CardTitleFontStyle>
      <CardContextDiv>
        <FontStyle>{data.media}</FontStyle>
        <p>|</p>
        <FontStyle>{data.uploadDatetime}</FontStyle>
      </CardContextDiv>
      <CardBottomContainer hasKeyword={!!data.keywords}>
        {data.keywords && (
          <CardKeywordDiv>
            <CardKeywordFontStyle>{data.keywords[0]}</CardKeywordFontStyle>
          </CardKeywordDiv>
        )}
        {data.industry && (
          <CardKeywordDiv>
            <CardKeywordFontStyle>{data.industry}</CardKeywordFontStyle>
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
