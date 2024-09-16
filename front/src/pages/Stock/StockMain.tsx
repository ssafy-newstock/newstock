import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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
import RealTimeStock, {
  RealTimeStockFirstRow,
} from '@features/Stock/StockMain/RealTimeStock';
import CategoryStock from '@features/Stock/StockMain/CategoryStock';
import More from '@features/Stock/More';
import { IStock } from '@features/Stock/types';
import { RightVacant } from '@components/RightVacant';
import { stockData } from '@features/Stock/stock';

const StockMainPage = () => {
  const queryClient = useQueryClient();

  // 웹소켓 초기화 및 구독 설정
  useEffect(() => {
    const socket = new SockJS('http://newstock.info/api/stock/websocket');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      // Top 10 종목 정보 구독
      stompClient.subscribe('/sub/stock/info/live', (message) => {
        const updatedStockData = JSON.parse(message.body);
        queryClient.setQueryData(
          { queryKey: ['top10StockData'] },
          updatedStockData
        );
      });

      // 산업군 정보 구독 (10분 단위 갱신)
      stompClient.subscribe('/sub/stock/industry/info', (message) => {
        const updatedIndustryData = JSON.parse(message.body);
        queryClient.setQueryData(
          { queryKey: ['industryData'] },
          updatedIndustryData
        );
      });

      // 코스피 전 종목 정보 구독 (30~40초 단위 갱신)
      stompClient.subscribe('/sub/stock/info', (message) => {
        const updatedStockData = JSON.parse(message.body);
        queryClient.setQueryData(
          { queryKey: ['allStockData'] },
          updatedStockData
        );
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, [queryClient]);

  // 최초 데이터 조회 - axios 사용
  const { data: top10StockData } = useQuery({
    queryKey: ['top10StockData'],
    queryFn: async () => {
      const response = await axios.get(
        'http://newstock.info/api/stock/price-list/live'
      );
      return response.data;
    },
  });

  const { data: industryData } = useQuery({
    queryKey: ['industryData'],
    queryFn: async () => {
      const response = await axios.get(
        'http://newstock.info/api/stock/industry-list'
      );
      return response.data;
    },
  });

  const { data: allStockData } = useQuery({
    queryKey: ['allStockData'],
    queryFn: async () => {
      const response = await axios.get(
        'http://newstock.info/api/stock/price-list'
      );
      return response.data;
    },
  });

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
