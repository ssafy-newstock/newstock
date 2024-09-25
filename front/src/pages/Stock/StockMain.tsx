import { useState } from 'react';
import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { categoryImage } from '@features/Stock/category';
import {
  HrTag,
  StockGridColumn,
  StockGridRow,
  CategoryGridColumn,
  StockHeader,
  StockHeaderWrapper,
  DividedSection,
  TextCenter,
} from '@features/Stock/styledComponent';
import FavoriteStock from '@features/Stock/StockMain/FavoriteStock';
import RealTimeStock, {
  RealTimeStockFirstRow,
} from '@features/Stock/StockMain/RealTimeStock';
import CategoryStock from '@features/Stock/StockMain/CategoryStock';
import More from '@features/Stock/More';
import { ICategoryStock, IStock } from '@features/Stock/types';
import { RightVacant } from '@components/RightVacant';
// import { stockData } from '@features/Stock/stock';
import { useNavigate } from 'react-router-dom';
import Modal from '@features/Stock/SectionStock/Modal';
import useCategoryStockStore from '@store/useCategoryStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@api/axiosInstance';
import useAllStockStore from '@store/useAllStockStore';
import useAuthStore from '@store/useAuthStore';

interface favoriteStock {
  stockFavoriteId: number;
  stockId: number;
  stockCode: string;
  stockName: string;
}

const StockMainPage = () => {
  const { categoryStock } = useCategoryStockStore();
  const { top10Stock } = useTop10StockStore();
  const { allStock } = useAllStockStore();
  const { isLogin } = useAuthStore();

  const navigate = useNavigate();
  const allStockNavigate = () => {
    navigate('/all-stock');
  };
  const categoryNavigate = () => {
    navigate('/section-stock');
  };

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryStock | null>(null);

  const openModal = (category: ICategoryStock) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  // 관심 주식 목록 조회
  const { data: favoriteStockList, isLoading: isFavoriteStockLoading } =
    useQuery({
      queryKey: ['favoriteStockList'],
      queryFn: async () => {
        const response = await axiosInstance.get('/api/stock/favorite');
        return response.data.data;
      },
      enabled: isLogin,
    });

  // favoriteStock의 stockId를 Set으로 만들어 빠른 검색 가능
  const favoriteStockCode = isLogin
    ? new Set(favoriteStockList?.map((stock: favoriteStock) => stock.stockCode))
    : new Set();

  const favoriteAllStock = isLogin
    ? allStock?.filter((stock) => {
        return favoriteStockCode.has(stock.stockCode);
      })
    : [];

  const favoriteTop10Stock = isLogin
    ? top10Stock?.filter((stock) => {
        return favoriteStockCode.has(stock.stockCode);
      })
    : [];

  const favoriteStock = isLogin
    ? favoriteAllStock?.concat(favoriteTop10Stock)
    : [];

  if (isFavoriteStockLoading && isLogin) {
    return <div>Loading...</div>; // 또는 로딩 컴포넌트
  }

  return (
    <>
      <LeftStock />
      <Center style={{ padding: '1rem' }}>
        {isLogin ? (
          <>
            {' '}
            <StockHeader>관심 종목</StockHeader>
            <HrTag />
            {/* 관심 종목이 없을 경우 */}
            {favoriteStock?.length === 0 && <TextCenter>상세 페이지에서 관심 종목을 추가해 보세요.</TextCenter>}
            <StockGridColumn>
              {favoriteStock?.map((stock: IStock, index: number) => (
                <FavoriteStock key={index} stock={stock} />
              ))}
            </StockGridColumn>
          </>
        ) : (
          <></>
        )}

        <DividedSection style={{ marginTop: isLogin ? '1.5rem' : '0rem' }}>
          <StockHeaderWrapper>
            <StockHeader>실시간 차트</StockHeader>
            <More handlClick={allStockNavigate} />
          </StockHeaderWrapper>
          <HrTag />
          <StockGridRow>
            <RealTimeStockFirstRow />
            {top10Stock?.map((stock: IStock, index: number) => (
              <RealTimeStock key={index} stock={stock} />
            ))}
          </StockGridRow>
        </DividedSection>

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
      <RightVacant />
      {isModalOpen && selectedCategory && (
        <Modal onClose={closeModal} category={selectedCategory} />
      )}
    </>
  );
};

export default StockMainPage;
