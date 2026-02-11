import React, { createContext, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { AuthProvider, FirestoreProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

const SdkContext = createContext(null);

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const SdkProvider = ({ children }) => {
  const sdk = { app, auth, firestore };

  return React.createElement(
    SdkContext.Provider,
    { value: sdk },
    React.createElement(
      AuthProvider,
      { sdk: auth },
      React.createElement(FirestoreProvider, { sdk: firestore }, children)
    )
  );
};

export const useSdk = () => {
  const context = useContext(SdkContext);
  if (context === null) {
    throw new Error(
      'SDK not found. useSdk must be called from within a provider'
    );
  }
  return context;
};
