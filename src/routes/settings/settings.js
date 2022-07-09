import styles from './settings.module.scss';
import Button from '../../shared/uibuttons';



function Settings(props) {

    const handleTypeSubmit =(event)=> {
        event.preventDefault();
        const newtype = event.target.elements.type.value;
        props.onTypeSubmit(newtype);
        event.target.elements.type.value = "";
    }


    return(
        <div className={styles.settings}>
            <h2>settings</h2>
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

 // {props.types.map((type) => <div key={type}>{type}</div>)}