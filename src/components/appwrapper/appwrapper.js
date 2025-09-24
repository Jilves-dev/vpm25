import React from 'react';
import App from '../app';
import Startup from '../startup';
import { useSigninCheck } from 'reactfire';

function Appwrapper() {
  // Use the useSigninCheck hook from reactfire
  const { status, data: signInCheckResult } = useSigninCheck();

  // Show loading state while checking authentication
  if (status === 'loading') {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.2rem'
    }}>
      Odota, tarkistetaan kirjautumistilaa...
    </div>;
  }

  // Show App or Startup based on authentication status
  if (signInCheckResult && signInCheckResult.signedIn === true) {
    return <App />;
  } else {
    return <Startup />;
  }
}

export default Appwrapper;