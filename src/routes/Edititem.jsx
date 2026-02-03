import ItemForm from '../components/ItemForm';
import { useParams } from 'react-router-dom';

function EditItem({ data, types, lifestyles, onItemSubmit, onItemDelete }) {
  const { id } = useParams();
  const index = data.findIndex(item => item.id === id);
  let item = index >= 0 ? data[index] : null;

  if (!item) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Tietoja ei löydy</h2>
        <p>Valitettavasti mittaustulosta id:llä {id} ei löydy.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Mittaustuloksen muokkaaminen</h2>
      <ItemForm
        onItemSubmit={onItemSubmit}
        data={item}
        types={types}
        lifestyles={lifestyles}
        onItemDelete={onItemDelete}
      />
    </div>
  );
}

export default EditItem;