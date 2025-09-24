import React from 'react';
import styles from './itemform.module.scss';
import Button from '../../shared/uibuttons';
import useForm from '../../shared/useform';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ItemForm(props) {
    // Use the useNavigate hook instead of useHistory
    const navigate = useNavigate();

    const submit = () => {
        let storedvalues = Object.assign({}, values);
        storedvalues.yp = parseFloat(storedvalues.yp);
        storedvalues.ap = parseFloat(storedvalues.ap);
        storedvalues.syke = parseFloat(storedvalues.syke);
        storedvalues.id = storedvalues.id ? storedvalues.id : uuidv4();
        props.onItemSubmit(storedvalues);
        // Navigate to the home page after submit
        navigate("/");
    }

    const initialState = props.data ? props.data : {
        pv: new Date().toISOString().substring(0,10),
        apip: "aamu",
        klo: "",
        yp: 0,
        ap: 0,
        syke: 0,
        lisätieto: props.types ? props.types[0] : ""
    };

    const {values, handleChange, handleSubmit} = useForm(submit, initialState, false);

    const handleCancel = (event) => {
        event.preventDefault();
        // Navigate back
        navigate(-1);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        props.onItemDelete(values.id);
        // Navigate to the home page after delete
        navigate("/");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.form}>
                    <div className={styles.form_row}>
                        <div>
                            <label htmlFor="pv">pvm </label>
                            <input type="date" name="pv" onChange={handleChange} value={values.pv} required/>
                        </div>
                        <div>
                            <label htmlFor="apip">aamu vai ilta? </label>
                            <select name="apip" onChange={handleChange} value={values.apip} required>
                                <option value="aamu">aamu</option>
                                <option value="ilta">ilta</option>
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
                            <input type="number" name="yp" step="0.1" onChange={handleChange} value={values.yp} required/>
                        </div>
                        <div>
                            <label htmlFor="ap">alapaine </label>
                            <input type="number" name="ap" step="0.1" onChange={handleChange} value={values.ap} required/>
                        </div>
                    </div>

                    <div className={styles.form_row}>
                        <div>
                            <label htmlFor="syke">syke </label>
                            <input type="number" name="syke" step="0.1" onChange={handleChange} value={values.syke} required/>
                        </div>
                    </div>

                    <div className={styles.form_row}>
                        <div>
                            <label htmlFor="lisätieto">vointi </label>
                            <select name="lisätieto" onChange={handleChange} value={values.lisätieto} required>
                                { props.types && props.types.map((lisätieto) => 
                                    <option key={lisätieto} value={lisätieto}>{lisätieto}</option>
                                )}
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
                    </div> : null}
                </div>
            </form>
        </div>
    );
}

export default ItemForm;