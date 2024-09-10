import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string;
    textColor: string;
    grayTextColor: string;
    highlightColor: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    profileBackgroundColor: string;
    profileColor: string;
    switchBackgroundColor: string;
    switchHandleColor: string;
  }
}
