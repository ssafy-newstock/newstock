import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { lightTheme, darkTheme } from '@styles/theme';
import { useThemeStore } from '@store/themeStore';
import Navbar from '@components/Navbar';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore';
import useCategoryStockStore from '@store/useCategoryStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingPage from '@components/LodingPage';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Main = styled.div`
  padding-left: 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

const App = () => {
  const { theme } = useThemeStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const { setAllStock } = useAllStockStore();
  const { setCategoryStock } = useCategoryStockStore();
  const { setTop10Stock, updateStock } = useTop10StockStore();

  // 재연결 타이머 관리
  const stompClientRef = useRef<Client | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  // 웹소켓 초기화 및 구독 설정
  const connectWebSocket = (): Client => {
    const socket = new SockJS('https://newstock.info/api/stock/websocket');
    const stompClient = Stomp.over(socket);

    // 웹소켓 연결
    const onConnect = () => {
      console.log('WebSocket Connected');

      // 실시간 top 10 주식 정보 구독
      stompClient.subscribe('/api/sub/stock/info/live', (message) => {
        const newStockPrice = JSON.parse(message.body);
        updateStock(newStockPrice);
      });

      // 산업군 정보 구독 (10분 단위 갱신)
      stompClient.subscribe('/api/sub/stock/industry/info', (message) => {
        const updatedIndustryData = JSON.parse(message.body);
        setCategoryStock(updatedIndustryData);
      });
      // 코스피 전 종목 정보 구독 (30~40초 단위 갱신)
      stompClient.subscribe('/api/sub/stock/info', (message) => {
        const updatedStockData = JSON.parse(message.body);
        setAllStock(updatedStockData);
      });
    };

    // 웹소켓 연결 에러
    const onError = (error: any) => {
      console.error('WebSocket connection error:', error);
      reconnect();
    };
    stompClient.connect({}, onConnect, onError);
    return stompClient;
  };
  // 재연결 함수
  const reconnect = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = window.setTimeout(() => {
      console.log('Attempting to reconnect...');
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log('Disconnected before reconnecting');
        });
      }
      stompClientRef.current = connectWebSocket();
    }, 5000);
  };

  useEffect(() => {
    stompClientRef.current = connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current !== null) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log('Disconnected on cleanup');
        });
      }
    };
  }, []);

  // 최초 데이터 조회 - React Query 사용
  const { isLoading: isTop10StockLoading } = useQuery({
    queryKey: ['top10StockData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://newstock.info/api/stock/price-list/live'
      );
      setTop10Stock(response.data.data);
      return response.data.data;
    },
  });

  const { isLoading: isIndustryLoading } = useQuery({
    queryKey: ['industryData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://newstock.info/api/stock/industry-list'
      );
      setCategoryStock(response.data.data);
      return response.data.data;
    },
  });

  const { isLoading: isAllStockLoading } = useQuery({
    queryKey: ['allStockData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://newstock.info/api/stock/price-list'
      );
      setAllStock(response.data.data);
      return response.data.data;
    },
  });

  if (isTop10StockLoading || isIndustryLoading || isAllStockLoading) {
    return <LoadingPage />;
  }
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Container>
        <Navbar />
        <Main>
          <Header />
          <Content>
            <Outlet />
          </Content>
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default App;
