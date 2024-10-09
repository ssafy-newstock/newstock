import {
  CardBottomContainer,
  CardContainer,
  CardContextDiv,
  CardTitleFontStyle,
  FontStyle,
} from '@features/MyNews/styledComponent';
import { translateIndustry } from '@api/dummyData/DummyData';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import { NewsTag } from '@features/News/NewsIconTag';
import { useNavigate } from 'react-router-dom';
import { useFindStockByCode } from '@utils/uesFindStockByCode';
import { NewsData } from '@features/News/ScrapNewsInterface';

const CustomFontStyle = styled(FontStyle)`
  color: ${({ theme }) => theme.grayTextColor};
  font-size: 0.8rem;
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.25rem;
  background: #e0e0e0;
`;

interface RightNewsProps {
  data: NewsData;
}

const RightNewsCard: React.FC<RightNewsProps> = ({ data }) => {
  const navigate = useNavigate();

  // 주식 코드가 없는 경우 빈 문자열을 기본값으로 설정
  const stockCode = data.stockNewsStockCodes?.[0] || '';

  // 주식 상세 정보
  const stockDetail = useFindStockByCode(stockCode);
  const stockName = stockDetail?.stockName || 'Unknown Stock';

  const newsType = stockCode ? 'stock' : 'industry';

  const handleDetail = () => {
    if (newsType === 'stock') {
      navigate(`/subnews-main/stock-news/${data.id}`);
    } else {
      navigate(`/subnews-main/economic-news/${data.id}`);
    }
  };

  // 드래그 시작 시
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ ...data, type: newsType })
    );
    e.dataTransfer.effectAllowed = 'move'; // 이동 가능
    document.body.style.cursor = 'grabbing'; // 드래그 시 커서 변경
  };

  // 드래그 종료 시
  const handleDragEnd = () => {
    document.body.style.cursor = 'default'; // 드래그 후 커서 복구
  };

  const formattedDate = data.uploadDatetime
    ? format(parseISO(data.uploadDatetime), 'yyyy.MM.dd')
    : ''; // 날짜가 없을 경우 빈 문자열을 설정

  return (
    <CardContainer
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: 'grab' }}
      onClick={handleDetail}
    >
      <CardTitleFontStyle>{data.title}</CardTitleFontStyle>
      <CardContextDiv>
        <CustomFontStyle>{data.media}</CustomFontStyle>
        <BookmarkedNewsMiddleLine />
        <CustomFontStyle>{formattedDate}</CustomFontStyle>
      </CardContextDiv>
      <CardBottomContainer>
        {stockCode && <NewsTag $tagName={stockName}># {stockName}</NewsTag>}
        {data.industry && (
          <NewsTag $tagName={translateIndustry(data.industry)}>
            # {translateIndustry(data.industry)}
          </NewsTag>
        )}
      </CardBottomContainer>
    </CardContainer>
  );
};

export default RightNewsCard;
