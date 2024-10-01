import {
  useFavoriteIndustryNews,
  useFavoriteStockNews,
} from '@hooks/useFavoriteNews'; // 훅 경로
import { TextP_24 } from '@features/MyStockModal/styledComponent';
import CenterNewsCard from '@features/MyNews/CenterNewsCard'; // 뉴스 카드 컴포넌트
import styled from 'styled-components';

// 스타일 컴포넌트 정의 (필요에 따라 추가)
const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FavoriteNews: React.FC = () => {
  // 시황 뉴스와 종목 뉴스 데이터를 가져옴
  const {
    data: industryNews,
    isLoading: isLoadingIndustry,
    error: errorIndustry,
  } = useFavoriteIndustryNews();
  const {
    data: stockNews,
    isLoading: isLoadingStock,
    error: errorStock,
  } = useFavoriteStockNews();

  if (isLoadingIndustry || isLoadingStock) {
    return <p>Loading...</p>;
  }

  if (errorIndustry || errorStock) {
    return <p>Error loading news data.</p>;
  }

  return (
    <>
      {/* 시황 뉴스
      <NewsContainer>
        <TextP_24>시황 뉴스</TextP_24>
        {industryNews && industryNews.length > 0 ? (
          industryNews.map((newsItem) => (
            <CenterNewsCard key={newsItem.id} data={newsItem} />
          ))
        ) : (
          <p>관심 시황 뉴스가 없습니다.</p>
        )}
      </NewsContainer>

      {/* 종목 뉴스 */}
      {/* <NewsContainer>
        <TextP_24>종목 뉴스</TextP_24>
        {stockNews && stockNews.length > 0 ? (
          stockNews.map((newsItem) => (
            <CenterNewsCard key={newsItem.id} data={newsItem} />
          ))
        ) : (
          <p>관심 종목 뉴스가 없습니다.</p>
        )}
      </NewsContainer> */}
    </>
  );
};

export default FavoriteNews;
