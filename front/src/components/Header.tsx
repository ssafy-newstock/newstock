import styled from "styled-components"
import ThemedButton from '@components/ThemedButton';
import { useThemeStore } from "@store/themeStore";


const HeaderContainer = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
`

const Name = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.highlightColor};
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const Header = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <HeaderContainer>
      <Name>
        NewStock
      </Name>
      <HeaderRight>
        <ThemedButton onClick={toggleTheme}>Toggle Theme</ThemedButton>
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header