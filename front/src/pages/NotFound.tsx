import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { lightTheme, darkTheme } from '@styles/theme';
import { useThemeStore } from '@store/themeStore';
import Header from '@components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Left from '@components/Left';
import RightNav from '@components/RightNav';
import SideModal from '@features/SideModal/SideModal';
import { Center } from '@components/Center';
import { FlexColumnStartCenter, FlexGap } from '@components/styledComponent';
import { ErrorBuuton } from '@features/Stock/styledComponent';
import { useNavigate } from 'react-router-dom';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  transition: all 0.5s ease;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Container = styled.div<{ $isOnboarding: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $isOnboarding }) =>
    $isOnboarding ? '100%' : 'calc(100% - 68px)'};
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
      ? '500px'
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
interface LazyIframe {
  src: any;
  width: any;
  height: any;
}
const LazyIframe: React.FC<LazyIframe> = ({ src, width, height }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return !error ? (
    <iframe
      src={src}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      style={{ display: loaded ? 'block' : 'none' }}
    ></iframe>
  ) : null;
};

const NotFound = () => {
  const { theme } = useThemeStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const isOnboarding = location.pathname === '/onboarding';
  const isScrapDetail = location.pathname.includes('scrap');
  const navigate = useNavigate();

  const onClickStock = () => {
    navigate('/stock-main');
  };

  const onClickNews = () => {
    navigate('/news-main');
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Main>
        <Container $isOnboarding={isOnboarding}>
          <Header
            isOpen={activeComponent !== null}
            isOnboarding={isOnboarding}
          />
          <Content>
            {!isOnboarding && <Left />}
            <Center>
              <FlexColumnStartCenter style={{ width: '100%', height: '100%' }}>
                <LazyIframe
                  src="https://lottie.host/embed/a0a44ae6-3254-4fa6-8db5-df5aa632ebb6/S4solNithH.json"
                  width="80%"
                  height="80%"
                />
                <FlexGap $gap="2rem">
                  <ErrorBuuton
                    onClick={onClickStock}
                    style={{ fontSize: '2rem', fontWeight: '500' }}
                  >
                    주식 메인으로
                  </ErrorBuuton>
                  <ErrorBuuton
                    onClick={onClickNews}
                    style={{ fontSize: '2rem', fontWeight: '500' }}
                  >
                    뉴스 메인으로
                  </ErrorBuuton>
                </FlexGap>
              </FlexColumnStartCenter>
            </Center>
            {!isOnboarding && (
              <RightVacantWrapper
                $isOpen={activeComponent !== null}
                $isScrapDetail={isScrapDetail}
              />
            )}
          </Content>
        </Container>
        {!isOnboarding && (
          <SideModal
            activeComponent={activeComponent}
            isOpen={activeComponent !== null}
          />
        )}
        {!isOnboarding && (
          <RightNav
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        )}
      </Main>
    </ThemeProvider>
  );
};

export default NotFound;
