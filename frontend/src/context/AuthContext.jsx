import { createContext, useState, useContext, useEffect } from 'react';
import {getme} from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getme();
        setUser(res.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await Api.post('/api/auth/logout');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};