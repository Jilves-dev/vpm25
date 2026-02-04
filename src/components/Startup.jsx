   import { useState } from 'react'; // <-- Lisää tämä
    import Button from '../shared/Button';
    import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
    import { useSdk } from '../sdk';

    function Startup() {
      const { auth } = useSdk();
      const [isSigningIn, setIsSigningIn] = useState(false); // <-- Uusi tila

      const signIn = async () => {
        if (isSigningIn) return; // <-- Estä uudet napsautukset
        setIsSigningIn(true); // <-- Aseta tila "kirjautuu sisään"

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: 'select_account'
        });
        try {
          await signInWithPopup(auth, provider);
          // Tähän ei tarvita setIsSigningIn(false), koska AppWrapper hoitaa uudelleenreitityksen Appiin
        } catch (error) {
          if (error.code !== 'auth/popup-closed-by-user') {
            console.error("Authentication error:", error);
          }
          setIsSigningIn(false); // <-- Palauta tila virheen sattuessa
        }
      };

      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="m-4 text-center">
            Tervetuloa käyttämään <br />
            verenpaineen mittaus päiväkirja. <br />
            Sinun tulee kirjautua sisään <br />
            Google-tunnuksillasi, <br />
            jotta voit käyttää sovellusta.
          </div>
          <Button onClick={signIn} primary disabled={isSigningIn}> {/* <-- Poista käytöstä kirjautumisen aikana */}
            {isSigningIn ? 'Kirjaudutaan sisään...' : 'Kirjaudu sisään'} {/* <-- Muuta tekstiä */}
          </Button>
        </div>
      );
    }

    export default Startup;












{/*import Button from '../shared/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSdk } from '../sdk';

function Startup() {
  const { auth } = useSdk();

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    // Pakotta Google näyttämään tili-valintalista AINA
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error("Authentication error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="m-4 text-center">
        Tervetuloa käyttämään <br />
        verenpaineen mittaus päiväkirja. <br />
        Sinun tulee kirjautua sisään <br />
        Google-tunnuksillasi, <br />
        jotta voit käyttää sovellusta.
      </div>
      <Button onClick={signIn} primary>
        Kirjaudu sisään
      </Button>
    </div>
  );
}

export default Startup;*/}