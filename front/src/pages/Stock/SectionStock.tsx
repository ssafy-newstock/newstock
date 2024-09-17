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
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ICategoryStock } from '@features/Stock/types';
import Modal from '@features/Stock/SectionStock/Modal';
import { useState } from 'react';

const SectionStockPage = () => {
  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategoryStock | null>(null);

  const openModal = (category: ICategoryStock) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const { data: industryData, isLoading: isIndustryLoading } = useQuery({
    queryKey: ['industryData'],
    queryFn: async () => {
      const response = await axios.get(
        'http://newstock.info/api/stock/industry-list'
      );
      console.log(response.data);

      return response.data;
    },
  });

  if (isIndustryLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>전체 카테고리</StockHeader>
        <HrTag />
        <StockGridRow>
          <AllCategoryFirstRow />
          {industryData?.data.map((category: ICategoryStock, index: number) => {
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
                onClick={() => openModal(category)}
              />
            );
          })}
        </StockGridRow>
      </Center>
      <Right />
      {isModalOpen && selectedCategory && (
        <Modal onClose={closeModal} category={selectedCategory} />
      )}
    </>
  );
};

export default SectionStockPage;
