import Item from '../../components/item';
import { FloatingButton, ButtonContainer } from '../../shared/uibuttons';

function Items(props) {

    const items = props.data.map((item) => <Item data={item} />);

    return(
        <ButtonContainer>
        <div>
            { items }
            <FloatingButton secondary>+</FloatingButton>
        </div>
        </ButtonContainer>
    )
}

export default Items; 