import React from 'react';
import App from './App';
import Startup from './Startup';
import { useSigninCheck } from 'reactfire';

function AppWrapper() {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Odota, tarkistetaan kirjautumistilaa...
      </div>
    );
  }

  if (signInCheckResult && signInCheckResult.signedIn === true) {
    return <App />;
  }

  return <Startup />;
}

export default AppWrapper;