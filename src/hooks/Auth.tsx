import React, {
  createContext, useContext, useCallback, useState,
} from 'react';
import api from '../services/ApiService';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string,
  password: string,
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) as object };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/login', { username, password });

    const { token, user } = response.data;

    localStorage.setItem('@CX:token', token);
    localStorage.setItem('@CX:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CX:token');
    localStorage.removeItem('@CX:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
