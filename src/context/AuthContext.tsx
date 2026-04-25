import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout as firebaseLogout } from '../lib/firebase';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';

interface AuthContextType {
  isAdmin: boolean;
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  loginWithPassword: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const ADMIN_USERNAME = 'manik23';
const ADMIN_PASSWORD = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'Manik@&*35';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasscodeAdmin, setIsPasscodeAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin_auth');
    if (saved === 'true') {
      setIsPasscodeAdmin(true);
      // Try to re-authenticate anonymously if we have a saved session
      signInAnonymously(auth).catch(console.error);
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = (user?.email === 'maniksheikh2006@gmail.com' && user?.emailVerified) || isPasscodeAdmin;

  const login = async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Login cancelled by user.');
        return;
      }
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const loginWithPassword = async (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsPasscodeAdmin(true);
      localStorage.setItem('admin_auth', 'true');
      
      // Attempt anonymous auth in the background for Firestore access, but don't block login if it fails
      signInAnonymously(auth).catch(error => {
        console.warn('Firebase Anonymous Auth failed. Some database operations might be restricted if rules require authentication.', error);
      });
      
      return true;
    }
    return false;
  };

  const logout = async () => {
    await firebaseLogout();
    setIsPasscodeAdmin(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, user, loading, login, loginWithPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
