import { Suspense, useState } from 'react';
import { Center } from '@components/Center';
import { categoryImage } from '@features/Stock/category';
import {
  HrTag,
  StockGridRow,
  CategoryGridColumn,
  StockHeader,
  StockHeaderWrapper,
  DividedSection,
} from '@features/Stock/styledComponent';
import RealTimeStock, {
  RealTimeStockFirstRow,
} from '@features/Stock/StockMain/RealTimeStock';
import CategoryStock from '@features/Stock/StockMain/CategoryStock';
import More from '@features/Stock/More';
import { ICategoryStock, IStock } from '@features/Stock/types';
import { useNavigate } from 'react-router-dom';
import Modal from '@features/Stock/SectionStock/Modal';
import useCategoryStockStore from '@store/useCategoryStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import useAuthStore from '@store/useAuthStore';
import FavoriteStockSection from '@features/Stock/StockMain/FavoriteStockSection';
import FavoriteStockSkeleton from '@features/Stock/StockMain/FavoriteStockSkeleton';
import RealTimeStockSkeleton from '@features/Stock/StockMain/RealTimeStockSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import StockMain from '@pages/Stock/StockMain';
import { getCategoryImage } from '@utils/getCategoryImage';

const StockMainPage = () => {
  const { categoryStock } = useCategoryStockStore();
  const { top10Stock } = useTop10StockStore();
  const { isLogin } = useAuthStore();

  const navigate = useNavigate();
  const allStockNavigate = () => {
    navigate('/all-stock');
  };
  const categoryNavigate = () => {
    navigate('/section-stock');
  };

  // 카테고리+관련 주식 관련 모달
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryStock | null>(null);

  const openModal = (category: ICategoryStock) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <ErrorBoundary fallback={<StockMain />}>
      <Center style={{ padding: '1rem' }}>
        {isLogin && (
          <Suspense fallback={<FavoriteStockSkeleton />}>
            <FavoriteStockSection />
          </Suspense>
        )}

        {/* 실시간 차트(top 10) */}
        <DividedSection style={{ marginTop: isLogin ? '1.5rem' : '0rem' }}>
          <StockHeaderWrapper>
            <StockHeader>실시간 차트</StockHeader>
            <More handlClick={allStockNavigate} />
          </StockHeaderWrapper>
          <HrTag />
          <StockGridRow>
            <RealTimeStockFirstRow />
            {top10Stock.length > 0 ? (
              top10Stock?.map((stock: IStock, index: number) => (
                <RealTimeStock key={index} stock={stock} />
              ))
            ) : (
              <RealTimeStockSkeleton />
            )}
          </StockGridRow>
        </DividedSection>

        {/* 주식 카테고리 목록 */}
        <StockHeaderWrapper>
          <StockHeader>카테고리</StockHeader>
          <More handlClick={categoryNavigate} />
        </StockHeaderWrapper>
        <HrTag />
        <CategoryGridColumn>
          {categoryStock
            ?.sort(
              (a: ICategoryStock, b: ICategoryStock) =>
                Math.abs(parseFloat(b.bstpNmixPrdyCtrt)) -
                Math.abs(parseFloat(a.bstpNmixPrdyCtrt))
            )
            .slice(0, 4)
            .map((category: ICategoryStock, index: number) => {
              // 기본 이미지 객체
              const imageUrl = getCategoryImage(
                category.industryName,
                categoryImage
              );
              return (
                <CategoryStock
                  key={index}
                  category={category}
                  imageUrl={imageUrl.url}
                  imageBgColor={imageUrl.bgColor}
                  onClick={() => openModal(category)}
                />
              );
            })}
        </CategoryGridColumn>
      </Center>
      {selectedCategory && (
        <Modal onClose={closeModal} category={selectedCategory} />
      )}
    </ErrorBoundary>
  );
};

export default StockMainPage;
