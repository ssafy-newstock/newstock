import { NewsCardSkeleton, NewsMainWrapperSkeleton } from '@features/News/skeleton/styledComponent';

const NewsMainSkeleton = () => {
  return (
    <NewsMainWrapperSkeleton>
      {Array.from({ length: 4 }).map((_, index) => (
        <NewsCardSkeleton key={index} />
      ))}
    </NewsMainWrapperSkeleton>
  );
};
export default NewsMainSkeleton;
