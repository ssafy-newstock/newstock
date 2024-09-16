import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { categoryImage, categoryStock } from '@features/Stock/category';
import {
  HrTag,
  StockGridColumn,
  StockGridRow,
  CategoryGridColumn,
  StockHeader,
  StockHeaderMore,
} from '@features/Stock/styledComponent';
import FavoriteStock from '@features/Stock/StockMain/FavoriteStock';
import { IStock } from '@features/Stock/types';
import RealTimeStock, {
  RealTimeStockFirstRow,
} from '@features/Stock/StockMain/RealTimeStock';
import CategoryStock from '@features/Stock/StockMain/CategoryStock';
import More from '@features/Stock/More';
import { stockData } from '@features/Stock/stock';
import { RightVacant } from '@components/RightVacant';

const StockMainPage = () => {
  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>관심 종목</StockHeader>
        <HrTag />
        <StockGridColumn>
          {stockData.map((stock: IStock, index: number) => (
            <FavoriteStock key={index} stock={stock} />
          ))}
        </StockGridColumn>

        <StockHeaderMore>실시간 차트</StockHeaderMore>
        <More path="/all-stock" />
        <HrTag />
        <StockGridRow>
          <RealTimeStockFirstRow />
          {stockData.map((stock: IStock, index: number) => (
            <RealTimeStock key={index} stock={stock} />
          ))}
        </StockGridRow>

        <StockHeaderMore>카테고리</StockHeaderMore>
        <More path="/section-stock" />
        <HrTag />
        <CategoryGridColumn>
          {categoryStock
            .sort((a, b) => parseFloat(b.acmlTrPbmn) - parseFloat(a.acmlTrPbmn)) // 누적 거래 대금 순으로 내림차순 정렬
            .slice(0, 3) // 상위 3개만 가져옴
            .map((category, index: number) => {
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
                <CategoryStock
                  key={index}
                  category={category}
                  imageUrl={imageUrl.url}
                  imageBgColor={imageUrl.backgroundColor}
                />
              );
            })}
        </CategoryGridColumn>
      </Center>
      <RightVacant />
    </>
  );
};

export default StockMainPage;
