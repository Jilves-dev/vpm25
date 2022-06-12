import styles from './itemform.module.scss';

function ItemForm(props) {
    return (
        <div>

        <form>

        <div className={styles.form}>
        <div className={styles.form_row}>
        <div>
            <label htmlFor="pv">pvm </label>
            <input type="date" name="pv" />
        </div>
        <div>
            <label htmlFor="apip">aamu vai ilta? </label>
            <select name="apip">
                <option>aamu</option>
                <option>ilta</option>
            </select>    
        </div>
        <div>
            <label htmlFor="klo">klo </label>
            <input type="time" name="klo" />
        </div>
        </div>
        
        <div className={styles.form_row}>
        <div>
            <label htmlFor="yp">yläpaine </label>
            <input type="number" name="yp" step="0.1" />
        </div>
        <div>
            <label htmlFor="ap">alapaine </label>
            <input type="number" name="ap" step="0.1" />
        </div>
        </div>

        <div className={styles.form_row}>
        <div>
            <label htmlFor="syke">syke </label>
            <input type="number" name="syke" step="0.1" />
        </div>
        </div>

        <div className={styles.form_row}>
            <div>
                <label htmlFor="lisätieto">vointi </label>
                <select name="lisätieto">
                    <option>olo on ok </option>
                    <option>olo ei ole ok </option>
                </select>   
            </div>
        </div>

        </div>
        </form>
        </div>
    )
}

export default ItemForm;