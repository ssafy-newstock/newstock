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

export const AllCategoryFirstRow = () => {
  return (
    <CategoryCardRow style={{cursor:'default'}}>
      <Text></Text>
      <Text>카테고리</Text>
      <Text>지수 현재가</Text>
      <Text>지수 전일 대비</Text>
      <Text>지수 등락률</Text>
      <Text>누적 거래 대금(백만)</Text>
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
    <CategoryCardRow onClick={onClick} >
      <Text></Text>
      <div style={{display:'flex', gap:'1rem', justifyContent:'start', alignItems:'center'}}>
        <CategoryImgWrapper backgroundColor={String(imageBgColor)}>
          <CategoryImg src={String(imageUrl)} alt="Category Image" />
        </CategoryImgWrapper>
        <Text>{category.industryName}</Text>
      </div>
      <Text>{category.bstpNmixPrpr}</Text>
      <CategoryData $isPositive={category.bstpNmixPrdyVrss.toString().startsWith('-')}>
        {formatChange(category.bstpNmixPrdyVrss)}
      </CategoryData>
      <CategoryData $isPositive={category.bstpNmixPrdyCtrt.toString().startsWith('-')}>
        {formatChange(category.bstpNmixPrdyCtrt)}%
      </CategoryData>
      <Text>{formatNumber(category.acmlTrPbmn)}</Text>
    </CategoryCardRow>
  );
};

export default AllCategoryStock;
