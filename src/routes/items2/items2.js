import Item2 from '../../components/item2';
//import { FloatingButton, ButtonContainer } from '../../shared/uibuttons';

function Items2(props) {

    const items2 = props.data.map((item2) => <Item2 key={item2.id} data={item2} />);

    return(
       // <ButtonContainer>
        <div>
            { items2 }
        </div>
        //</ButtonContainer>
         //   <FloatingButton secondary>+</FloatingButton>
    )
}

export default Items2; 