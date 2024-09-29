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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingPage from '@components/LodingPage';
import WebSocketComponent from '@components/WebSocketComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const { setTop10Stock } = useTop10StockStore();

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

  const isLoading =
    isTop10StockLoading || isIndustryLoading || isAllStockLoading;

  if (isLoading) {
    return <LoadingPage />;
  }

  //   에러 처리 ErroBoundary, Suspense 사용
  //   <ErrorBoundary fallback=<ErrorComponent/>
  //  <Suspense fallback=<Skeleton/>
  //  <component/>
  //  </Suspense>
  //  <ErrorBoundary>

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
