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
import RightNav from '@components/RightNav';
import MyStock from '@features/MyStockModal/MyStock';
import History from '@features/MyStockModal/History';
import FavoriteStock from '@features/MyStockModal/FavoriteStock';
import FavoriteNews from '@features/MyStockModal/FavoriteNews';
import Ranking from '@features/MyStockModal/Ranking';


const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  transition: all 0.5s ease;
`;

const Container = styled.div<{ $isOnboarding: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $isOnboarding }) => ($isOnboarding ? '100%' : '96.5%')};
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  width: 100%;
  transition: all 0.5s ease;
`;

const RightVacantWrapper = styled.div<{
  $isOpen: boolean;
  $isScrapDetail: boolean;
}>`
  min-width: ${({ $isOpen, $isScrapDetail }) =>
    $isOpen
      ? '530px'
      : $isScrapDetail
        ? '0px'
        : '250px'}; /* scrap-detail 페이지에서 모달이 닫혀있을 때는 여백이 0px */
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
  const { isLogin } = useAuthStore();
  const location = useLocation();

  const { setAllStock } = useAllStockStore();
  const { setCategoryStock } = useCategoryStockStore();
  const { setTop10Stock } = useTop10StockStore();

  const { data: top10Stock } = useTop10StockQuery();
  const { data: allStock } = useAllStockQuery();
  const { data: categoryStock } = useCategoryStockQuery();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  useEffect(() => {
    top10Stock && setTop10Stock(top10Stock.data);
    allStock && setAllStock(allStock.data);
    categoryStock && setCategoryStock(categoryStock.data);
  }, [top10Stock, allStock, categoryStock]);

  const isOnboarding = location.pathname === '/onboarding';

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'MyStock':
        return <MyStock isOpen={activeComponent === 'MyStock'} />;
      case 'MyStockHistory':
        return <History isOpen={activeComponent === 'MyStockHistory'} />;
      case 'Heart':
        return <FavoriteStock isOpen={activeComponent === 'Heart'} />;
      case 'Star':
        return <FavoriteNews isOpen={activeComponent === 'Star'} />;
      case 'Rank':
        return <Ranking isOpen={activeComponent === 'Rank'} />;
      default:
        return null;
    }
  };

  // scrap-detail 페이지인지 확인하는 변수
  const isScrapDetail =
    location.pathname === '/scrap-detail' ||
    location.pathname === '/scrap-create';


  // Modal 열기/닫기 기능 추가
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Main>
        <Container $isOnboarding={isOnboarding}>
          <Header isOpen={activeComponent !== null} />
          <Content>
            {!isOnboarding && <Left />}
            <Outlet />
            {!isOnboarding && (
              <RightVacantWrapper $isOpen={activeComponent !== null} $isScrapDetail={isScrapDetail}/>
            )}
          </Content>
        </Container>
        {isLogin && !isOnboarding && renderActiveComponent()}
        {!isOnboarding && (
          <RightNav
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        )}
      </Main>

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
