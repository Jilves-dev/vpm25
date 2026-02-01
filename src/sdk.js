import React, { createContext, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { 
  AuthProvider, 
  FirestoreProvider
} from 'reactfire';

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

const SdkContext = createContext(null);

export const SdkProvider = ({ children }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  const sdk = {
    app,
    auth,
    firestore
  };

  return React.createElement(
    SdkContext.Provider,
    { value: sdk },
    React.createElement(
      AuthProvider,
      { sdk: auth },
      React.createElement(
        FirestoreProvider,
        { sdk: firestore },
        children
      )
    )
  );
};

export const useSdk = () => {
  const context = useContext(SdkContext);
  if (context === null) {
    throw new Error('SDK not found. useSdk must be called from within a provider');
  }
  return context;
};