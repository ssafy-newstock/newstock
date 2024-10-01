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
import WebSocketComponent from '@components/WebSocketComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTop10StockQuery } from '@hooks/useTop10StockQuery';
import { useEffect } from 'react';
import { useAllStockQuery } from '@hooks/useAllStockQuery';
import { useCategoryStockQuery } from '@hooks/useCategoryStockQuery';

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

  const { data: top10Stock } = useTop10StockQuery();
  const { data: allStock } = useAllStockQuery();
  const { data: categoryStock } = useCategoryStockQuery();

  useEffect(() => {
    top10Stock && setTop10Stock(top10Stock.data);
    allStock && setAllStock(allStock.data);
    categoryStock && setCategoryStock(categoryStock.data);
  }, [top10Stock, allStock, categoryStock]);

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
      {/* 토스트 메세지 */}
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
