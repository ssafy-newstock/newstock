const StockNewsSkeleton = () => {
  return (
    <div className="stock-news-skeleton">
      <div className="stock-news-skeleton__header">
        <div className="stock-news-skeleton__header__title"></div>
        <div className="stock-news-skeleton__header__date"></div>
      </div>
      <div className="stock-news-skeleton__content">
        <div className="stock-news-skeleton__content__image"></div>
        <div className="stock-news-skeleton__content__text"></div>
      </div>
    </div>
  );
}
export default StockNewsSkeleton;