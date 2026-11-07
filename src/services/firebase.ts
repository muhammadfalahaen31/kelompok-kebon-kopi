import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyATlPpX7QVmYtRl_mctbP85F9MKceYQeQQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "project-kebon-kopi.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "project-kebon-kopi",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "project-kebon-kopi.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "757850342566",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:757850342566:web:13cb8eb087369fb5a3a067",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-S0TSFJCXJR"
};

// Initialize Firebase safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics safely
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const isFirebaseConfigured = (): boolean => {
  return (
    Boolean(firebaseConfig.apiKey) &&
    firebaseConfig.projectId === 'project-kebon-kopi'
  );
};
