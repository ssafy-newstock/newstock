import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Right } from '@components/Right';
import {
  HrTag,
  StockGridRow,
  StockHeader,
} from '@features/Stock/styledComponent';
import { categoryImage, categoryStock } from '@features/Stock/category';
import AllCategoryStock, {
  AllCategoryFirstRow,
} from '@features/Stock/SectionStock/AllCategoryStock';

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
            // 기본 이미지 객체
            const defaultImage = {
              url: 'default-image-url',
              backgroundColor: 'default-bg-color',
            };
            // 카테고리 이미지 객체를 찾고, 없으면 기본 이미지 사용
            const imageUrl =
              category.industryName in categoryImage
                ? categoryImage[
                    category.industryName as keyof typeof categoryImage
                  ]
                : defaultImage; // 기본 이미지 객체로 처리
            return (
              <AllCategoryStock
                key={index}
                category={category}
                imageUrl={imageUrl.url}
                imageBgColor={imageUrl.backgroundColor}
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
