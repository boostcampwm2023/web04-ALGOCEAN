import { createContext } from 'react';
import { AuthContextValue } from '../types/type';

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
