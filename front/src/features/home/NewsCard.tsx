import { IStockNews } from '@hooks/useTop4news';

const NewsCard = ({ news }: { news: IStockNews }) => {
  return (
    <>
      <div>{news.title}</div>
      <div>{news.uploadDatetime}</div>
      <div>{news.media}</div>
      <img src={news.thumbnail} alt="" />
      <div>{news.stockNewsStockCodes}</div>
    </>
  );
};

export default NewsCard;
