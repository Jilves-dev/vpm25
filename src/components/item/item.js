import styles from './item.module.scss';
import { MdNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';

function Item(props) {
    
    const locale = "fi-FI";
    const pv = new Date(props.data.pv).toLocaleDateString(locale);
    const klo = new Date(props.data.klo).toLocaleTimeString(locale);
    const numberFormat = new Intl.NumberFormat;

    return(
        <div className={styles.item}>
            <div className={styles.item_data}>
            <div className={styles.item_pv}>{props.data.pv}</div>
            <div className={styles.item_apip}>{props.data.apip}</div>
            <div className={styles.item_klo}>{props.data.klo}</div>
            <div className={styles.item_yp}>Yläpaine: {props.data.yp}</div>
            <div className={styles.item_ap}>Alapaine: {props.data.ap}</div>
            <div className={styles.item_syke}>Syke: {props.data.syke}</div>
            <div className={styles.item_lisätieto}>Vointi: {props.data.lisätieto}</div>
            </div>
            <div className={styles.item_edit}>
                <Link to={"/edit/"+props.data.id}><MdNavigateNext /></Link>
            </div>
        </div>
    )
}

export default Item;

