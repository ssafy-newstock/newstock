import styled from 'styled-components';
import { useThemeStore } from '@store/themeStore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAuthStore from '@store/useAuthStore';
import Login from '@components/Login';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { authRequest } from '@api/axiosInstance';
import { formatUnit } from '@utils/formatUnit';
import usePointStore from '@store/usePointStore';

const HeaderContainer = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? 'calc(100% - 360px)' : '100%')};
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  transition: width 0.3s ease;
`;

const NewStock = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.highlightColor};
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  padding: 0.25rem 1.125rem;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  border-radius: 1.25rem;
  box-shadow: 0rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.25);
  min-height: 2.5rem;
`;

const Icon = styled.svg`
  color: ${({ theme }) => theme.profileColor}; // 테마 색상으로 설정
  fill: currentColor; // fill 속성에 currentColor 사용
  cursor: pointer;
`;

const UserName = styled.h1`
  color: ${({ theme }) => theme.profileColor};
  font-size: 1rem;
  font-weight: 600;
`;

const LoginAlert = styled.h1`
  color: ${({ theme }) => theme.profileColor};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Slider = styled(motion.div)`
  position: relative;
  display: block;
  width: 3rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.switchBackgroundColor};
  border-radius: 1rem;
  transition: background-color 0.3s;
  cursor: pointer;
`;

const Handle = styled(motion.div)`
  position: absolute;
  top: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${({ theme }) => theme.switchHandleColor};
  border-radius: 50%;
  cursor: pointer;
  z-index: 99;
`;

const ThemeIcon = styled.div`
  position: absolute;
  top: 0.8rem;
  transform: translateY(-50%);
  font-size: 1.25rem;
  color: ${({ theme }) => theme.switchIconColor};
  pointer-events: none; // 아이콘이 클릭 이벤트를 방해하지 않도록 설정
`;

const StyledIcon = styled.svg`
  width: 30px;
  height: 30px;
  fill: none;
  color: ${({ theme }) => theme.profileColor};
  stroke-width: 1.05;
`;

const PointWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out; // 애니메이션 적용
  cursor: pointer;

  &:hover {
    transform: scale(1.1); // 확대 효과 */
  }
`;

