import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../services/firebase';
import { UserProfile, UserRole } from '../types/user.types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isLiveFirebase: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isLive = isFirebaseConfigured();

  useEffect(() => {
    if (!isLive) {
      // In development / pre-connected mode, provide fallback admin session
      setUser({
        uid: 'dev-admin-uid',
        email: 'admin@kelompokkebonkopi.id',
        displayName: 'Ahmad Fauzi',
        role: 'super_admin',
        isActive: true,
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: any) => {
      if (fbUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUser({
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: data.displayName || fbUser.displayName || 'Pengurus',
              role: (data.role as UserRole) || 'pengurus',
              photoURL: fbUser.photoURL || undefined,
              isActive: data.isActive ?? true,
            });
          } else {
            // Default role if not yet seeded
            setUser({
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || 'Pengurus',
              role: 'super_admin',
              isActive: true,
            });
          }
        } catch {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Pengurus',
            role: 'super_admin',
            isActive: true,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isLive]);

  const login = async (email: string, pass: string) => {
    if (isLive) {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      setUser({
        uid: 'dev-admin-uid',
        email: email,
        displayName: 'Ahmad Fauzi',
        role: 'super_admin',
        isActive: true,
      });
    }
  };

  const logout = async () => {
    if (isLive) {
      await firebaseSignOut(auth);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isLiveFirebase: isLive }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
