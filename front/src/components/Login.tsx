import styled from 'styled-components';
import kakaoLogin from '@assets/Login/kakaoLogin.png';
import googleLogin from '@assets/Login/googleLogin.png';
import { useNavigate } from 'react-router-dom';
import { Overlay, Background, Modal } from './ModalComponents';

// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 50;
// `;

// const Background = styled.div`
//   position: fixed;
//   inset: 0;
//   background-color: black;
//   opacity: 0.5;
// `;

// const Modal = styled.div`
//   background-color: ${({ theme }) => theme.backgroundColor};
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   padding: 20px 24px;
//   z-index: 50;
//   width: 300px;
// `;

const Heading = styled.h2`
  font-size: 1rem;
  margin-bottom: 16px;
  text-align: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  /* background: none; */
  border: none;
  cursor: pointer;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); */
`;

const Image = styled.img`
  width: 100%;
`;

const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  font-weight: bold;
  color: ${({ theme }) => theme.profileColor};
  padding: 8px 16px;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

interface ILoginProps {
  closeLogin?: () => void;
}
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const kakao_client_id = import.meta.env.VITE_KAKAO_CLIENT_ID;
const kakao_client_secret = import.meta.env.VITE_KAKAO_CLIENT_SECRET;
const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const KAKAO_REDIRECT_URI = `${REDIRECT_URI}/login/oauth2/code/kakao`;
const GOOGLE_REDIRECT_URI = `${REDIRECT_URI}/login/oauth2/code/google`;

const Login: React.FC<ILoginProps> = ({ closeLogin }) => {
  const navigate = useNavigate();

  const handleCloseLogin = () => {
    if (closeLogin) {
      closeLogin();
    } else {
      navigate('/');
    }
  };

  return (
    <Overlay>
      <Background onClick={handleCloseLogin} />
      <Modal>
        <Heading>로그인이 필요한 서비스 입니다.</Heading>
        <form>
          <Button>
            <a
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_id}&client_secret=${kakao_client_secret}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}
            >
              <Image src={kakaoLogin} alt="Kakao Login" />
            </a>
          </Button>
          <Button>
            <a
              href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`}
            >
              <Image src={googleLogin} alt="Google Login" />
            </a>
          </Button>
          <CancelButton onClick={handleCloseLogin}>Cancel</CancelButton>
        </form>
      </Modal>
    </Overlay>
  );
};

export default Login;
