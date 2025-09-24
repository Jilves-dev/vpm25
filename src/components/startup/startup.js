import styles from './startup.module.scss';
import Button from '../../shared/uibuttons';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { useSdk } from '../../sdk';

function Startup(props) {
    // Use the SDK to get the auth instance
    const { auth } = useSdk();

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Authentication error:", error);
        }
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