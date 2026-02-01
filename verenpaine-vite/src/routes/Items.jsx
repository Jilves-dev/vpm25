import Item from '../components/Item';

function Items({ data }) {
  const items = data && data.length
    ? data.map((item) => <Item key={item.id} data={item} />)
    : <div className="p-4">Ei mittaustuloksia vielä. Lisää ensimmäinen klikkaamalla + nappia.</div>;

  return (
    <div>
      {items}
    </div>
  );
}

export default Items;