import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { lightTheme, darkTheme } from '@styles/theme';
import { useThemeStore } from '@store/themeStore';
// import Navbar from '@components/Navbar';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore';
import useCategoryStockStore from '@store/useCategoryStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { useQuery } from '@tanstack/react-query';
import WebSocketComponent from '@components/WebSocketComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '@api/axiosInstance';
import { RightVacant } from '@components/RightVacant';
import StockModal from '@features/MyStockModal/StockModal';
import { useState } from 'react';

// const Container = styled.div`
//   display: flex;
//   width: 100%;
//   height: 100vh;
// `;

const Main = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%; /* 기본 너비는 100%로 설정 */
  height: 100vh;
  transition: width 0.3s ease; /* right 대신 width에 transition 적용 */
`;

const Content = styled.div<{ isOpen: boolean }>`
  display: flex;
  height: 100%;
  flex-direction: row;
  width: ${({ isOpen }) => (isOpen ? 'calc(100% - 360px)' : '100%')};
  transition: right 0.3s ease;
`;

const App = () => {
  const { theme } = useThemeStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const { setAllStock } = useAllStockStore();
  const { setCategoryStock } = useCategoryStockStore();
  const { setTop10Stock } = useTop10StockStore();
  const [isOpen, setIsOpen] = useState(false);
  // 최초 데이터 조회 - React Query 사용
  useQuery({
    queryKey: ['top10StockData'],
    queryFn: async () => {
      const response = await axiosInstance.get('/stock/price-list/live');
      setTop10Stock(response.data.data);
      return response.data.data;
    },
  });

  useQuery({
    queryKey: ['industryData'],
    queryFn: async () => {
      const response = await axiosInstance.get('/stock/industry-list');
      setCategoryStock(response.data.data);
      return response.data.data;
    },
  });

  useQuery({
    queryKey: ['allStockData'],
    queryFn: async () => {
      const response = await axiosInstance.get('/stock/price-list');
      setAllStock(response.data.data);
      return response.data.data;
    },
  });

  //   에러 처리 ErroBoundary, Suspense 사용
  //   <ErrorBoundary fallback=<ErrorComponent/>
  //  <Suspense fallback=<Skeleton/>
  //  <component/>
  //  </Suspense>
  //  <ErrorBoundary>

  // Modal 열기/닫기 기능 추가
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Main isOpen={isOpen}>
        <Header isOpen={isOpen} />
        <Content isOpen={isOpen}>
          <Outlet />
          {!isOpen && <RightVacant />}
        </Content>
        <StockModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </Main>
      {/* 웹소켓 연결 */}
      <WebSocketComponent />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={false}
      />
    </ThemeProvider>
  );
};

export default App;
