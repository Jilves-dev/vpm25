import { Link } from 'react-router-dom';
import Item from '../../components/item';
import { FloatingButton, ButtonContainer } from '../../shared/uibuttons';

function Items(props) {
    // Create item components from the data
    const items = props.data && props.data.length 
        ? props.data.map((item) => <Item key={item.id} data={item} />)
        : <div style={{padding: '1rem'}}>Ei mittaustuloksia vielä. Lisää ensimmäinen klikkaamalla + nappia.</div>;

    return(
        <ButtonContainer>
            <div>
                {items}
                <Link to="/add">
                    <FloatingButton secondary>+</FloatingButton>
                </Link>
            </div>
        </ButtonContainer>
    )
}

export default Items;