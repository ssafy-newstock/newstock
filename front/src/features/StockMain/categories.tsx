import { CategoryCardRow } from '@features/StockMain/styledComponent';
import { ICategory } from '@features/StockMain/type';
import {
  Text,
  CategoryImgWrapper,
  CategoryImg,
  CategoryData,
} from '@features/StockMain/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';

export const CategoryFirstRow = () => {
  return (
    <CategoryCardRow>
      <Text>카테고리</Text>
      <Text>지수 현재가</Text>
      <Text>지수 전일 대비</Text>
      <Text>지수 등락률</Text>
      <Text>누적 거래 대금(백만)</Text>
    </CategoryCardRow>
  );
};

const Categories: React.FC<ICategory> = ({ category, imageUrl }) => {
  return (
    <CategoryCardRow>
      <CategoryImgWrapper>
        <CategoryImg src={imageUrl} alt={category.industryName} />
        {category.industryName}
      </CategoryImgWrapper>
      <Text>{category.bstpNmixPrpr}</Text>
      <CategoryData isPositive={category.bstpNmixPrdyVrss.startsWith('-')}>
        {formatChange(category.bstpNmixPrdyVrss)}
      </CategoryData>
      <CategoryData isPositive={category.bstpNmixPrdyCtrt.startsWith('-')}>
        {formatChange(category.bstpNmixPrdyCtrt)}%
      </CategoryData>
      <Text>{formatNumber(category.acmlTrPbmn)}</Text>
    </CategoryCardRow>
  );
};

export default Categories;
