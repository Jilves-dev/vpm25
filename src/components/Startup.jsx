import Button from '../shared/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSdk } from '../sdk';

function Startup() {
  const { auth } = useSdk();

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication error:", error);
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

export default Startup;