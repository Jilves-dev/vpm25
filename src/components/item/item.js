import styles from './item.module.scss';
import { MdNavigateNext } from "react-icons/md";
//import { Link } from 'react-router-dom';

function Item(props) {
    return(
        <div className={styles.item}>
            <div className={styles.item_data}>
            <div className={styles.item_pv}>pv</div>
            <div className={styles.item_apip}>apip</div>
            <div className={styles.item_klo}>klo</div>
            <div className={styles.item_yp}>yp</div>
            <div className={styles.item_ap}>ap</div>
            <div className={styles.item_syke}>syke</div>
            <div className={styles.item_lisätieto}>lisätieto</div>
            </div>
            <div className={styles.item_edit}>
              
                <MdNavigateNext />
       
            </div>
        </div>
    )
}

export default Item;