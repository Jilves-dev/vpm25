import React from 'react';
import App from './App';
import Startup from './Startup';
import { useSigninCheck } from 'reactfire';

// käytetään kirjautumiseen reactfire-kirjastoa, hyvä ja yleinen tapa käsitellä Firebase-autentikointitilaa React-sovelluksissa
// Appwrapper.jsx on vastuussa käyttäjän kirjautumistilan tarkistamisesta useSigninCheck -hookilla
// ja se näyttää joko App -komponentin (jos kirjautunut sisään) tai Startup -komponentin (jos ei ole kirjautunut sisään).
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
