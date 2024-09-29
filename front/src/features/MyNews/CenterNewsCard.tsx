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
import { useNavigate } from 'react-router-dom';
interface NewsData {
  id: number;
  title: string;
  subtitle: string | null;
  media: string;
  description: string;
  thumbnail: string;
  uploadDatetime: string;
  article: string;
  sentiment: string;
  industry?: string;
  stockNewsStockCodes?: { stockCode: string; stockName: string }[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
}

interface CenterCardProps {
  title: string;
  data: NewsData;
  onDelete: (id: number) => void;
}

const CenterNewsCard: React.FC<CenterCardProps> = ({
  data,
  title,
  onDelete,
}) => {
  const navigate = useNavigate();
  //"YYYY-MM-DD HH:MM" => "YYYY.MM.DD"
  const formatTransactionDate = (isoDate: string): string => {
    return format(new Date(isoDate), 'yyyy.MM.dd'); // date-fns의 올바른 포맷 형식 사용
  };

  const handleDetail = () => {
    if (title === '시황 뉴스') {
      navigate(`/subnews-main/economic-news/${data.id}`);
    } else {
      navigate(`/subnews-main/stock-news/${data.id}`);
    }
  };

  const handleDelete = () => {
    onDelete(data.id); // 삭제된 아이템을 상위에서 처리
  };

  const formattedDate = formatTransactionDate(data.uploadDatetime);
  return (
    <CardContainer style={{ cursor: 'pointer' }} onClick={handleDetail}>
      <CardTitleFontStyle>{data.title}</CardTitleFontStyle>
      <CardContextDiv>
        <FontStyle>{data.media}</FontStyle>
        <p>|</p>
        <FontStyle>{formattedDate}</FontStyle>
      </CardContextDiv>
      <CardBottomContainer>
        {data.stockNewsStockCodes && (
          <CardKeywordDiv>
            <CardKeywordFontStyle>
              #{data.stockNewsStockCodes[0].stockName}
            </CardKeywordFontStyle>
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
          <AshbhIcon id={data.id} title={title} onDelete={handleDelete} />
        </IconWrapper>
      </CardBottomContainer>
    </CardContainer>
  );
};

export default CenterNewsCard;
