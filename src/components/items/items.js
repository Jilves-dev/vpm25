import Item from '../item';
import { FloatingButton, ButtonContainer } from '../../shared/uibuttons';

function Items(props) {
    return(
        <ButtonContainer>
        <div>
            <Item />
            <Item />
            <Item />
            <Item />
            <FloatingButton secondary>+</FloatingButton>
        </div>
        </ButtonContainer>
    )
}

export default Items; 