import { createContext, useLayoutEffect } from 'react';
import { AuthContextValue } from '../types/type';
import { client } from '../utils/network';
import { refreshAccessToken } from '../api';
import { useNavigate } from 'react-router-dom';

const REFRESH_URL = '/api/auth/refresh';

class Auth {
  #accessToken: string | null = null;
  static getAccessToken: () => string | null;
  static setAccessToken: (nextAuthToken: string) => void;
  static deleteAccessToken: () => void;

  getAccessToken = () => this.#accessToken;

  setAccessToken = (nextAuthToken: string) => {
    this.#accessToken = nextAuthToken;
  };

  deleteAccessToken = () => {
    this.#accessToken = null;
  };
}

const auth = new Auth();

export const DEFAULT_AUTH_CONTEXT_VALUE = {
  getAccessToken: auth.getAccessToken,
  setAccessToken: auth.setAccessToken,
  deleteAccessToken: auth.deleteAccessToken,
};

export const AuthContext = createContext<AuthContextValue>(
  DEFAULT_AUTH_CONTEXT_VALUE,
);

// Context Provider 컴포넌트
export const AuthContextProvider = ({ children }: any) => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const requestInterceptor = client.interceptors.request.use(
      (config) => {
        const isLogined = localStorage.getItem('isLogined');
        const accessToken = auth.getAccessToken();
        if (isLogined && accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.getAccessToken()}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = client.interceptors.response.use(
      (config) => config,
      async (error: any) => {
        const {
          config,
          response: { status },
        } = error;

        // 로그인 여부 확인
        const isLogined = localStorage.getItem('isLogined');
        if (!isLogined) {
          return Promise.reject(error);
        }

        // refresh token 만료 여부 확인
        if (config.url === REFRESH_URL && status === 401) {
          alert('안전한 이용을 위해 자동 로그아웃되었습니다.');
          return navigate('/login');
        }

        // 그 외의 에러 확인
        if (config.url === REFRESH_URL || status !== 401 || config.sent) {
          return Promise.reject(error);
        }

        // access token 갱신
        config.sent = true;
        const { accessToken: nextAccessToken } = await refreshAccessToken();
        auth.setAccessToken(nextAccessToken);
        return client(config);
      },
    );

    return () => {
      client.interceptors.request.eject(requestInterceptor);
      client.interceptors.request.eject(responseInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={DEFAULT_AUTH_CONTEXT_VALUE}>
      {children}
    </AuthContext.Provider>
  );
};
