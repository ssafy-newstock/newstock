import styled from 'styled-components';
import { useThemeStore } from '@store/themeStore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useAuthStore from '@store/useAuthStore';
import Login from '@components/Login';
import axios from 'axios';

const HeaderContainer = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
`;

const NewStock = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.highlightColor};
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  padding: 5px 10px;
  align-items: center;
  gap: 15px;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  min-height: 50px;
`;

const Icon = styled.svg`
  color: ${({ theme }) => theme.profileColor}; // 테마 색상으로 설정
  fill: currentColor; // fill 속성에 currentColor 사용
  cursor: pointer;
`;

const UserName = styled.h1`
  color: ${({ theme }) => theme.profileColor};
  font-size: 1.5em;
  font-weight: 600;
`;

const LoginAlert = styled.h1`
  color: ${({ theme }) => theme.profileColor};
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
`;

const Slider = styled(motion.div)`
  position: relative;
  display: block;
  width: 50px;
  height: 24px;
  background-color: ${({ theme }) => theme.switchBackgroundColor};
  border-radius: 34px;
  transition: background-color 0.3s;
  cursor: pointer;
`;

const Handle = styled(motion.div)`
  position: absolute;
  top: 2px;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.switchHandleColor};
  border-radius: 50%;
  cursor: pointer;
  z-index: 99;
`;

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === 'dark';
  // 로그인 모달 상태 추가
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const openLogin = () => {
    setLoginOpen(true);
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const { isLogin, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://withhim-jenkins.site/api/member/logout',
        {
          withCredentials: true,
        }
      );
      // 세션 스토리지에서 액세스 토큰 삭제
      sessionStorage.removeItem("accessToken");

      // 로그아웃 상태 업데이트(AuthStore)
      logout();

    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <>
      <HeaderContainer>
        <NewStock>NewStock</NewStock>
        <HeaderRight>
          <Slider onClick={toggleTheme}>
            {/* <div>{isDarkMode ? '🌙' : '☀️'}</div> */}
            <Handle
              animate={{ left: isDarkMode ? '26px' : '2px' }} // 상태에 따른 위치 설정
              transition={{ type: 'spring', stiffness: 300, damping: 20 }} // 스프링 애니메이션 적용
            />
          </Slider>

          <User>
            {isLogin ? (
              <>
                <Icon
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M19.9998 20C18.1665 20 16.5971 19.3472 15.2915 18.0417C13.9859 16.7361 13.3332 15.1667 13.3332 13.3334C13.3332 11.5 13.9859 9.93058 15.2915 8.62502C16.5971 7.31947 18.1665 6.66669 19.9998 6.66669C21.8332 6.66669 23.4026 7.31947 24.7082 8.62502C26.0137 9.93058 26.6665 11.5 26.6665 13.3334C26.6665 15.1667 26.0137 16.7361 24.7082 18.0417C23.4026 19.3472 21.8332 20 19.9998 20ZM9.99984 33.3334C9.08317 33.3334 8.29873 33.0072 7.6465 32.355C6.99317 31.7017 6.6665 30.9167 6.6665 30V28.6667C6.6665 27.7222 6.90984 26.8539 7.3965 26.0617C7.88206 25.2706 8.52761 24.6667 9.33317 24.25C11.0554 23.3889 12.8054 22.7428 14.5832 22.3117C16.3609 21.8817 18.1665 21.6667 19.9998 21.6667C21.8332 21.6667 23.6387 21.8817 25.4165 22.3117C27.1943 22.7428 28.9443 23.3889 30.6665 24.25C31.4721 24.6667 32.1176 25.2706 32.6032 26.0617C33.0898 26.8539 33.3332 27.7222 33.3332 28.6667V30C33.3332 30.9167 33.0071 31.7017 32.3548 32.355C31.7015 33.0072 30.9165 33.3334 29.9998 33.3334H9.99984Z"
                    fill="currentColor"
                  />
                </Icon>
                <UserName>사용자</UserName>
                <Icon
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  onClick={handleLogout}
                >
                  <path
                    d="M8.33333 35C7.41667 35 6.63222 34.6739 5.98 34.0217C5.32778 33.3694 5.00111 32.5844 5 31.6667V8.33333C5 7.41667 5.32667 6.63222 5.98 5.98C6.63333 5.32778 7.41778 5.00111 8.33333 5H20V8.33333H8.33333V31.6667H20V35H8.33333ZM26.6667 28.3333L24.375 25.9167L28.625 21.6667H15V18.3333H28.625L24.375 14.0833L26.6667 11.6667L35 20L26.6667 28.3333Z"
                    fill="currentColor"
                  />
                </Icon>
              </>
            ) : (
              <LoginAlert onClick={openLogin}>로그인 해주세요</LoginAlert>
            )}
          </User>
        </HeaderRight>
      </HeaderContainer>
      {/* 로그인 모달 */}
      {loginOpen && <Login closeLogin={closeLogin} />}
    </>
  );
};

export default Header;
