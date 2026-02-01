import ItemForm from '../components/ItemForm';

function AddItem({ onItemSubmit, types }) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Uuden mittaustuloksen lisääminen</h2>
      <ItemForm onItemSubmit={onItemSubmit} types={types} />
    </div>
  );
}

export default AddItem;