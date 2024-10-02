import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import useAllStockStore from '@store/useAllStockStore';
import useCategoryStockStore from '@store/useCategoryStockStore';
import useTop10StockStore from '@store/useTop10StockStore';

const WebSocketComponent: React.FC = () => {
  const { setAllStock } = useAllStockStore();
  const { setCategoryStock } = useCategoryStockStore();
  const { updateStock } = useTop10StockStore();

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

  return <></>; // UI 반환 X
};

export default WebSocketComponent;
