import RoutesConfig from './routes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import { lightTheme, darkTheme } from '@styles/theme';
import { useThemeStore } from '@store/themeStore';
import ThemedButton from '@components/ThemedButton';

const App = () => {
  const { theme, toggleTheme } = useThemeStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
        <ThemedButton onClick={toggleTheme}>Toggle Theme</ThemedButton>
      <RoutesConfig />
    </ThemeProvider>
  );
};

export default App;
