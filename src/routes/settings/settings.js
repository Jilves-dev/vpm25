import styles from './settings.module.scss';
import Button from '../../shared/uibuttons';
import { useUser, useAuth } from 'reactfire';
import { useNavigate } from "react-router-dom";

function Settings(props) {

    const user = useUser();
    const auth = useAuth();
    const history = useNavigate();

    const signOut = async () => {
        await auth.signOut();
        history.push('.');
        window.location.reload();
        }

    const handleTypeSubmit =(event)=> {
        event.preventDefault();
        const newtype = event.target.elements.type.value;
        props.onTypeSubmit(newtype);
        event.target.elements.type.value = "";
    }

    return(
        <div className={styles.settings}>
            <h2>Asetukset</h2>

            <h3>Profiili</h3>
            
                <div className={styles.settings_profile}>
                <div className={styles.settings_user}>
                    <div><img src={user.data.photoURL} alt="" /></div>
                    <div>{user.data.displayName}<br/>{user.data.email}</div>
                
                </div>
                <div>
                <Button primary onClick={signOut}>Kirjaudu ulos</Button>
                </div>
            </div> 
  

            <h3>Lisätieto tyypit</h3>
            <div className={styles.settings_types}>
                {props.types.map((lisätieto) => <div key={lisätieto}>{lisätieto}</div>)}
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



