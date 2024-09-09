import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  // 백그라운드 배경 색상
  backgroundColor: '#ffffff',
  textColor: '#4C506B',
  grayTextColor: '#A9ACBB',
  highlightColor: '#453DE0',
  // 네비게이션 바 배경 색상
  navBarColor: '#453DE0',
  // 컨텐츠 색상(left, center, right)
  contentColor: "#F6F8FF",
  // 버튼 배경, 텍스트 색상
  buttonBackgroundColor: '#453DE0',
  buttonTextColor: '#ffffff',
};

export const darkTheme: DefaultTheme = {
  // 백그라운드 배경 색상
  backgroundColor: '#101729',
  textColor: '#A9ACBB',
  grayTextColor: '#A9ACBB',
  highlightColor: '#FFF',
  // 네비게이션 바 배경 색상
  navBarColor: '#192340',
  // 컨텐츠 색상(left, center, right)
  contentColor: "#101729",
  // 버튼 배경, 텍스트 색상
  buttonBackgroundColor: '#1e1e1e',
  buttonTextColor: '#ffffff',
};
