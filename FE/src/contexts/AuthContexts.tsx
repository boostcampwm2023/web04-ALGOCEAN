import { createContext, useLayoutEffect } from 'react';
import { AuthContextValue } from '../types/type';
import { client } from '../utils/network';
import { refreshAccessToken } from '../api';
import { useNavigate } from 'react-router-dom';

const REFRESH_URL = '/api/auth/refresh';

class Auth {
  private _accessToken: string | null = null;
  static getAccessToken: () => string | null;
  static setAccessToken: (nextAuthToken: string) => void;
  static deleteAccessToken: () => void;

  getAccessToken = () => this._accessToken;

  setAccessToken = (nextAuthToken: string) => {
    this._accessToken = nextAuthToken;
  };

  deleteAccessToken = () => {
    this._accessToken = null;
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
        const accessToken = auth.getAccessToken();
        if (accessToken) {
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
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
          return Promise.reject(error);
        }

        // refresh token 만료 여부 확인
        if (config.url === REFRESH_URL) {
          localStorage.removeItem('userInfo');
          alert(
            '안전한 이용을 위해 자동 로그아웃되었습니다. 다시 로그인해 주세요',
          );
          navigate('/login');
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
  }, [navigate]);

  return (
    <AuthContext.Provider value={DEFAULT_AUTH_CONTEXT_VALUE}>
      {children}
    </AuthContext.Provider>
  );
};
