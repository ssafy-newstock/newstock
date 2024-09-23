import styled from 'styled-components';
import StockNewsHeader from '@features/News/StockNews/StockNewsHeader';
import {
  PositiveIcon as BasePositiveIcon,
  PositiveIconText,
} from '@features/News/PNSubicon';
import { NewsTag, bookmarkedIcon } from '../NewsIconTag';
import { useParams } from 'react-router-dom';
import newsData from '@api/dummyData/20240907.json';

const StockNewsDetailHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.75rem 0.625rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1.25rem;
`;

const StockNewsTitleWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 0.5rem;
  align-self: stretch;
  position: relative;
`;

const StockNewsTitleText = styled.p`
  /* color: #0448a5; */
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6;
  text-indent: 6.5rem;
`;

const NewsInfoOuterWrapper = styled.div`
  display: flex;
  padding: 0rem 0.625rem;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const NewsInfoInnerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const NewsMediaText = styled.p`
  color: ${({ theme }) => theme.textColor};
  /* color: #828282; */
  font-size: 1rem;
  font-style: normal;
  line-height: 1.875rem; /* 176.471% */
`;

const NewsAuthorInfoText = styled.p`
  color: ${({ theme }) => theme.grayTextColor};
  /* color: #828282; */
  font-size: 1rem;
  font-style: normal;
  line-height: 1.875rem; /* 176.471% */
`;

const Border = styled.div`
  width: 100%;
  height: 0.06rem;
  background-color: ${({ theme }) => theme.grayTextColor};
`;

const PositiveIcon = styled(BasePositiveIcon)`
  position: absolute;
`;

const StockNewsDetailHeader: React.FC = () => {
  const { newsId } = useParams();

  const news = newsData.data.find((newsItem) => newsItem.stockId === newsId);
  const title = news ? news.title : '제목 없음';
  const media = news ? news.media : '미디어 없음';
  const date = news
    ? news.uploadDatetime.split(' ')[0].replace(/-/g, '.')
    : '시간 없음';

  return (
    <>
      <StockNewsDetailHeaderWrapper>
        <StockNewsHeader />
        <StockNewsTitleWrapper>
          <PositiveIcon>
            <PositiveIconText>긍정</PositiveIconText>
          </PositiveIcon>
          <StockNewsTitleText>{title}</StockNewsTitleText>
        </StockNewsTitleWrapper>

        <NewsInfoOuterWrapper>
          <NewsInfoInnerWrapper>
            <NewsMediaText>{media}</NewsMediaText>
            <NewsAuthorInfoText>박선홍 기자</NewsAuthorInfoText>
            <NewsAuthorInfoText>{date}</NewsAuthorInfoText>
          </NewsInfoInnerWrapper>
          <NewsInfoInnerWrapper>
            <NewsTag># 삼성전자</NewsTag>
            {bookmarkedIcon}
          </NewsInfoInnerWrapper>
        </NewsInfoOuterWrapper>

        <Border />
      </StockNewsDetailHeaderWrapper>
    </>
  );
};

export default StockNewsDetailHeader;
