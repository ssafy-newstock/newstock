import { ICategory } from '@features/Stock/types';
import {
  Text,
  CategoryImgWrapper,
  CategoryImg,
  CategoryData,
  CategoryCardRow,
} from '@features/Stock/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';

export const AllCategoryFirstRow = () => {
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

const AllCategoryStock: React.FC<ICategory> = ({ category, imageUrl }) => {
  return (
    <CategoryCardRow>
      <CategoryImgWrapper>
        <CategoryImg src={imageUrl} alt={blueLogo} />
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

export default AllCategoryStock;
