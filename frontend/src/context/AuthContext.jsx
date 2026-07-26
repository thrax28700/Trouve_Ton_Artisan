import { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin } from '../services/adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem('admin_token'));
  const [email, setEmail]   = useState(() => localStorage.getItem('admin_email'));

  const signIn = useCallback(async (credentials) => {
    const data = await apiLogin(credentials);
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_email', data.email);
    setToken(data.token);
    setEmail(data.email);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setToken(null);
    setEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, email, signIn, signOut, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
