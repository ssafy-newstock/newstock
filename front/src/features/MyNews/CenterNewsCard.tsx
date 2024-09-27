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
import { translateIndustry } from '@api/dummyData/DummyData';
import { format } from 'date-fns';

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
  //"YYYY-MM-DD HH:MM" => "YYYY.MM.DD"
  const formatTransactionDate = (isoDate: string): string => {
    return format(new Date(isoDate), 'yyyy.MM.dd'); // date-fns의 올바른 포맷 형식 사용
  };

  const formattedDate = formatTransactionDate(data.uploadDatetime);
  return (
    <CardContainer>
      <CardTitleFontStyle>{data.title}</CardTitleFontStyle>
      <CardContextDiv>
        <FontStyle>{data.media}</FontStyle>
        <p>|</p>
        <FontStyle>{formattedDate}</FontStyle>
      </CardContextDiv>
      <CardBottomContainer>
        {data.keywords && (
          <CardKeywordDiv>
            <CardKeywordFontStyle>#{data.keywords[0]}</CardKeywordFontStyle>
          </CardKeywordDiv>
        )}
        {data.industry && (
          <CardKeywordDiv>
            <CardKeywordFontStyle>
              #{translateIndustry(data.industry)}
            </CardKeywordFontStyle>
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
