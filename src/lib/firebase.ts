import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const isFirebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

let app;
let auth: any;
let db: any;
let storage: any;
let googleProvider: any;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
} else {
  // Setup standard client mock environment
  console.warn("Firebase credentials missing in .env.local. Running in local mock mode.");
  
  // Mock Auth Provider
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: (user: any) => void) => {
      if (typeof window === 'undefined') return () => {};
      const savedUser = localStorage.getItem('mock_user');
      const userObj = savedUser ? JSON.parse(savedUser) : null;
      auth.currentUser = userObj;
      callback(userObj);
      
      // Return unsubscribable callback
      const handleStorageChange = () => {
        const currentUserObj = localStorage.getItem('mock_user') ? JSON.parse(localStorage.getItem('mock_user')!) : null;
        auth.currentUser = currentUserObj;
        callback(currentUserObj);
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  };

  db = {
    // Mock Firestore methods if needed
  };

  storage = {
    // Mock Storage methods if needed
  };
}

export { auth, db, storage, googleProvider, isFirebaseConfigured };

// Custom helper login/signup/logout methods which support both real Firebase and Offline Mock accounts
export const mockLogin = async (email: string, password: string): Promise<User> => {
  if (isFirebaseConfigured) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } else {
    // Basic local authentication mock
    if (password.length < 6) throw new Error("Password must be at least 6 characters.");
    const mockUser = {
      uid: 'mock-user-123',
      email: email,
      displayName: email.split('@')[0],
      emailVerified: true,
      photoURL: null,
    } as unknown as User;
    
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    // Dispatch local event so subscribers in same tab get updated instantly
    window.dispatchEvent(new Event('storage'));
    return mockUser;
  }
};

export const mockSignUp = async (email: string, password: string): Promise<User> => {
  if (isFirebaseConfigured) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  } else {
    if (password.length < 6) throw new Error("Password must be at least 6 characters.");
    const mockUser = {
      uid: 'mock-user-123',
      email: email,
      displayName: email.split('@')[0],
      emailVerified: true,
      photoURL: null,
    } as unknown as User;
    
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    window.dispatchEvent(new Event('storage'));
    return mockUser;
  }
};

export const mockGoogleLogin = async (): Promise<User> => {
  if (isFirebaseConfigured) {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  } else {
    const mockUser = {
      uid: 'mock-user-google',
      email: 'google.user@example.com',
      displayName: 'Google Dev User',
      emailVerified: true,
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    } as unknown as User;
    
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    window.dispatchEvent(new Event('storage'));
    return mockUser;
  }
};

export const mockSignOut = async (): Promise<void> => {
  if (isFirebaseConfigured) {
    await signOut(auth);
  } else {
    localStorage.removeItem('mock_user');
    auth.currentUser = null;
    window.dispatchEvent(new Event('storage'));
  }
};

export const mockResetPassword = async (email: string): Promise<void> => {
  if (isFirebaseConfigured) {
    await sendPasswordResetEmail(auth, email);
  } else {
    console.log(`Mock reset password email sent to ${email}`);
  }
};
