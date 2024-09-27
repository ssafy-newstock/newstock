import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '@store/useAuthStore';
import LoadingSpinner from '@components/LoadingSpinner';

type AuthType = string | null;
type ErrorType = string | null | unknown;

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState<AuthType>(null);
  const [registrationId, setRegistrationId] = useState<AuthType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);
  const { login } = useAuthStore();
  const pathname = localStorage.getItem('pathname');

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // URLSearchParams를 사용하여 인가코드를 가져옴
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const codeParam = params.get('code');
    console.log('codeParam', codeParam);
    setCode(codeParam);

    // registrationId를 설정
    if (location.pathname.includes('/kakao')) {
      setRegistrationId('kakao');
    } else if (location.pathname.includes('/google')) {
      setRegistrationId('google');
    }
  }, [location]);

  // 인가코드가 있을 경우 서버로 요청을 보내어 토큰을 받아옴
  useEffect(() => {
    if (!code || !registrationId) return;

    // 서버로 인가코드를 보내어 토큰을 받아오는 함수
    const fetchCode = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/auth/login`,
          {
            registrationId: registrationId,
            authorization: code,
          },
          // headers 생략 가능(default 값임), 특정 API 요구 사항이나 커스텀 헤더 필요할 때 헤더 설정
          {
            headers: {
              'Content-Type': 'application/json',
            },
            // 쿠키를 포함하는 옵션
            withCredentials: true,
          }
        );
        const result = response.data;

        // zustand store에 사용자 이름 저장 및 로그인 상태 변경(true)
        console.log('loginData', result);
        login(result);

        const headerData = response.headers;
        console.log(
          'accessToken',
          headerData['authorization'].replace(/^Bearer\s/, '').trim()
        );
        const accessToken = headerData['authorization']
          .replace(/^Bearer\s/, '')
          .trim();
        // 토큰을 cessionStorage에 저장
        sessionStorage.setItem('accessToken', accessToken);

        // pathname이 있을 경우 해당 경로로 이동, 없을 경우 '/'로 이동
        if (pathname) {
          navigate(pathname);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Error during login:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCode();
  }, [code]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isLoading ? (
        <p>로그인 중...</p>
      ) : error ? (
        <p>{typeof error === 'string' ? error : '로그인 중 오류 발생'}</p>
      ) : (
        <p>로그인 성공! 리다이렉트 중...</p>
      )}
    </>
  );
};

export default Auth;
