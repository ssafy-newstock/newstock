import styled from 'styled-components';
import { useThemeStore } from '@store/themeStore';
import { motion } from 'framer-motion';

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
  padding: 3px;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Icon = styled.svg`
  color: ${({ theme }) => theme.profileColor}; // 테마 색상으로 설정
  fill: currentColor; // fill 속성에 currentColor 사용
`;

const UserName = styled.h1`
  color: ${({ theme }) => theme.profileColor};
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
  return (
    <HeaderContainer>
      <NewStock>NewStock</NewStock>
      <HeaderRight>
        <Slider onClick={toggleTheme}>
          <Handle
            animate={{ left: isDarkMode ? '26px' : '2px' }} // 상태에 따른 위치 설정
            transition={{ type: 'spring', stiffness: 300, damping: 20 }} // 스프링 애니메이션 적용
          />
        </Slider>
        <User>
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="curretColor"
          >
            <path
              d="M19.9997 24.9166C19.7774 24.9166 19.5691 24.8816 19.3747 24.8116C19.1802 24.7428 18.9997 24.625 18.833 24.4583L11.1247 16.75C10.8191 16.4444 10.6735 16.0622 10.688 15.6033C10.7013 15.1455 10.8608 14.7639 11.1663 14.4583C11.4719 14.1528 11.8608 14 12.333 14C12.8052 14 13.1941 14.1528 13.4997 14.4583L19.9997 20.9583L26.5413 14.4166C26.8469 14.1111 27.2291 13.965 27.688 13.9783C28.1458 13.9928 28.5274 14.1528 28.833 14.4583C29.1385 14.7639 29.2913 15.1528 29.2913 15.625C29.2913 16.0972 29.1385 16.4861 28.833 16.7916L21.1663 24.4583C20.9997 24.625 20.8191 24.7428 20.6247 24.8116C20.4302 24.8816 20.2219 24.9166 19.9997 24.9166Z"
              fill="currentColor"
            />
          </Icon>
        </User>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
