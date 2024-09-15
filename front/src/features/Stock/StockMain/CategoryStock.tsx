import { ICategory } from '@features/Stock/types';
import {
  Text,
  TextLarge,
  CategoryImgWrapper,
  CategoryImgMain,
  CategoryInfo,
  CategoryData,
  CategoryCardColumn,
} from '@features/Stock/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';

const CategoryStock: React.FC<ICategory> = ({ category, imageUrl, imageBgColor }) => {
  return (
    <CategoryCardColumn>
      <CategoryImgWrapper backgroundColor={imageBgColor} >
        <CategoryImgMain src={imageUrl} alt={blueLogo} />
      </CategoryImgWrapper>
      <CategoryInfo>
        {' '}
        <TextLarge>{category.industryName}</TextLarge>
        <CategoryData isPositive={category.bstpNmixPrdyCtrt.startsWith('-')}>
          {formatChange(category.bstpNmixPrdyCtrt)}%
        </CategoryData>
        <Text>{formatNumber(category.acmlTrPbmn)}</Text>
      </CategoryInfo>
    </CategoryCardColumn>
  );
};

export default CategoryStock;
