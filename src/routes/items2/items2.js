import Item2 from '../../components/item2';


function Items2(props) {
    
    const items2 = props.data.map((item) => <Item2 key={item.id} data={item} />);
   // const items = props.data.map((item) => <Item key={item.id} data={item} />);
    return(
       
        <div>
            { items2 }
        </div>
    )
    }

export default Items2; 