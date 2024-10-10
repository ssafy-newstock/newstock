import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import RightNewsCard from '@features/Scrap/create/RightNewsCard';
import { useEffect, useState } from 'react';
import { NewsData } from '@features/News/ScrapNewsInterface';

interface CenterContentProps {
  economicNews: NewsData[];
  stockNews: NewsData[];
}
const RightContent: React.FC<CenterContentProps> = ({
  economicNews,
  stockNews,
}) => {
  // const [allNews, setAllNews] = useState<NewsData[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsData[]>([]);

  useEffect(() => {
    const combinedNews = [...economicNews, ...stockNews];
    setFilteredNews(combinedNews);
  }, [economicNews, stockNews]);
  return (
    <>
      {filteredNews.length > 0 ? (
        filteredNews.map((News, index) => (
          <RightNewsCard key={index} data={News} />
        ))
      ) : (
        <NoMessageP>북마크한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
