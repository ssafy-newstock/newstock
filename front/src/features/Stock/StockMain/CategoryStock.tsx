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

const CategoryStock: React.FC<ICategory> = ({
  category,
  imageUrl,
  imageBgColor,
  onClick,
}) => {
  return (
    <CategoryCardColumn onClick={onClick}>
      <CategoryImgWrapper backgroundColor={imageBgColor.toString()}>
        <CategoryImgMain src={imageUrl.toString()} alt={blueLogo} />
      </CategoryImgWrapper>
      <CategoryInfo>
        {' '}
        <TextLarge>{category.industryName}</TextLarge>
        <CategoryData
          isPositive={category.bstpNmixPrdyCtrt.toString().startsWith('-')}
        >
          {formatChange(category.bstpNmixPrdyCtrt)}%
        </CategoryData>
        <Text>{formatNumber(category.acmlTrPbmn)}</Text>
      </CategoryInfo>
    </CategoryCardColumn>
  );
};

export default CategoryStock;
