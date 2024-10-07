import { useEffect, useState } from 'react';

interface News {
  title: string;
  upload_datetime: string;
  media: string;
  thumbnail?: string;
}

interface WebSocketResponse {
  related_news?: News[];
  // 다른 필요한 속성들 추가
}

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [response, setResponse] = useState<string>('');
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => {
      console.log('News Ai WebSocket is connected.');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      try {
        const jsonMessage: WebSocketResponse = JSON.parse(message);
        console.log('Received message:', jsonMessage);
        if (jsonMessage.related_news) {
          setNews(jsonMessage.related_news);
        } else {
          setResponse((prev) => prev + message);
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
        setResponse((prev) => prev + message);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('News Ai WebSocket is closed now.');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: object) => {
    console.log('Sending message:', message);
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  return { response, news, sendMessage };
};

export default useWebSocket;
