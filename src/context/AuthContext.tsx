import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout as firebaseLogout } from '../lib/firebase';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const ADMIN_USERNAME = 'manik23';
const ADMIN_PASSWORD = 'Manik@&*35';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_session');
    if (saved === 'active') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      try {
        // Attempt to sign in anonymously to satisfy Firestore rules if they require authentication
        await signInAnonymously(auth);
      } catch (error) {
        console.warn('Silent sign-in failed, continuing with local admin session:', error);
      }
      setIsAdmin(true);
      localStorage.setItem('admin_session', 'active');
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      await firebaseLogout();
    } catch (e) {
      console.error('Logout error:', e);
    }
    setIsAdmin(false);
    localStorage.removeItem('admin_session');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
