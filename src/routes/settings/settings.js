import styles from './settings.module.scss';
import Button from '../../shared/uibuttons';
import { useUser } from 'reactfire';
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { useSdk } from '../../sdk';

function Settings(props) {
    const { status: userStatus, data: user } = useUser();
    const { auth } = useSdk();
    const navigate = useNavigate();

    // Show loading state if user data is still loading
    if (userStatus === 'loading') {
        return <div>Ladataan käyttäjän tietoja...</div>;
    }

    // Ensure user exists before rendering
    if (!user) {
        return <div>Käyttäjää ei löydy. Ole hyvä ja kirjaudu sisään uudelleen.</div>;
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // Navigate to root after sign out
            navigate('/');
            // Reload page to ensure the app state is reset
            window.location.reload();
        } catch (error) {
            console.error("Sign out error:", error);
        }
    }

    const handleTypeSubmit = (event) => {
        event.preventDefault();
        const newtype = event.target.elements.type.value;
        if (newtype.trim()) {
            props.onTypeSubmit(newtype);
            event.target.elements.type.value = "";
        }
    }

    return(
        <div className={styles.settings}>
            <h2>Asetukset</h2>

            <h3>Profiili</h3>
            
            <div className={styles.settings_profile}>
                <div className={styles.settings_user}>
                    <div>
                        {user.photoURL && <img src={user.photoURL} alt="" />}
                    </div>
                    <div>
                        {user.displayName}<br/>{user.email}
                    </div>
                </div>
                <div>
                    <Button primary onClick={handleSignOut}>Kirjaudu ulos</Button>
                </div>
            </div> 

            <h3>Lisätieto tyypit</h3>
            <div className={styles.settings_types}>
                {props.types && props.types.length > 0 ? (
                    props.types.map((lisätieto) => 
                        <div key={lisätieto}>{lisätieto}</div>
                    )
                ) : (
                    <div>Ei lisättyjä tyyppejä. Lisää ensimmäinen alla olevalla lomakkeella.</div>
                )}
                <form onSubmit={handleTypeSubmit}>
                    <div className={styles.typeform}>
                        <input type="text" name="type" />
                        <Button type="submit" primary>Lisää</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Settings;



