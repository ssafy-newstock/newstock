import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MenuSection, TextTitle } from '@components/Left';

const Button = styled.div`
  cursor: pointer;
`;

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <Button onClick={handleClick}>
      <MenuSection>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.3rem"
          height="1.3rem"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="#828282"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M44 40.836q-7.34-8.96-13.036-10.168t-10.846-.365V41L4 23.545L20.118 7v10.167q9.523.075 16.192 6.833q6.668 6.758 7.69 16.836Z"
            clipRule="evenodd"
          />
        </svg>
        <TextTitle>BACK</TextTitle>
      </MenuSection>
    </Button>
  );
};

export default BackButton;
