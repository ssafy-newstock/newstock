import AshbhIcon from '@features/MyNews/AshbhIcon';
import {
  CardBottomContainer,
  CardContainer,
  CardContextDiv,
  CardTitleFontStyle,
  FontStyle,
  IconWrapper,
} from './styledComponent';
import { translateIndustry } from '@api/dummyData/DummyData';
import { format } from 'date-fns';
// import { useNavigate } from 'react-router-dom';
import { NewsTag } from '@features/News/NewsIconTag';
import styled from 'styled-components';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { ScrapData, NewsData } from '@pages/News/ScrapNewsInterface';

const CustomFontStyle = styled(FontStyle)`
  color: ${({ theme }) => theme.grayTextColor};
  font-size: 0.8rem;
`;

const BlackFontStyle = styled(FontStyle)`
  color: ${({ theme }) => theme.textColor};
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  width: calc(100% - 1.25rem); /* 부모 padding을 고려해 너비 조정 */
  box-sizing: border-box;
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.25rem;
  background: #e0e0e0;
`;

interface CenterCardProps {
  title: string;
  data: ScrapData | NewsData;
  scrapData?: ScrapData;
  onDelete: (id: number) => void;
}

const CenterNewsCard: React.FC<CenterCardProps> = ({
  data,
  scrapData,
  title,
  onDelete,
}) => {
  // const navigate = useNavigate();
  //"YYYY-MM-DD HH:MM" => "YYYY.MM.DD"
  const formatTransactionDate = (isoDate: string): string => {
    return format(new Date(isoDate), 'yyyy.MM.dd'); // date-fns의 올바른 포맷 형식 사용
  };

  const handleDetail = () => {
    // if (title === '시황 뉴스') {
    //   navigate(`/subnews-main/economic-news/${data.id}`);
    // } else {
    //   navigate(`/subnews-main/stock-news/${data.id}`);
    // }
    console.log('data : ', data);
    console.log('scrapData: ', scrapData);
  };

  // handleDelete 정의
  const handleDelete = () => {
    onDelete(Number(data.id)); // 삭제 작업 처리
    if (scrapData) {
      onDelete(Number(scrapData.newsId!)); // 삭제 작업 처리
    }
  };

  const formattedDate = data.uploadDatetime
    ? formatTransactionDate(data.uploadDatetime)
    : ''; // 날짜가 없을 경우 빈 문자열을 설정

  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const stockCode = data.stockNewsStockCodes?.[0];
  const stockDetail =
    allStock?.find((s) => s.stockCode === stockCode) ||
    top10Stock?.find((s) => s.stockCode === stockCode);
  const stockName = stockDetail?.stockName || 'Unknown Stock';

  return (
    <CardContainer style={{ cursor: 'pointer' }} onClick={handleDetail}>
      {/* scrapData가 있을 경우 */}
      {scrapData ? (
        <>
          <CardTitleFontStyle>{scrapData.title}</CardTitleFontStyle>
          <BlackFontStyle>{data.title}</BlackFontStyle>
          <CardBottomContainer>
            {stockCode && <NewsTag $tagName={stockName}># {stockName}</NewsTag>}
            {data.industry && (
              <NewsTag $tagName={translateIndustry(data.industry)}>
                #{translateIndustry(data.industry)}
              </NewsTag>
            )}
            <IconWrapper>
              <AshbhIcon
                id={Number(data.id)}
                title={title}
                onDelete={handleDelete}
                scrapData={scrapData}
              />
            </IconWrapper>
          </CardBottomContainer>

          {/* <CardTitleFontStyle>
            스크랩: {scrapData.title} <br />
            원본: {data.title}
          </CardTitleFontStyle> */}
        </>
      ) : (
        <>
          {/* 기존 UI 렌더링 */}
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
                #{translateIndustry(data.industry)}
              </NewsTag>
            )}
            <IconWrapper>
              <AshbhIcon
                id={Number(data.id)}
                title={title}
                onDelete={handleDelete}
              />
            </IconWrapper>
          </CardBottomContainer>
        </>
      )}
    </CardContainer>
  );
};

export default CenterNewsCard;
