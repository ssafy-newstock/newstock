import { ICategory } from '@features/Stock/types';
import {
  Text,
  CategoryImgWrapper,
  CategoryImg,
  CategoryData,
  CategoryCardRow,
  TextBold,
} from '@features/Stock/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { FlexGapStastCenter } from '@components/styledComponent';

export const AllCategoryFirstRow = () => {
  return (
    <CategoryCardRow style={{ cursor: 'default' }}>
      <TextBold>카테고리</TextBold>
      <TextBold>지수 현재가</TextBold>
      <TextBold>지수 전일 대비</TextBold>
      <TextBold>지수 등락률</TextBold>
      <TextBold>누적 거래 대금(백만)</TextBold>
    </CategoryCardRow>
  );
};

const AllCategoryStock: React.FC<ICategory> = ({
  category,
  imageUrl,
  imageBgColor,
  onClick,
}) => {
  return (
    <CategoryCardRow onClick={onClick}>
      <FlexGapStastCenter $gap="1rem">
          <CategoryImgWrapper $bgColor={imageBgColor}>
            <CategoryImg src={String(imageUrl)} alt="Category Image" />
          </CategoryImgWrapper>
          <Text>{category.industryName}</Text>
      </FlexGapStastCenter>
      <Text>{category.bstpNmixPrpr}</Text>
      <CategoryData
        $isPositive={category.bstpNmixPrdyVrss.toString().startsWith('-')}
      >
        {formatChange(category.bstpNmixPrdyVrss)}
      </CategoryData>
      <CategoryData
        $isPositive={category.bstpNmixPrdyCtrt.toString().startsWith('-')}
      >
        {formatChange(category.bstpNmixPrdyCtrt)}%
      </CategoryData>
      <Text>{formatNumber(category.acmlTrPbmn)}</Text>
    </CategoryCardRow>
  );
};

export default AllCategoryStock;
