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
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

  // 웹소켓 초기화 및 구독 설정
  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS('https://newstock.info/api/stock/websocket');
      const stompClient = Stomp.over(socket);
  
      // 재연결 시도를 위한 변수를 선언합니다.
      let isConnected = false;
      let reconnectAttempts = 0;
      const maxReconnectAttempts = 5; // 최대 재연결 시도 횟수
  
      // 웹소켓 연결
      const onConnect = () => {
        isConnected = true;
        reconnectAttempts = 0;
  
        // Top 10 종목 정보 구독
        stompClient.subscribe('/api/sub/stock/info/live', (message) => {
          const newStockPrice = JSON.parse(message.body);
  
          // 도착한 주식 데이터로 상태 업데이트
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
  
      // 웹소켓 연결 실패 시 재연결 시도
      const onError = (error: any) => {
        console.error('WebSocket connection error:', error);
        if (!isConnected && reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts += 1;
          setTimeout(connectWebSocket, 5000); // 5초 후 재연결 시도
        }
      };
  
      // 웹소켓 연결 시도
      stompClient.connect({}, onConnect, onError);
  
      return stompClient;
    };
  
    let stompClient = connectWebSocket();
  
    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, [setTop10Stock, setCategoryStock, setAllStock]);
  
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
    return <div>Loading...</div>;
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
