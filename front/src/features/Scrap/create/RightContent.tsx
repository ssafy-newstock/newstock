import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import RightNewsCard from '@features/Scrap/create/RightNewsCard';
import { useStockNews, useIndustryNews } from '@hooks/useFavoriteNewsQuery'; // 훅 임포트
import LoadingSpinner from '@components/LoadingSpinner'; // 로딩 스피너 임포트
import { CenteredMessage } from '@features/SideModal/styledComponent';

const RightContent: React.FC = () => {
  // React Query 훅을 사용해 데이터 가져오기
  const {
    data: stockNews,
    isLoading: isLoadingStock,
    error: stockError,
  } = useStockNews();
  const {
    data: economicNews,
    isLoading: isLoadingIndustry,
    error: industryError,
  } = useIndustryNews();

  // 로딩 중 상태 처리
  if (isLoadingStock || isLoadingIndustry) {
    return (
      <CenteredMessage>
        <LoadingSpinner />
      </CenteredMessage>
    );
  }

  // 에러 처리
  if (stockError || industryError) {
    return (
      <CenteredMessage>
        데이터를 불러오는 중 오류가 발생했습니다.
      </CenteredMessage>
    );
  }

  // 데이터를 결합
  const combinedNews = [...(economicNews || []), ...(stockNews || [])];

  // 렌더링
  return (
    <>
      {combinedNews.length > 0 ? (
        combinedNews.map((news, index) => (
          <RightNewsCard key={index} data={news} />
        ))
      ) : (
        <NoMessageP>북마크한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
