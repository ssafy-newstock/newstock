import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import ScrapCard from '@features/Scrap/detail/ScrapCard';
import { useEffect, useState } from 'react';
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';
import LoadingSpinner from '@components/LoadingSpinner'; // 로딩 스피너 컴포넌트 임포트
import { CenteredMessage } from '@features/SideModal/styledComponent'; // CenteredMessage 임포트

interface RightContentProps {
  onCardClick: (scrap: ScrapData, scrapNews: NewsData) => void; // 클릭 시 호출되는 함수
  scrapDatas: ScrapData[];
  scrapNewsDatas: NewsData[];
}

const RightContent: React.FC<RightContentProps> = ({
  onCardClick,
  scrapDatas,
  scrapNewsDatas,
}) => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // 데이터 로딩이 완료되면 로딩 상태를 해제
    if (scrapDatas.length === 0 && scrapNewsDatas.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [scrapDatas, scrapNewsDatas]);

  // 로딩 중일 때 로딩 스피너 표시
  if (isLoading) {
    return (
      <CenteredMessage>
        <LoadingSpinner />
      </CenteredMessage>
    );
  }

  // 데이터가 없을 때 메시지 표시
  if (scrapDatas.length === 0) {
    return <NoMessageP>스크랩한 뉴스가 없습니다.</NoMessageP>;
  }

  return (
    <>
      {scrapDatas.map((scrap, index) => {
        // scrap.newsId와 일치하는 scrapNewsData에서 데이터를 찾음
        const matchedNewsData = scrapNewsDatas.find(
          (news) => news.id === scrap.newsId
        );

        // matchedNewsData가 있을 때만 렌더링
        return matchedNewsData ? (
          <ScrapCard
            key={`${scrap.newsId}-${index}`}
            data={matchedNewsData} // 찾은 newsData를 전달
            scrapData={scrap} // scrapData 전달
            onClick={() => onCardClick(scrap, matchedNewsData)}
          />
        ) : null; // 데이터가 없으면 렌더링하지 않음
      })}
    </>
  );
};

export default RightContent;
