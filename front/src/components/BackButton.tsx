import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface BackButtonProps {
  label?: string;  // 버튼에 표시할 텍스트 (옵션)
}

const Button = styled.div`
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  padding: 10px 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
  }
`;

const BackButton: React.FC<BackButtonProps> = ({ label = '<' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);  // 뒤로 가기
  };

  return <Button onClick={handleClick}>{label}</Button>;
};

export default BackButton;
