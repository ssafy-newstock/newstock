import { Center } from '@components/Center';
import {
  HrTag,
  StockGridRow,
  StockHeader,
  ButtonWrapper,
  SortButton,
  DividedSection,
} from '@features/Stock/styledComponent';
import { categoryImage } from '@features/Stock/category';
import AllCategoryStock, {
  AllCategoryFirstRow,
} from '@features/Stock/SectionStock/AllCategoryStock';
import { ICategoryStock } from '@features/Stock/types';
import Modal from '@features/Stock/SectionStock/Modal';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useCategoryStockStore from '@store/useCategoryStockStore';

// 밑줄 스타일
const Underline = styled.div<{ $activeIndex: number }>`
  position: absolute;
  bottom: -0.5rem; /* 밑줄 위치 조정 */
  left: ${({ $activeIndex }) =>
    $activeIndex * 5.2 + 0.5}rem; /* 각 버튼의 위치에 따라 조정 */
  width: 3.5rem; /* 버튼 너비에 맞춰 조정 */
  height: 0.2rem;
  background-color: black;
  transition: left 0.3s ease-in-out; /* 부드러운 애니메이션 */
  background-color: ${({ theme }) => theme.textColor};
`;

const SectionStockPage = () => {
  const { categoryStock } = useCategoryStockStore();
  // 모달 관련
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryStock | null>(null);

  // 정렬 상태 관리
  const [sortedCategoryStock, setSortedCategoryStock] = useState<
    ICategoryStock[] | null
  >(null);

  // 현재 정렬 키와 방향 저장
  const [sortKey, setSortKey] = useState<keyof ICategoryStock>('bstpNmixPrpr');
  const [isAscending, setIsAscending] = useState<boolean>(false);

  // 밑줄 표시할 버튼 인덱스 상태
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

  const openModal = (category: ICategoryStock) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  // 정렬 함수
  const sortData = (
    key: keyof ICategoryStock,
    ascending: boolean = false,
    index: number
  ) => {
    setActiveButtonIndex(index); // 선택된 버튼 인덱스 저장
    setSortKey(key);
    setIsAscending(ascending);
  };

  // Effect: categoryStock이 변경될 때마다 정렬 수행
  useEffect(() => {
    if (categoryStock) {
      const sortedData = [...categoryStock].sort((a, b) => {
        const valueA = parseFloat(a[sortKey]);
        const valueB = parseFloat(b[sortKey]);

        if (!isNaN(valueA) && !isNaN(valueB)) {
          return isAscending ? valueA - valueB : valueB - valueA;
        }
        return 0; // 숫자가 아닌 값은 무시
      });
      setSortedCategoryStock(sortedData);
    }
  }, [categoryStock, sortKey, isAscending]); // categoryStock, sortKey, isAscending이 변경될 때마다 실행

  // 렌더링할 데이터 선택
  const dataToRender = sortedCategoryStock || categoryStock;

  return (
    <>
      <Center style={{ padding: '1rem' }}>
        <StockHeader>전체 카테고리</StockHeader>
        <HrTag />
        {/* 정렬 버튼들 */}
        <ButtonWrapper>
          <SortButton onClick={() => sortData('bstpNmixPrpr', false, 0)}>
            지수 현재
          </SortButton>
          <SortButton onClick={() => sortData('bstpNmixPrdyCtrt', false, 1)}>
            지수 등락
          </SortButton>
          <SortButton onClick={() => sortData('acmlTrPbmn', false, 2)}>
            거래 대금
          </SortButton>

          {/* 밑줄 요소 */}
          <Underline $activeIndex={activeButtonIndex} />
        </ButtonWrapper>

        <DividedSection>
          <StockGridRow>
            <AllCategoryFirstRow />
              {dataToRender?.map((category: ICategoryStock, index: number) => {
                // 기본 이미지 객체
                const defaultImage = {
                  url: 'default-image-url',
                  bgColor: 'default-bg-color',
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
