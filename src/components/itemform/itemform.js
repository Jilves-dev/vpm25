import styles from './itemform.module.scss';
import useForm from '../../shared/useform';
import Button from '../../shared/uibuttons';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ItemForm(props) {

    const history = useHistory();

    const submit = () => {
        let storedvalues = Object.assign({}, values);
        storedvalues.yp = parseFloat(storedvalues.yp)
        storedvalues.ap = parseFloat(storedvalues.ap)
        storedvalues.syke = parseFloat(storedvalues.syke)
        storedvalues.id = storedvalues.id ? storedvalues.id : uuidv4;
        props.onItemSubmit(storedvalues);
        alert("SUBMIT!");
        history.push("/");
    }

    const initialState = props.data ? props.data : {
        pv: "",
        apip: "",
        klo: "",
        yp: 0,
        ap: 0,
        syke: 0,
        lisätieto: ""
    };

    const {values, handleChange, handleSubmit} = useForm(submit, initialState, false);

    const handleCancel = (event) => {
        event.preventDefault();
        alert("CANCEL")
        history.goBack();
    }

    const handleDelete = (event) => {
        event.preventDefault();
        props.onItemDelete(values.id);
        history.push("/");
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <div className={styles.form}>
        <div className={styles.form_row}>
        <div>
            <label htmlFor="pv">pvm </label>
            <input type="date" name="pv" onChange={handleChange} value={values.pv}/>
        </div>
        <div>
            <label htmlFor="apip">aamu vai ilta? </label>
            <select name="apip" onChange={handleChange} value={values.apip}>
                <option>aamu</option>
                <option>ilta</option>
            </select>    
        </div>
        <div>
            <label htmlFor="klo">klo </label>
            <input type="time" name="klo" onChange={handleChange} value={values.klo}/>
        </div>
        </div>
        
        <div className={styles.form_row}>
        <div>
            <label htmlFor="yp">yläpaine </label>
            <input type="number" name="yp" step="0.1" onChange={handleChange} value={values.yp}/>
        </div>
        <div>
            <label htmlFor="ap">alapaine </label>
            <input type="number" name="ap" step="0.1" onChange={handleChange} value={values.ap}/>
        </div>
        </div>

        <div className={styles.form_row}>
        <div>
            <label htmlFor="syke">syke </label>
            <input type="number" name="syke" step="0.1" onChange={handleChange} value={values.syke}/>
        </div>
        </div>

        <div className={styles.form_row}>
            <div>
                <label htmlFor="lisätieto">vointi </label>
                <select name="lisätieto" onChange={handleChange} value={values.lisätieto}>
                    { props.types.map( (lisätieto) => <option key={lisätieto} value={lisätieto}>{lisätieto}</option> ) }
                </select>   
            </div>
        </div>

        <div className={styles.form_row}>
            <div>
                  <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
                  <Button primary type="submit">{ props.data ? "TALLENNA" : "LISÄÄ" }</Button>
            </div>
        </div>

        {props.onItemDelete ? 
        <div className={styles.form_row}>
            <div>
                  <Button onClick={handleDelete}>POISTA</Button>
            </div>
            <div></div>
            </div> : "" }

        </div>
        </form>
        </div>
    )
}

export default ItemForm;