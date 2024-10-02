import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// 인증이 필요 없는 요청
// axiosInstance.get('/public-endpoint');

// 인증이 필요한 요청
// authRequest.get('/protected-endpoint');
// axiosInstance.get('/protected-endpoint', { useAuth: true });
// authRequest.post('/protected-endpoint', data);

// 응답 타입을 지정하고 싶다면
// interface User {
//   id: number;
//   name: string;
// }
// authRequest.get<User>('/user/profile').then(response => {
//   const user = response.data; // user는 User 타입
// });


const baseUrl = 'https://newstock.info/api';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  useAuth?: boolean;
}

const config: CustomAxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);

// refreshToken을 사용하여 새로운 accessToken을 요청하는 함수
const refreshToken = async (): Promise<string> => {
  try {
    const response: AxiosResponse = await axios.post(
      'https://newstock.info/api/oauth/reissue-tokens',
      null,
      {
        withCredentials: true, // 쿠키를 포함하여 요청
      }
    );
    const accessToken = response.headers.authorization.replace(/^Bearer\s/, '');
    // 새로운 accessToken을 sessionStorage에 저장
    sessionStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('refreshToken을 사용한 accessToken 갱신 실패', error);
    throw error;
  }
};

// 요청 인터셉터 설정: 모든 요청에 대해 헤더에 accessToken을 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomAxiosRequestConfig;
    config.headers = config.headers || {};

    if (customConfig.useAuth) {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken !== null) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터 설정: 401 에러 시 refreshToken을 사용하여 새로운 accessToken을 요청
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.useAuth
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('accessToken 갱신 실패 후 재시도 중 에러:', error);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// axiosInstance의 메서드 타입을 확장하여 CustomAxiosRequestConfig를 사용하도록 합니다.
interface CustomAxiosInstance {
  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
  // 필요한 다른 메서드들도 여기에 추가할 수 있습니다.
}

// axiosInstance를 CustomAxiosInstance로 타입 단언
const customAxiosInstance = axiosInstance as CustomAxiosInstance;

// 인증이 필요한 요청을 위한 헬퍼 함수
export const authRequest = {
  get: <T = any, R = AxiosResponse<T>>(
    url: string,
    config: CustomAxiosRequestConfig = {}
  ) => customAxiosInstance.get<T, R>(url, { ...config, useAuth: true }),
  post: <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config: CustomAxiosRequestConfig = {}
  ) => customAxiosInstance.post<T, R>(url, data, { ...config, useAuth: true }),
  put: <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config: CustomAxiosRequestConfig = {}
  ) => customAxiosInstance.put<T, R>(url, data, { ...config, useAuth: true }),
  delete: <T = any, R = AxiosResponse<T>>(
    url: string,
    config: CustomAxiosRequestConfig = {}
  ) => customAxiosInstance.delete<T, R>(url, { ...config, useAuth: true }),
};
