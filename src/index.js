import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Appwrapper from './components/appwrapper';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';
import { SdkProvider } from './sdk';

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

// Get root element and create root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the app with the necessary providers
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SdkProvider>
        <Appwrapper />
      </SdkProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

reportWebVitals();
