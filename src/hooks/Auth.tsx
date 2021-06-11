import React, {
  createContext, useContext, useCallback, useState,
} from 'react';
import api from '../services/ApiService';

interface AuthState {
  token: string
}

interface SignInCredentials {
  email: string,
  password: string,
}

interface AuthContextData {
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CX:token');

    if (!!token) {
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/login', { email, password });

    const { token } = response.data;

    if (!!token) {
      localStorage.setItem('@CX:token', token);
    }

    setData({ token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CX:token');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth foi usado fora de um AuthProvider');
  }

  return context;
};

export {
  useAuth,
  AuthProvider,
};
