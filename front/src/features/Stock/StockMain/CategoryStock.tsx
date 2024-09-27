import { ICategory } from '@features/Stock/types';
import {
  Text,
  CategoryImgWrapper,
  CategoryImgMain,
  CategoryInfo,
  CategoryData,
  CategoryCardColumn,
  TextBoldLarge,
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
      <CategoryImgWrapper $bgColor={imageBgColor.toString()}>
        <CategoryImgMain src={imageUrl.toString()} alt={blueLogo} />
      </CategoryImgWrapper>
      <CategoryInfo>
        {' '}
        <TextBoldLarge>{category.industryName}</TextBoldLarge>
        <CategoryData
          $isPositive={category.bstpNmixPrdyCtrt.toString().startsWith('-')}
        >
          {formatChange(category.bstpNmixPrdyCtrt)}%
        </CategoryData>
        <Text>{formatNumber(category.acmlTrPbmn)}</Text>
      </CategoryInfo>
    </CategoryCardColumn>
  );
};

export default CategoryStock;
