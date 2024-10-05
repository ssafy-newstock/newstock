import { Center } from '@components/Center';
import {
  HrTag,
  StockGridRow,
  StockHeader,
  ButtonWrapper,
  CategorySortButton,
  DividedSection,
} from '@features/Stock/styledComponent';
import { categoryImage } from '@features/Stock/category';
import AllCategoryStock, {
  AllCategoryFirstRow,
} from '@features/Stock/SectionStock/AllCategoryStock';
import { ICategoryStock } from '@features/Stock/types';
import Modal from '@features/Stock/SectionStock/Modal';
import { useState, useEffect } from 'react';
import useCategoryStockStore from '@store/useCategoryStockStore';
import { getCategoryImage } from '@utils/getCategoryImage';

const SectionStockPage = () => {
  const { categoryStock } = useCategoryStockStore();
  const [selectedCategory, setSelectedCategory] = useState<ICategoryStock | null>(null);
  const [sortedCategoryStock, setSortedCategoryStock] = useState<ICategoryStock[] | null>(null);
  const [sortKey, setSortKey] = useState<keyof ICategoryStock>('bstpNmixPrpr');

  const sortButtons = [
    { key: 'bstpNmixPrpr', label: '지수 현재' },
    { key: 'bstpNmixPrdyCtrt', label: '지수 등락' },
    { key: 'acmlTrPbmn', label: '거래 대금' }
  ] as const;

  useEffect(() => {
    if (categoryStock) {
      const sortedData = [...categoryStock].sort((a, b) => {
        const valueA = parseFloat(a[sortKey]);
        const valueB = parseFloat(b[sortKey]);

        if (!isNaN(valueA) && !isNaN(valueB)) {
          return valueB - valueA; // 항상 내림차순 정렬
        }
        return 0;
      });
      setSortedCategoryStock(sortedData);
    }
  }, [categoryStock, sortKey]);

  const openModal = (category: ICategoryStock) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  const dataToRender = sortedCategoryStock || categoryStock;

  return (
    <>
      <Center style={{ padding: '1rem' }}>
        <StockHeader>전체 카테고리</StockHeader>
        <HrTag />
        <ButtonWrapper>
          {sortButtons.map((button) => (
            <CategorySortButton
              key={button.key}
              $isActive={sortKey === button.key}
              onClick={() => setSortKey(button.key)}
            >
              {button.label}
            </CategorySortButton>
          ))}
        </ButtonWrapper>

        <DividedSection>
          <StockGridRow>
            <AllCategoryFirstRow />
            {dataToRender?.map((category: ICategoryStock, index: number) => {
              const imageUrl = getCategoryImage(
                category.industryName,
                categoryImage
              );
              return (
                <AllCategoryStock
                  key={index}
                  category={category}
                  imageUrl={imageUrl.url}
                  imageBgColor={imageUrl.bgColor}
                  onClick={() => openModal(category)}
                />
              );
            })}
          </StockGridRow>
        </DividedSection>
      </Center>
      {selectedCategory && (
        <Modal onClose={closeModal} category={selectedCategory} />
      )}
    </>
  );
};

export default SectionStockPage;