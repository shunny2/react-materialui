import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AuthService, IUserAuthProps } from '../services/api/auth/AuthService';

interface IAuthContextData {
  isAuthenticated: boolean;
  signIn: (userData: IUserAuthProps) => Promise<string | void>;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'ACCESS_TOKEN';

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken)
      setAccessToken(JSON.stringify(accessToken));
    else
      setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  const handleSignIn = useCallback(async (userData: IUserAuthProps) => {
    const result = await AuthService.auth(userData);

    if (result instanceof Error)
      return result.message;
    
    localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
    setAccessToken(result.accessToken);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn: handleSignIn, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);