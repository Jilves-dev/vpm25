import React, { createContext, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { 
  AuthProvider, 
  FirestoreProvider,
  FirebaseAppProvider
} from 'reactfire';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC6iDs1maQ1BvNJjzb_sky7q1EqqaM-fs",
  authDomain: "verenpaine-mitta.firebaseapp.com",
  databaseURL: "https://verenpaine-mitta.web.app/",
  projectId: "verenpaine-mitta",
  appId: "1:263488757444:web:2b4ec7eb3b6b3be00c3391",
  measurementId: "G-VMHPSV57J6",
  storageBucket: "verenpaine-mitta.appspot.com",
  messagingSenderId: "263488757444"
};

// Create a context for our custom SDK
const SdkContext = createContext(null);

export const SdkProvider = ({ children }) => {
  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
  
  // Initialize services
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  // Create our SDK object with the Firebase services
  const sdk = {
    app,
    auth,
    firestore
  };

  // Provide the Firebase services through ReactFire's providers
  return (
    <SdkContext.Provider value={sdk}>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          {children}
        </FirestoreProvider>
      </AuthProvider>
    </SdkContext.Provider>
  );
};

export const useSdk = () => {
  const context = useContext(SdkContext);
  if (context === null) {
    throw new Error('SDK not found. useSdk must be called from within a provider');
  }
  return context;
};