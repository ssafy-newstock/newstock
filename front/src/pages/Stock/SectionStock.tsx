import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Right } from '@components/Right';
import {
  HrTag,
  StockGridRow,
  StockHeader,
} from '@features/Stock/styledComponent';
import { categoryImage, categoryStock } from '@features/Stock/category';
import AllCategoryStock, { AllCategoryFirstRow } from '@features/Stock/\bSectionStock/AllCategoryStock';

const SectionStockPage = () => {
  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>전체 카테고리</StockHeader>
        <HrTag />
        <StockGridRow>
          <AllCategoryFirstRow />
          {categoryStock.map((category, index: number) => {
            const imageUrl =
              category.industryName in categoryImage
                ? categoryImage[
                    category.industryName as keyof typeof categoryImage
                  ]
                : 'default-image'; // 기본 이미지 처리
            return (
              <AllCategoryStock
                key={index}
                category={category}
                imageUrl={imageUrl}
              />
            );
          })}
        </StockGridRow>
      </Center>
      <Right />
    </>
  );
};

export default SectionStockPage;
