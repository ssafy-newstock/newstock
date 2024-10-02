import { Suspense, useMemo, useState } from 'react';
import { Center } from '@components/Center';
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
import { ICategoryStock, IFavoriteStock, IStock } from '@features/Stock/types';
import { useNavigate } from 'react-router-dom';
import Modal from '@features/Stock/SectionStock/Modal';
import useCategoryStockStore from '@store/useCategoryStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { useQuery } from '@tanstack/react-query';
import { authRequest } from '@api/axiosInstance';
import useAllStockStore from '@store/useAllStockStore';
import useAuthStore from '@store/useAuthStore';
import LoadingSpinner from '@components/LoadingSpinner';
import { toast } from 'react-toastify';

// 새로운 컴포넌트: FavoriteStockSection
const FavoriteStockSection = () => {
  const { isLogin } = useAuthStore();
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const { data: favoriteStockList } = useQuery({
    queryKey: ['favoriteStockList'],
    queryFn: async () => {
      const response = await authRequest.get('/stock/favorite');
      toast.success('관심 주식 목록을 불러왔습니다.');
      return response.data.data;
    },
    enabled: isLogin,
  });
  // favoriteStock의 stockId를 Set으로 만들어 빠른 검색 가능
  const favoriteStockCode: Set<string> = useMemo(() => {
    return isLogin
      ? new Set(
          favoriteStockList?.map((stock: IFavoriteStock) => stock.stockCode)
        )
      : new Set();
  }, [isLogin, favoriteStockList]);

  // 관심 주식 목록 필터링
  const filterFavoriteStocks = (
    stocks: IStock[],
    favoriteStockCode: Set<string>
  ) => {
    return stocks?.filter((stock) => favoriteStockCode.has(stock.stockCode));
  };

  // 관심 주식 목록
  const favoriteStock = useMemo(() => {
    if (!isLogin) return [];
    const favoriteAllStock = filterFavoriteStocks(allStock, favoriteStockCode);
    const favoriteTop10Stock = filterFavoriteStocks(
      top10Stock,
      favoriteStockCode
    );
    return [...favoriteAllStock, ...favoriteTop10Stock];
  }, [isLogin, allStock, top10Stock, favoriteStockCode]);

  if (!isLogin) return null;

  return (
    <>
      <StockHeader>관심 종목</StockHeader>
      <HrTag />
      {favoriteStock?.length === 0 ? (
        <TextCenter>상세 페이지에서 관심 종목을 추가해 보세요.</TextCenter>
      ) : (
        <StockGridColumn>
          {favoriteStock?.map((stock: IStock, index: number) => (
            <FavoriteStock key={index} stock={stock} />
          ))}
        </StockGridColumn>
      )}
    </>
  );
};

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

  // 리액트 쿼리 분리 하기
  // const getList = async()=>{
  //   const res = await axios.get('/api/example')
  //   return res.data
  // }

  // export const useGetList = ()=>{
  //   useQuery({
  //     queryKey:['getList'],
  //     queryFn:getList
  //   })
  // }
  // const {data} = useGetList()

  return (
    <>
      <Center style={{ padding: '1rem' }}>
        <Suspense fallback={<LoadingSpinner />}>
          <FavoriteStockSection />
        </Suspense>

        {/* 실시간 차트(top 10) */}
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>

        {/* 주식 카테고리 목록 */}
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </Center>
      {selectedCategory && (
        <Modal onClose={closeModal} category={selectedCategory} />
      )}
    </>
  );
};

export default StockMainPage;
