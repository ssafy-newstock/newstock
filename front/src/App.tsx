import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { lightTheme, darkTheme } from '@styles/theme';
import { useThemeStore } from '@store/themeStore';
import Header from '@components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore';
import useCategoryStockStore from '@store/useCategoryStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import WebSocketComponent from '@components/WebSocketComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTop10StockQuery } from '@hooks/useTop10StockQuery';
import { useEffect, useState } from 'react';
import { useAllStockQuery } from '@hooks/useAllStockQuery';
import { useCategoryStockQuery } from '@hooks/useCategoryStockQuery';
import useAuthStore from '@store/useAuthStore';
import Left from '@components/Left';
import StockModal from '@features/MyStockModal/StockModal';
import { useLocation, useNavigate } from 'react-router-dom';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* 기본 너비는 100%로 설정 */
  height: 100vh;
  transition: width 0.5s ease;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  width: 100%; /* 기본적으로 100% 너비 */
  transition: all 0.5s ease;
`;

const RightVacantWrapper = styled.div<{
  $isOpen: boolean;
  $isScrapDetail: boolean;
}>`
  min-width: ${({ $isOpen, $isScrapDetail }) =>
    $isOpen
      ? '580px'
      : $isScrapDetail
        ? '0px'
        : '300px'}; /* scrap-detail 페이지에서 모달이 닫혀있을 때는 여백이 0px */
  opacity: ${({ $isOpen }) =>
    $isOpen ? '0' : '1'}; /* 모달이 열리면 투명도 조정 */
  transition:
    min-width 0.5s ease,
    opacity 0.5s ease; /* 너비와 불투명도를 함께 전환 */
  overflow: hidden; /* 애니메이션 시 내용이 넘치지 않도록 설정 */
`;

const App = () => {
  const { theme } = useThemeStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useAuthStore();
  const location = useLocation();

  const { setAllStock } = useAllStockStore();
  const { setCategoryStock } = useCategoryStockStore();
  const { setTop10Stock } = useTop10StockStore();

  const { data: top10Stock } = useTop10StockQuery();
  const { data: allStock } = useAllStockQuery();
  const { data: categoryStock } = useCategoryStockQuery();
  const location = useLocation();

  useEffect(() => {
    top10Stock && setTop10Stock(top10Stock.data);
    allStock && setAllStock(allStock.data);
    categoryStock && setCategoryStock(categoryStock.data);
  }, [top10Stock, allStock, categoryStock]);

  const isOnboarding = location.pathname === '/onboarding';

  // scrap-detail 페이지인지 확인하는 변수
  const isScrapDetail =
    location.pathname === '/scrap-detail' ||
    location.pathname === '/scrap-create';

  // Modal 열기/닫기 기능 추가
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Main>
        <Header isOpen={isOpen} />
        <Content>
          {!isOnboarding && <Left />}
          <Outlet context={{ setIsOpen }} />
          <RightVacantWrapper $isOpen={isOpen} $isScrapDetail={isScrapDetail} />
        </Content>
        {isLogin && !isOnboarding && (
          <StockModal isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </Main>
      {/* 웹소켓 연결 */}
      {/* <WebSocketComponent /> */}
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
