import styles from './stats.module.scss';
import Items2 from '../../routes/items2';
import testdata from '../../testdata.js';

function Stats(props) {

    /* const locale = "fi-FI";
    const pv = new Date(props.data.pv).toLocaleDateString(locale);
    const klo = new Date(props.data.klo).toLocaleTimeString(locale);
    const numberFormat = new Intl.NumberFormat;

    let average, average2, average3;
    let period;
    if (props.data.periodStart && props.data.periodEnd) {
        const periodStart = new Date(props.data.periodStart);
        const periodEnd = new Date(props.data.periodEnd);
        period = periodStart.toLocaleDateString(locale) + " - " + periodEnd.toLocaleDateString(locale);
        const days = (periodEnd - periodStart) / (1000*60*60*24);
        average = numberFormat.format(props.data.yp / days * 30);
        average2 = numberFormat.format(props.data.ap / days * 30);
        average3 = numberFormat.format(props.data.syke / days * 30);
    }

    return(
        <div className={styles.item}>
            <h2>Stats</h2>
            <div className={styles.item_data}>
            <div className={styles.item_timespan}>{period}</div>
            <div className={styles.item_average}>Yläpaine, alapaine ja syke keskiarvo: {average ? average + "/" : ""} {average2 ? average2 + "/" : ""} {average3 ? average3 + " kk" : ""}</div>
            </div>
          
        </div>
    )
} */
    return(
        <div>
        <h2>stats</h2>
        <Items2 data={testdata} />
        </div>
    );
} 

export default Stats; 