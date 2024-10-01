import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import {
  DetailPageButton,
  DividedSection,
  HrTag,
  SpanTag,
  StckPrice,
  StockImageDetail,
  StockPrev,
  StockTitle,
  Text,
  TextLarge,
  NoneButton,
} from '@features/Stock/styledComponent';
import { IFavoriteStock, IStock } from '@features/Stock/types';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { Outlet, useLocation } from 'react-router-dom';
import blueLogo from '@assets/Stock/blueLogo.png';
import TradeForm from '@features/Stock/StockDetail/TradeForm';
import { RightVacant } from '@components/RightVacant';
import { authRequest } from '@api/axiosInstance';
import { HeartFill } from '@features/Stock/HeartFill';
import { Heart } from '@features/Stock/Heart';
import useAuthStore from '@store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import {
  DivTag,
  FlexBetweenEnd,
  FlexBetweenStart,
  FlexGap,
  FlexGapEnd,
} from '@components/styledComponent';
import { useFavoriteStockQuery } from '@hooks/useFavortiteStockQuery';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ChartLink from '@features/Stock/StockDetail/ChartLink';

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();
  const [isDisabled, setIsDisabled] = useState(false);

  // 주식 상세 정보
  const stockDetail =
    allStock?.find((s) => s.stockCode === stock.stockCode) ||
    top10Stock?.find((s) => s.stockCode === stock.stockCode);

  // 로그인 여부 확인
  const { isLogin } = useAuthStore();

  // 관심 종목 관련 API 호출
  const { data: favoriteStockList } = useFavoriteStockQuery({
    // 초기 데이터 설정 -> 타입 설정시 undefined 고려할 필요 없어짐
    // initialData: [],
    enabled: isLogin,
    onSuccess: () => {
      toast.success('관심 주식 목록을 불러왔습니다.');
    },
    onError: () => {
      toast.error('관심 주식 목록을 불러오지 못했습니다.');
    },
  });
  // 관심 종목 상태 관리
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoriteStockList?.data) {
      setIsFavorite(
        favoriteStockList.data.some((fav) => fav.stockCode === stock.stockCode)
      );
    }
  }, [favoriteStockList, stock.stockCode]);

  const queryClient = useQueryClient();

  // 좋아요 주식 추가 mutation
  const { mutate: addFavoriteStock } = useMutation<
    void,
    Error,
    string,
    { previousFavoriteStockList?: IFavoriteStock[] }
  >({
    mutationFn: async (stockCode: string) => {
      setIsDisabled(true);
      await authRequest.post(`/stock/favorite/${stockCode}`);
    },
    onMutate: async (stockCode) => {
      await queryClient.cancelQueries({ queryKey: ['favoriteStockList'] });
      const previousFavoriteStockList = queryClient.getQueryData<
        IFavoriteStock[]
      >(['favoriteStockList']);

      queryClient.setQueryData(['favoriteStockList'], (old: any) => ({
        ...old,
        data: [
          ...old.data,
          { stockCode }, // 추가된 주식 코드
        ],
      }));

      return { previousFavoriteStockList };
    },
    onError: (_err, _stockCode, context) => {
      // 오류 발생 시 이전 상태로 복구
      if (context?.previousFavoriteStockList) {
        queryClient.setQueryData(
          ['favoriteStockList'],
          context.previousFavoriteStockList
        );
      }
      toast.error('주식 좋아요 추가에 실패했습니다.');
      setIsDisabled(false);
    },
    onSuccess: () => {
      toast.success('주식이 관심 목록에 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['favoriteStockList'] });
      setIsDisabled(false);
    },
  });

  // 좋아요 주식 제거 mutation
  const { mutate: removeFavoriteStock } = useMutation<
    void,
    Error,
    string,
    { previousFavoriteStockList?: IFavoriteStock[] }
  >({
    mutationFn: async (stockCode: string) => {
      setIsDisabled(true);
      await authRequest.delete(`/stock/favorite/${stockCode}`);
    },
    onMutate: async (stockCode) => {
      await queryClient.cancelQueries({ queryKey: ['favoriteStockList'] });
      const previousFavoriteStockList = queryClient.getQueryData<
        IFavoriteStock[]
      >(['favoriteStockList']);

      queryClient.setQueryData(['favoriteStockList'], (old: any) => ({
        ...old,
        data: old.data.filter(
          (fav: IFavoriteStock) => fav.stockCode !== stockCode
        ), // 제거된 주식 코드
      }));

      return { previousFavoriteStockList };
    },
    onError: (_err, _stockCode, context) => {
      // 오류 발생 시 이전 상태로 복구
      if (context?.previousFavoriteStockList) {
        queryClient.setQueryData(
          ['favoriteStockList'],
          context.previousFavoriteStockList
        );
      }
      toast.error('주식 좋아요 제거에 실패했습니다.');
      setIsDisabled(false);
    },
    onSuccess: () => {
      toast.success('주식이 관심 목록에서 제거되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['favoriteStockList'] });
      setIsDisabled(false);
    },
  });

  // 유사도 버튼 버튼 표시 여부
  const showButton = location.pathname.includes('daily-chart');

  // 주식 종목 이미지
  const getStockImageUrl = () => {
    // 이미지 URL 생성
    const url = `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`;
    return url;
  };

  return (
    <>
      <LeftStock />
      <Center style={{ padding: '1rem' }}>
        <FlexBetweenEnd>
          <FlexGapEnd $gap="1rem">
            <StockTitle>
              <StockImageDetail
                src={getStockImageUrl()}
                onError={(e) => (e.currentTarget.src = blueLogo)} // 기본 이미지 설정
                alt=""
              />
              <DivTag>
                <SpanTag>코스피 {stock.stockCode}</SpanTag>
                <TextLarge>{stockDetail?.stockName}</TextLarge>
              </DivTag>
            </StockTitle>
            <StckPrice>
              {stockDetail && formatChange(formatNumber(stockDetail.stckPrpr))}
              원
            </StckPrice>
            <StockPrev
              $isPositive={
                stockDetail?.prdyVrss.toString().startsWith('-') ?? false
              }
            >
              <SpanTag>어제보다</SpanTag>{' '}
              {stockDetail && formatChange(formatNumber(stockDetail.prdyVrss))}
              원 ({stockDetail?.prdyCtrt}
              %)
            </StockPrev>
          </FlexGapEnd>

          <FlexGap $gap="1rem">
            {isLogin && (
              <NoneButton
                disabled={isDisabled}
                onClick={() => {
                  if (isFavorite) {
                    removeFavoriteStock(stock.stockCode);
                  } else {
                    addFavoriteStock(stock.stockCode);
                  }
                }}
              >
                {isFavorite ? <HeartFill /> : <Heart />}
              </NoneButton>
            )}
            {showButton && <DetailPageButton>유사도 분석</DetailPageButton>}
          </FlexGap>
        </FlexBetweenEnd>
        <HrTag />
        <FlexBetweenStart>
          <ChartLink stock={stock} />
          <Text style={{ marginRight: '1rem' }}>{stock.stockIndustry}</Text>
        </FlexBetweenStart>
        <DividedSection>
          <Outlet />
        </DividedSection>
        <TradeForm
          price={stockDetail?.stckPrpr ?? stock.stckPrpr}
          stockCode={stock.stockCode}
        />
      </Center>
      <RightVacant />
    </>
  );
};

export default StockDetailPage;
