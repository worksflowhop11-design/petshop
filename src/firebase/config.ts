import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import rawAppletConfig from '../../firebase-applet-config.json';

// Flexible Firebase configuration: prioritize Vercel/Vite environment variables, fall back to bundled applet config
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || rawAppletConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || rawAppletConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || rawAppletConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || rawAppletConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || rawAppletConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || rawAppletConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || rawAppletConfig.measurementId || '',
};

const firestoreDbId =
  import.meta.env.VITE_FIREBASE_DATABASE_ID ||
  rawAppletConfig.firestoreDatabaseId ||
  undefined;

// Initialize Firebase App instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth instance
export const auth = getAuth(app);

// Firestore instance targeting provisioned or default database ID
export const db = firestoreDbId ? getFirestore(app, firestoreDbId) : getFirestore(app);

// Storage instance
export const storage = getStorage(app);

// Health check to validate connection
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'status'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore client is offline.');
      return false;
    }
    // Any permission or missing doc error still confirms online connectivity
    return true;
  }
}

export default app;
