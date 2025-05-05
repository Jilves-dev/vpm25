import styles from './startup.module.scss';
import Button from '../../shared/uibuttons';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Tuodaan tarvittavat funktiot
import { useAuth } from 'reactfire';

function Startup (props) {
    const auth = useAuth();

    const signIn = async () => {
        const provider = new GoogleAuthProvider(); // Luodaan uusi GoogleAuthProvider-instanssi
        await signInWithPopup(auth, provider); // Käytetään signInWithPopup-funktiota auth-objektin ja providerin kanssa
    }

    return (
       <div className={styles.startup}>
        <div>Tervetuloa käyttämään  <br/>verenpaineen mittaus päiväkirja. <br/>Sinun tulee kirjautua sisään <br/>Google-tunnuksillasi, <br/>jotta voit käyttää sovellusta.
        </div>
        <Button onClick={signIn} primary>Kirjaudu sisään</Button>
        </div>
    )
}

export default Startup;








/*import styles from './startup.module.scss';
import Button from '../../shared/uibuttons';
import { initializeApp } from 'firebase/app';
import { useAuth } from 'reactfire';

function Startup (props) {

    const auth = useAuth();

   const signIn = async () => {
        await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } 

    return (
       <div className={styles.startup}>
      
        <div>Tervetuloa käyttämään  <br/>verenpaineen mittaus päiväkirja. <br/>Sinun tulee kirjautua sisään <br/>Google-tunnuksillasi, <br/>jotta voit käyttää sovellusta.
        </div>
        <Button onClick={signIn} primary>Kirjaudu sisään</Button>
        </div>
    )
}

export default Startup;*/