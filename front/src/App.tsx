import RoutesConfig from './routes';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { lightTheme, darkTheme } from '@styles/theme';
import { useThemeStore } from '@store/themeStore';
import Navbar from '@components/Navbar';
// import ThemedButton from '@components/ThemedButton';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: 90px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
`;

const App = () => {
  const { theme, toggleTheme } = useThemeStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Container>
        <Navbar />
        <Main>
          <Header />
          <Content>
            <RoutesConfig />
          </Content>
        </Main>
      </Container>
      {/* <ThemedButton onClick={toggleTheme}>Toggle Theme</ThemedButton> */}
    </ThemeProvider>
  );
};

export default App;
