import styled from 'styled-components';
import StockNewsHeader from '@features/News/StockNews/StockNewsHeader';
import {
  PositiveIcon as BasePositiveIcon,
  PositiveIconText,
} from '@features/News/PNSubicon';
import { NewsTag, bookmarkedIcon } from '../NewsIconTag';
import { useParams } from 'react-router-dom';
import { getNewsData } from '@api/dummyData/DummyData';

const StockNewsDetailHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.75rem 0.625rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  /* gap: 1.25rem; */
  gap: 1rem;
`;

const HeaderGapWrapper = styled.div<{ $gapSize: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gapSize }) => `${$gapSize}rem`};
  width: 100%;
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
  padding-left: 0.5rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding-left: 0.5rem;
`;

const TagBookmarkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  width: 100%;
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
  margin-top: 1rem;
`;

const PositiveIcon = styled(BasePositiveIcon)`
  position: absolute;
`;

const StockNewsDetailHeader: React.FC = () => {
  const { newsId } = useParams();
  const { stock } = getNewsData();

  const news = stock.data.find((newsItem) => newsItem.newsId === newsId);
  const title = news ? news.title : '제목 없음';
  const media = news ? news.media : '미디어 없음';
  const tagList = news ? news.keywords : [];
  const date = news
    ? news.uploadDatetime.split(' ')[0].replace(/-/g, '.')
    : '시간 없음';

  return (
    <>
      <StockNewsDetailHeaderWrapper>
        <HeaderGapWrapper $gapSize={1.25}>
          <StockNewsHeader />
          <StockNewsTitleWrapper>
            <PositiveIcon>
              <PositiveIconText>긍정</PositiveIconText>
            </PositiveIcon>
            <StockNewsTitleText>{title}</StockNewsTitleText>
          </StockNewsTitleWrapper>
        </HeaderGapWrapper>

        <HeaderGapWrapper $gapSize={1}>
          <InfoWrapper>
            <NewsMediaText>{media}</NewsMediaText>
            <NewsAuthorInfoText>박선홍 기자</NewsAuthorInfoText>
            <NewsAuthorInfoText>{date}</NewsAuthorInfoText>
          </InfoWrapper>

          <TagBookmarkWrapper>
            <InfoWrapper>
              {tagList.map((tag, index) => (
                <NewsTag key={index} $tagName={tag}>
                  # {tag}
                </NewsTag>
              ))}
            </InfoWrapper>
            {bookmarkedIcon}
          </TagBookmarkWrapper>
        </HeaderGapWrapper>

        <Border />
      </StockNewsDetailHeaderWrapper>
    </>
  );
};

export default StockNewsDetailHeader;
