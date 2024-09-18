import styled from 'styled-components';
/**
 * ThemedButton 컴포넌트는 현재 테마에 따라 스타일이 변경되는 버튼입니다.
 * @param {object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 버튼 내용
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 */

const ThemedButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  margin-left: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default ThemedButton;
