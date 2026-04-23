import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout as firebaseLogout } from '../lib/firebase';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';

interface AuthContextType {
  isAdmin: boolean;
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  loginWithPassword: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const ADMIN_EMAIL = 'maniksheikh2006@gmail.com';
const ADMIN_PASSWORD = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'admin123';

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

  const isAdmin = (user?.email === ADMIN_EMAIL && user?.emailVerified) || isPasscodeAdmin;

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

  const loginWithPassword = async (password: string) => {
    if (password === ADMIN_PASSWORD) {
      try {
        await signInAnonymously(auth);
        setIsPasscodeAdmin(true);
        localStorage.setItem('admin_auth', 'true');
        return true;
      } catch (error: any) {
        console.error('Error signing in anonymously:', error);
        if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/admin-restricted-operation') {
          alert('ACTION REQUIRED: Anonymous Authentication is disabled or restricted in your Firebase Console.\n\nPlease follow these steps:\n1. Go to Firebase Console > Authentication > Sign-in method.\n2. Enable "Anonymous" provider.\n3. If you use Identity Platform, ensure "Enable create operation" is NOT blocked.');
        } else {
          alert('LOGIN_ERROR: ' + (error.message || 'Unknown authentication error'));
        }
        return false;
      }
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
