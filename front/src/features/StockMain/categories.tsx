import { CategoryCardRow } from '@features/StockMain/styledComponent';
import { ICategory } from '@features/StockMain/type';

export const CategoryFirstRow = () => {
  return (
    <CategoryCardRow>
      <div>이미지</div>
      <div>카테고리</div>
      <div>지수 현재가</div>
      <div>지수 전일 대비</div>
      <div>지수 등락률</div>
      <div>누적 거래 대금</div>
    </CategoryCardRow>
  );
};

const Categories: React.FC<ICategory> = ({ category, imageUrl }) => {
  return (
    <CategoryCardRow>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={imageUrl} alt={category.industryName} width={50} />
      </div>
      <div>{category.industryName}</div>
      <div>{category.bstpNmixPrpr}</div>
      <div>{category.bstpNmixPrdyVrss}</div>
      <div>{category.bstpNmixPrdyCtrt}%</div>
      <div>{category.acmlTrPbmn}</div>
    </CategoryCardRow>
  );
};

export default Categories;
