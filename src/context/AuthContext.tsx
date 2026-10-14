import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection, limit, query } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { AdminUser } from '../types/admin';

interface AuthContextType {
  currentUser: User | null;
  adminData: AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  hasAdminsRegistered: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (newPass: string) => Promise<void>;
  setupFirstAdmin: (email: string, pass: string, name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<AdminUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasAdminsRegistered, setHasAdminsRegistered] = useState<boolean>(true);

  // Check if any admin exists in the system
  const checkAdminCount = async () => {
    try {
      const q = query(collection(db, 'admins'), limit(1));
      const snap = await getDocs(q);
      setHasAdminsRegistered(!snap.empty);
    } catch {
      // If collection doesn't exist yet, allow first-time setup
      setHasAdminsRegistered(false);
    }
  };

  useEffect(() => {
    checkAdminCount();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const adminDocRef = doc(db, 'admins', user.uid);
          const adminSnap = await getDoc(adminDocRef);

          if (adminSnap.exists()) {
            const data = adminSnap.data() as AdminUser;
            setAdminData(data);
            setIsAdmin(true);
          } else {
            // Check if there are no admins at all; if so, make this user admin
            const q = query(collection(db, 'admins'), limit(1));
            const existingAdmins = await getDocs(q);
            if (existingAdmins.empty) {
              const newAdminData: AdminUser = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || 'Administrator',
                role: 'superadmin',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
              };
              await setDoc(adminDocRef, newAdminData);
              setAdminData(newAdminData);
              setIsAdmin(true);
              setHasAdminsRegistered(true);
            } else {
              setAdminData(null);
              setIsAdmin(false);
            }
          }
        } catch (err) {
          console.error('Error fetching admin profile:', err);
          setIsAdmin(false);
        }
      } else {
        setAdminData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const adminDocRef = doc(db, 'admins', cred.user.uid);
    const adminSnap = await getDoc(adminDocRef);
    if (!adminSnap.exists()) {
      // Check if this was first user
      const q = query(collection(db, 'admins'), limit(1));
      const existing = await getDocs(q);
      if (existing.empty) {
        const newAdmin: AdminUser = {
          uid: cred.user.uid,
          email: cred.user.email || email,
          displayName: cred.user.displayName || 'Admin',
          role: 'superadmin',
          createdAt: new Date().toISOString(),
        };
        await setDoc(adminDocRef, newAdmin);
        setAdminData(newAdmin);
        setIsAdmin(true);
        return;
      }
      await signOut(auth);
      throw new Error('Access denied. This account does not possess administrator privileges.');
    }
    const data = adminSnap.data() as AdminUser;
    setAdminData(data);
    setIsAdmin(true);
  };

  const setupFirstAdmin = async (email: string, pass: string, name: string = 'Administrator') => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    const newAdmin: AdminUser = {
      uid: cred.user.uid,
      email: cred.user.email || email,
      displayName: name,
      role: 'superadmin',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    await setDoc(doc(db, 'admins', cred.user.uid), newAdmin);
    setAdminData(newAdmin);
    setIsAdmin(true);
    setHasAdminsRegistered(true);
  };

  const logout = async () => {
    await signOut(auth);
    setAdminData(null);
    setIsAdmin(false);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const changePassword = async (newPass: string) => {
    if (!auth.currentUser) throw new Error('No user is currently signed in.');
    await updatePassword(auth.currentUser, newPass);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        adminData,
        isAdmin,
        loading,
        hasAdminsRegistered,
        login,
        logout,
        resetPassword,
        changePassword,
        setupFirstAdmin,
      }}
    >
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
