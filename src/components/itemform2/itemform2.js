import styles from './itemform2.module.scss';
import useForm2 from '../../shared/useform2';
import Button from '../../shared/uibuttons';
import { useHistory } from 'react-router-dom';

function ItemForm2(props) {

    const history = useHistory();

    const submit = () => {
        let storedvalues = Object.assign({}, values);
        storedvalues.yp = parseFloat(storedvalues.yp)
        storedvalues.ap = parseFloat(storedvalues.ap)
        storedvalues.syke = parseFloat(storedvalues.syke)
        props.onItemSubmit(storedvalues);
        alert("SUBMIT!");
        history.push("/");
    }

    const initialState = {
        periodStart: "",
        periodEnd: ""
    };

    const {values, handleChange, handleSubmit} = useForm2(submit, initialState, false);

    const handleCancel = (event) => {
        event.preventDefault();
        alert("CANCEL")
        history.goBack();

    }

    return (

        <div>
        <form onSubmit={handleSubmit}>
        <div className={styles.form}>
        <div className={styles.form_row}>
        <div>
            <label htmlFor="periodStart">Mittauskauden alku </label>
            <input type="date" name="periodStart" onChange={handleChange} value={values.periodStart} />   
        </div>
        <div>
            <label htmlFor="periodEnd">Mittauskauden loppu </label>
            <input type="date" name="periodEnd" onChange={handleChange} value={values.periodEnd} />   
        </div>
        </div>

        <div className={styles.form_row}>
            <div>
                  <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
                  <Button primary type="submit">LISÄÄ</Button>
            </div>
        </div>

        </div>
        </form>
        </div>
    )
}

export default ItemForm2;