interface HeaderProps {
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ isOpen }) => {
  const { memberName } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === 'dark';
  // 로그인 모달 상태 추가
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  // 유저 포인트 상태
  const { point, setPoint } = usePointStore();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const openLogin = () => {
    // 현재 경로를 로컬 스토리지에 저장
    localStorage.setItem('pathname', window.location.pathname);
    setLoginOpen(true);
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const { isLogin, logout, memberId } = useAuthStore();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem('accessToken');
  };
  useEffect(() => {
    const fetchUserPoint = async (): Promise<void> => {
      const response = await authRequest.get(`/member/${memberId}/point`);
      setPoint(response.data.point);
    };

    // 로그인 상태가 true일 때만 포인트 가져오기
    if (isLogin && memberId) {
      fetchUserPoint();
    }
  }, [isLogin, memberId]);

  useEffect(() => {
    const socket = new SockJS('https://newstock.info/api/member/websocket');

    const client = Stomp.over(socket);

    client.debug = (msg) => {
      console.log('STOMP debug:', msg);
    };

    client.connect(
      {},
      () => {
        console.log('WebSocket connected');

        client.subscribe(
          `/api/sub/member/info/point/${memberId}`,
          (response) => {
            console.log('Received message:', response);
            const newPoint = response.body; // 서버에서 전달받은 포인트
            setPoint(Number(newPoint));
          }
        );

        client.send(
          '/api/sub/member/info/point',
          {},
          JSON.stringify({ memberId })
        );
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );

    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log('WebSocket disconnected');
        });
      }
    };
  }, [isLogin, memberId]);

  // API 생성 후 대체
  // const handleLogout = async () => {
  //   try {
  //     await axios.post('https://newstock.info/api/auth/logout', {
  //       withCredentials: true,
  //     });
  //     // 세션 스토리지에서 액세스 토큰 삭제
  //     sessionStorage.removeItem('accessToken');

  //     // 로그아웃 상태 업데이트(AuthStore)
  //     logout();
  //   } catch (err) {
  //     console.error('Error during logout:', err);
  //   }
  // };

  return (
    <>
      <HeaderContainer isOpen={isOpen}>
        <NewStock>NewStock</NewStock>
        <HeaderRight>
          <Slider onClick={toggleTheme}>
            {/* <div>{isDarkMode ? '🌙' : '☀️'}</div> */}
            <ThemeIcon style={{ left: isDarkMode ? '0.25rem' : '1.75rem' }}>
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.03841 13.3331C6.55663 13.3331 5.2973 12.8147 4.26041 11.7778C3.22352 10.7409 2.70508 9.48158 2.70508 7.9998C2.70508 6.64914 3.14508 5.47802 4.02508 4.48647C4.90508 3.49491 5.99486 2.90958 7.29441 2.73047C7.33041 2.73047 7.36574 2.7318 7.40041 2.73447C7.43508 2.73714 7.46908 2.74091 7.50241 2.7458C7.27752 3.05958 7.09952 3.40847 6.96841 3.79247C6.8373 4.17647 6.77174 4.57891 6.77174 4.9998C6.77174 6.18514 7.18641 7.19247 8.01575 8.0218C8.84508 8.85114 9.85263 9.26602 11.0384 9.26647C11.4611 9.26647 11.864 9.20091 12.2471 9.0698C12.6302 8.93869 12.9742 8.76069 13.2791 8.5358C13.2844 8.56914 13.2882 8.60314 13.2904 8.6378C13.2926 8.67247 13.294 8.7078 13.2944 8.7438C13.1237 10.0429 12.5426 11.1325 11.5511 12.0125C10.5595 12.8925 9.38908 13.3327 8.03841 13.3331Z"
                    fill="#828282"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_308_1640)">
                    <path
                      opacity="0.2"
                      d="M11.5 8C11.5 8.69223 11.2947 9.36892 10.9101 9.9445C10.5256 10.5201 9.97893 10.9687 9.33939 11.2336C8.69985 11.4985 7.99612 11.5678 7.31719 11.4327C6.63825 11.2977 6.01461 10.9644 5.52513 10.4749C5.03564 9.98539 4.7023 9.36175 4.56725 8.68282C4.4322 8.00388 4.50152 7.30015 4.76642 6.66061C5.03133 6.02107 5.47993 5.47444 6.05551 5.08986C6.63108 4.70527 7.30777 4.5 8 4.5C8.92826 4.5 9.8185 4.86875 10.4749 5.52513C11.1313 6.1815 11.5 7.07174 11.5 8Z"
                      fill="white"
                    />
                    <path
                      d="M7.5 2.5V1C7.5 0.867392 7.55268 0.740215 7.64645 0.646447C7.74021 0.552678 7.86739 0.5 8 0.5C8.13261 0.5 8.25979 0.552678 8.35355 0.646447C8.44732 0.740215 8.5 0.867392 8.5 1V2.5C8.5 2.63261 8.44732 2.75979 8.35355 2.85355C8.25979 2.94732 8.13261 3 8 3C7.86739 3 7.74021 2.94732 7.64645 2.85355C7.55268 2.75979 7.5 2.63261 7.5 2.5ZM12 8C12 8.79113 11.7654 9.56448 11.3259 10.2223C10.8864 10.8801 10.2616 11.3928 9.53073 11.6955C8.79983 11.9983 7.99556 12.0775 7.21964 11.9231C6.44371 11.7688 5.73098 11.3878 5.17157 10.8284C4.61216 10.269 4.2312 9.55629 4.07686 8.78036C3.92252 8.00444 4.00173 7.20017 4.30448 6.46927C4.60723 5.73836 5.11992 5.11365 5.77772 4.67412C6.43552 4.2346 7.20887 4 8 4C9.06051 4.00116 10.0773 4.42296 10.8271 5.17285C11.577 5.92275 11.9988 6.93949 12 8ZM11 8C11 7.40666 10.8241 6.82664 10.4944 6.33329C10.1648 5.83994 9.69623 5.45542 9.14805 5.22836C8.59987 5.0013 7.99667 4.94189 7.41473 5.05764C6.83279 5.1734 6.29824 5.45912 5.87868 5.87868C5.45912 6.29824 5.1734 6.83279 5.05764 7.41473C4.94189 7.99667 5.0013 8.59987 5.22836 9.14805C5.45542 9.69623 5.83994 10.1648 6.33329 10.4944C6.82664 10.8241 7.40666 11 8 11C8.7954 10.9992 9.55798 10.6828 10.1204 10.1204C10.6828 9.55798 10.9992 8.7954 11 8ZM3.64625 4.35375C3.74007 4.44757 3.86732 4.50028 4 4.50028C4.13268 4.50028 4.25993 4.44757 4.35375 4.35375C4.44757 4.25993 4.50028 4.13268 4.50028 4C4.50028 3.86732 4.44757 3.74007 4.35375 3.64625L3.35375 2.64625C3.25993 2.55243 3.13268 2.49972 3 2.49972C2.86732 2.49972 2.74007 2.55243 2.64625 2.64625C2.55243 2.74007 2.49972 2.86732 2.49972 3C2.49972 3.13268 2.55243 3.25993 2.64625 3.35375L3.64625 4.35375ZM3.64625 11.6462L2.64625 12.6462C2.55243 12.7401 2.49972 12.8673 2.49972 13C2.49972 13.1327 2.55243 13.2599 2.64625 13.3538C2.74007 13.4476 2.86732 13.5003 3 13.5003C3.13268 13.5003 3.25993 13.4476 3.35375 13.3538L4.35375 12.3538C4.40021 12.3073 4.43706 12.2521 4.4622 12.1914C4.48734 12.1308 4.50028 12.0657 4.50028 12C4.50028 11.9343 4.48734 11.8692 4.4622 11.8086C4.43706 11.7479 4.40021 11.6927 4.35375 11.6462C4.3073 11.5998 4.25214 11.5629 4.19145 11.5378C4.13075 11.5127 4.0657 11.4997 4 11.4997C3.9343 11.4997 3.86925 11.5127 3.80855 11.5378C3.74786 11.5629 3.69271 11.5998 3.64625 11.6462ZM12 4.5C12.0657 4.50005 12.1307 4.48716 12.1914 4.46207C12.2521 4.43697 12.3073 4.40017 12.3538 4.35375L13.3538 3.35375C13.4476 3.25993 13.5003 3.13268 13.5003 3C13.5003 2.86732 13.4476 2.74007 13.3538 2.64625C13.2599 2.55243 13.1327 2.49972 13 2.49972C12.8673 2.49972 12.7401 2.55243 12.6462 2.64625L11.6462 3.64625C11.5762 3.71618 11.5286 3.8053 11.5092 3.90235C11.4899 3.99939 11.4998 4.09998 11.5377 4.1914C11.5756 4.28281 11.6397 4.36092 11.722 4.41586C11.8043 4.4708 11.9011 4.50008 12 4.5ZM12.3538 11.6462C12.2599 11.5524 12.1327 11.4997 12 11.4997C11.8673 11.4997 11.7401 11.5524 11.6462 11.6462C11.5524 11.7401 11.4997 11.8673 11.4997 12C11.4997 12.1327 11.5524 12.2599 11.6462 12.3538L12.6462 13.3538C12.6927 13.4002 12.7479 13.4371 12.8086 13.4622C12.8692 13.4873 12.9343 13.5003 13 13.5003C13.0657 13.5003 13.1308 13.4873 13.1914 13.4622C13.2521 13.4371 13.3073 13.4002 13.3538 13.3538C13.4002 13.3073 13.4371 13.2521 13.4622 13.1914C13.4873 13.1308 13.5003 13.0657 13.5003 13C13.5003 12.9343 13.4873 12.8692 13.4622 12.8086C13.4371 12.7479 13.4002 12.6927 13.3538 12.6462L12.3538 11.6462ZM3 8C3 7.86739 2.94732 7.74021 2.85355 7.64645C2.75979 7.55268 2.63261 7.5 2.5 7.5H1C0.867392 7.5 0.740215 7.55268 0.646447 7.64645C0.552678 7.74021 0.5 7.86739 0.5 8C0.5 8.13261 0.552678 8.25979 0.646447 8.35355C0.740215 8.44732 0.867392 8.5 1 8.5H2.5C2.63261 8.5 2.75979 8.44732 2.85355 8.35355C2.94732 8.25979 3 8.13261 3 8ZM8 13C7.86739 13 7.74021 13.0527 7.64645 13.1464C7.55268 13.2402 7.5 13.3674 7.5 13.5V15C7.5 15.1326 7.55268 15.2598 7.64645 15.3536C7.74021 15.4473 7.86739 15.5 8 15.5C8.13261 15.5 8.25979 15.4473 8.35355 15.3536C8.44732 15.2598 8.5 15.1326 8.5 15V13.5C8.5 13.3674 8.44732 13.2402 8.35355 13.1464C8.25979 13.0527 8.13261 13 8 13ZM15 7.5H13.5C13.3674 7.5 13.2402 7.55268 13.1464 7.64645C13.0527 7.74021 13 7.86739 13 8C13 8.13261 13.0527 8.25979 13.1464 8.35355C13.2402 8.44732 13.3674 8.5 13.5 8.5H15C15.1326 8.5 15.2598 8.44732 15.3536 8.35355C15.4473 8.25979 15.5 8.13261 15.5 8C15.5 7.86739 15.4473 7.74021 15.3536 7.64645C15.2598 7.55268 15.1326 7.5 15 7.5Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_308_1640">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </ThemeIcon>
            <Handle
              animate={{ left: isDarkMode ? '1.625rem' : '0.125rem' }} // 상태에 따른 위치 설정
              transition={{ type: 'spring', stiffness: 300, damping: 20 }} // 스프링 애니메이션 적용
            />
          </Slider>
          {isLogin && point !== null ? (
            <>
              {/* 포인트 출력 */}
              <PointWrapper
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <User style={{ gap: '0.3125rem' }}>
                  <StyledIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <ellipse
                        cx="9.5"
                        cy="9.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        rx="9.5"
                        ry="9.5"
                        transform="matrix(-1 0 0 1 20 2)"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 8.8a3.58 3.58 0 0 0-2.25-.8C8.679 8 7 9.79 7 12s1.679 4 3.75 4c.844 0 1.623-.298 2.25-.8"
                      />
                    </g>
                  </StyledIcon>
                  {!isHovering ? (
                    <UserName>{formatUnit(point)}원</UserName>
                  ) : (
                    <UserName>{point.toLocaleString()}원</UserName>
                  )}
                </User>
              </PointWrapper>

              <User>
                <UserName>{memberName}</UserName>
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
              </User>
            </>
          ) : (
            <User>
              <LoginAlert onClick={openLogin}>로그인 해주세요</LoginAlert>
            </User>
          )}
        </HeaderRight>
      </HeaderContainer>
      {/* 로그인 모달 */}
      {loginOpen && <Login closeLogin={closeLogin} />}
    </>
  );
};

export default Header;
