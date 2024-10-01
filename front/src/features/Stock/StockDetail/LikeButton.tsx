import { authRequest } from '@api/axiosInstance';
import useAuthStore from '@store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFavoriteStockQuery } from '@hooks/useFavortiteStockQuery';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { IFavoriteStock } from '@features/Stock/types';
import { NoneButton } from '@features/Stock/styledComponent';
import { HeartFill } from '@features/Stock/HeartFill';
import { Heart } from '@features/Stock/Heart';

const LikeButton = ({ stockCode }: { stockCode: string }) => {
  const [isDisabled, setIsDisabled] = useState(false);
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
        favoriteStockList.data.some((fav) => fav.stockCode === stockCode)
      );
    }
  }, [favoriteStockList, stockCode]);

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
      toast.info('주식이 관심 목록에서 제거되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['favoriteStockList'] });
      setIsDisabled(false);
    },
  });

  return (
    <>
      {isLogin && (
        <NoneButton
          disabled={isDisabled}
          onClick={() => {
            if (isFavorite) {
              removeFavoriteStock(stockCode);
            } else {
              addFavoriteStock(stockCode);
            }
          }}
        >
          {isFavorite ? <HeartFill /> : <Heart />}
        </NoneButton>
      )}
    </>
  );
};

export default LikeButton;
