import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  // 백그라운드 배경 색상
  backgroundColor: '#F6F8FF',
  textColor: '#4C506B',
  grayTextColor: '#A9ACBB',
  highlightColor: '#453DE0',
  // 네비게이션 바 배경 색상
  navBarColor: '#453DE0',
  // 버튼 배경, 텍스트 색상
  buttonBackgroundColor: '#453DE0',
  buttonTextColor: '#ffffff',
  // 로그인
  profileBackgroundColor: '#E1E5F8',
  profileColor: '#453DE0',
  // 다크 모드 토글 스위치
  switchBackgroundColor: '#453DE0',
  switchHandleColor: '#fff',
  // 뉴스 백그라운드
  newsBackgroundColor: '#FFF',
  // 주식 카드 백그라운드
  stockBackgroundColor: '#FFF',
  stockRed: '#FF0000',
  stockBlue: '#0000FF',
  // 주호꺼(저장한 뉴스 센터컨텐츠요소 중 중간 박스)
  centerContentSectionBackgroundColor: '#F7F7F7',
};

export const darkTheme: DefaultTheme = {
  // 백그라운드 배경 색상
  backgroundColor: '#101729',
  textColor: '#A9ACBB',
  grayTextColor: '#A9ACBB',
  highlightColor: '#FFF',
  // 네비게이션 바 배경 색상
  navBarColor: '#192340',
  // 버튼 배경, 텍스트 색상
  buttonBackgroundColor: '#1e1e1e',
  buttonTextColor: '#ffffff',
  // 로그인
  profileBackgroundColor: '#17223B',
  profileColor: '#A9ACBB',
  // 다크 모드 토글 스위치
  switchBackgroundColor: '#A9ACBB',
  switchHandleColor: '#192340',
  // 뉴스 백그라운드
  newsBackgroundColor: '#17223B',
  // 주식 카드 백그라운드
  stockBackgroundColor: '#17223B',
  stockRed: '#FF4500',
  stockBlue: '#87CEFA',
  // 주호꺼(저장한 뉴스 센터컨텐츠요소 중 중간 박스)
  centerContentSectionBackgroundColor: '#4C506B',
};
