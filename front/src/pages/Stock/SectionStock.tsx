import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Right } from '@components/Right';
import {
  HrTag,
  StockGridRow,
  StockHeader,
} from '@features/Stock/styledComponent';
import { categoryImage } from '@features/Stock/category';
import AllCategoryStock, {
  AllCategoryFirstRow,
} from '@features/Stock/SectionStock/AllCategoryStock';
import { useLocation } from 'react-router-dom';
import { ICategoryStock } from '@features/Stock/types';

const SectionStockPage = () => {
  const location = useLocation();
  const { industryData } = location.state as { industryData : ICategoryStock[] };
  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>전체 카테고리</StockHeader>
        <HrTag />
        <StockGridRow>
          <AllCategoryFirstRow />
          {industryData.map((category, index: number) => {
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
