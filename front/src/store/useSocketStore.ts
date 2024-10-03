import { create } from 'zustand';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface SocketStore {
  client: Stomp.Client | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const useSocketStore = create<SocketStore>((set, get) => {
  let client: Stomp.Client | null = null;

  const connectSocket = () => {
    if (client && client.connected) {
      console.log('WebSocket already connected');
      return; // 이미 연결된 경우 재연결 방지
    }

    const socket = new SockJS('https://newstock.info/api/member/websocket');
    client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log('WebSocket connected');
        set({ client });
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );
  };

  const disconnectSocket = () => {
    const { client } = get();
    if (client && client.connected) {
      client.disconnect(() => {
        console.log('WebSocket disconnected');
        set({ client: null });
      });
    }
  };

  return {
    client,
    connectSocket,
    disconnectSocket,
  };
});

export default useSocketStore;
