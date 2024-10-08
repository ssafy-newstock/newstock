import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import ScrapCard from '@features/Scrap/detail/ScrapCard';
import { useEffect, useState } from 'react';
import { isWithinInterval, parse } from 'date-fns';
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';

interface RightContentProps {
  onCardClick: (scrap: ScrapData, scrapNews: NewsData) => void; // 클릭 시 호출되는 함수
  selectedDateRange: [Date | null, Date | null];
  scrapDatas: ScrapData[];
  scrapNewsDatas: NewsData[];
}

const RightContent: React.FC<RightContentProps> = ({
  onCardClick,
  selectedDateRange,
  scrapDatas,
  scrapNewsDatas,
}) => {
  const [filteredScrap, setFilteredScrap] = useState<ScrapData[]>(scrapDatas);

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      const filtered = scrapDatas.filter((scrap) => {
        const scrapDate = parse(
          scrap.uploadDatetime ?? '',
          'yyyy.MM.dd',
          new Date()
        ); // card.Date를 Date 객체로 변환
        // 날짜가 변환되었는지 확인 후 범위 내에 있는지 검사
        return isWithinInterval(scrapDate, {
          start: startDate, // 여기에 Date 객체 사용
          end: endDate,
        });
      });

      setFilteredScrap(filtered);
    } else {
      setFilteredScrap(scrapDatas); // 날짜가 없으면 전체 뉴스
    }
  }, [selectedDateRange, scrapDatas]);

  return (
    <>
      {filteredScrap.length > 0 ? (
        filteredScrap.map((scrap, index) => {
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
        })
      ) : (
        <NoMessageP>스크랩한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
