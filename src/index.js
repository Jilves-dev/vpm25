import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyBC6iDs1maQ1BvNJjzb_sky7q1EqqaM-fs",
  authDomain: "verenpaine-mitta.firebaseapp.com",
  projectId: "verenpaine-mitta",
  storageBucket: "verenpaine-mitta.appspot.com",
  messagingSenderId: "263488757444",
  appId: "1:263488757444:web:2b4ec7eb3b6b3be00c3391",
  measurementId: "G-VMHPSV57J6"
};

const root = document.getElementById('root');
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
    </FirebaseAppProvider>
    , root
    
    );

      //<React.StrictMode>
 // 
 //   
    
  //</React.StrictMode>


/*  ReactDOM.render(
  <React.StrictMode>
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
); */

 reportWebVitals();
