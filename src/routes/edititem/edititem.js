import styles from './edititem.module.scss';
import ItemForm from '../../components/itemform';
import { useParams } from 'react-router-dom';

function EditItem(props) {
    // Use the useParams hook to get the id parameter from the URL
    const { id } = useParams();
    
    // Find the item with the matching id
    const index = props.data.findIndex(item => item.id === id);
    let item = index >= 0 ? props.data[index] : null;

    // If item not found, show an error message
    if (!item) {
        return (
            <div className={styles.edititem}>
                <h2>Tietoja ei löydy</h2>
                <p>Valitettavasti mittaustulosta id:llä {id} ei löydy.</p>
            </div>
        );
    }

    return (
        <div className={styles.edititem}>
            <h2>Mittaustuloksen muokkaaminen</h2>
            <ItemForm 
                onItemSubmit={props.onItemSubmit} 
                data={item} 
                types={props.types} 
                onItemDelete={props.onItemDelete} 
            />
        </div>
    );
}

export default EditItem;