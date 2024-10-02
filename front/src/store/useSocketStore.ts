import { create } from 'zustand';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const useSocketStore = create(() => {
  const socket = new SockJS('https://newstock.info/api/member/websocket');
  const client = Stomp.over(socket);

  client.connect({}, () => {
    console.log('WebSocket connected');
  });

  return {
    client,
  };
});

export default useSocketStore;
