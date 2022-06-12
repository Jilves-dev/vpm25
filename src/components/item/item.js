import styles from './item.module.scss';
import { MdNavigateNext } from "react-icons/md";
//import { Link } from 'react-router-dom';

function Item(props) {

    const locale = "fi-FI";
    const pv = new Date(props.data.pv).toLocaleDateString(locale);
    const klo = new Date(props.data.klo).toLocaleTimeString(locale);
    const numberFormat = new Intl.NumberFormat;

   /*  let average, average2, average3;
    let period;
    if (props.data.periodStart && props.data.periodEnd) {
        const periodStart = new Date(props.data.periodStart);
        const periodEnd = new Date(props.data.periodEnd);
        period = periodStart.toLocaleDateString(locale) + " - " + periodEnd.toLocaleDateString(locale);
        const days = (periodEnd - periodStart) / (1000*60*60*24);
        average = numberFormat.format(props.data.yp / days * 30);
        average2 = numberFormat.format(props.data.ap / days * 30);
        average3 = numberFormat.format(props.data.syke / days * 30);
    } */

    return(
        <div className={styles.item}>
            <div className={styles.item_data}>
            <div className={styles.item_pv}>{pv}</div>
            <div className={styles.item_apip}>{props.data.apip}</div>
            <div className={styles.item_klo}>{props.data.klo}</div>
            <div className={styles.item_yp}>Yläpaine: {props.data.yp}</div>
            <div className={styles.item_ap}>Alapaine: {props.data.ap}</div>
            <div className={styles.item_syke}>Syke: {props.data.syke}</div>
            <div className={styles.item_lisätieto}>Vointi: {props.data.lisätieto}</div>
            </div>
            <div className={styles.item_edit}>
                <MdNavigateNext />
            </div>
        </div>
    )
}

export default Item;

      // <div className={styles.item_timespan}>{period}</div>
            // <div className={styles.item_average}>Yläpaine, alapaine ja syke keskiarvo: {average ? average + "/" : ""} {average2 ? average2 + "/" : ""} {average3 ? average3 + " kk" : ""}</div>