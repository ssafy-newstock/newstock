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
  // 채팅 말풍선
  chatBalloonColor: '#F4F4F4',
  // 전송 아이콘
  sendIconColor: '#453DE0',

  activeOptionBackgroundColor: '#D3D3D3', // 드롭다운 활성화 옵션 배경색
  activeOptionTextColor: '#000000', // 드롭다운 활성화 옵션 텍스트 색상
  hoverOptionBackgroundColor: '#E0E0E0', // 드롭다운 마우스 오버시 배경색
  hoverOptionTextColor: '#333333', // 드롭다운 마우스 오버시 텍스트 색상
  editorBackgroundColor: '#FFFFFF', // 에디터 배경색
  editorTextColor: '#000000', // 에디터 텍스트 색상
  dailyWrapperColor: '#F9F9F9', // 일일레포트 페이지 색상
  tableHeaderColor: '#f0f0f0', // 일일레포트 테이블 헤더 색상

  // 태그 색상
  tagColors: [
    { background: '#D9EAD3' },
    { background: '#FCE5CD' },
    { background: '#F4CCCC' },
    { background: '#D9D2E9' },
    { background: '#CFE2F3' },
    { background: '#FFF2CC' },
    { background: '#EAD1DC' },
    { background: '#E5E0EC' },
    { background: '#D0E0E3' },
    { background: '#FCE3C9' },
    // 추가 색상
  ],
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
  // 채팅 말풍선
  chatBalloonColor: '#2F2F2F',
  // 전송 아이콘
  sendIconColor: '#A9ACBB',

  activeOptionBackgroundColor: '#333333', // 드롭다운 활성화 옵션 배경색
  activeOptionTextColor: '#FFFFFF', // 드롭다운 활성화 옵션 텍스트 색상
  hoverOptionBackgroundColor: '#2F2F2F', // 드롭다운 마우스 오버시 배경색
  hoverOptionTextColor: '#FFFFFF', // 드롭다운 마우스 오버시 텍스트 색상
  editorBackgroundColor: '#4C506B', // 에디터 배경색
  editorTextColor: '#FFFFFF', // 에디터 텍스트 색상
  dailyWrapperColor: '#171717', // 일일레포트 페이지 색상
  tableHeaderColor: '#3E444E', // 일일레포트 테이블 헤더 색상
  // 태그 색상
  tagColors: [
    { background: '#274E13' },
    { background: '#783F04' },
    { background: '#990000' },
    { background: '#351C75' },
    { background: '#0C4583' },
    { background: '#BF9000' },
    { background: '#640D14' },
    { background: '#4B2D3D' },
    { background: '#3E444E' },
    { background: '#8B4513' },
    // 추가 색상
  ],
};
