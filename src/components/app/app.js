import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  useFirestoreCollectionData, 
  useUser 
} from 'reactfire';
import { collection, doc, setDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { useSdk } from '../../sdk';
import styles from './app.module.scss';
import Header from '../header';
import Content from '../content';
import Items from '../../routes/items';
import Stats from '../../routes/stats';
import Settings from '../../routes/settings';
import AddItem from '../../routes/additem';
import EditItem from '../../routes/edititem';
import Menu from '../menu';
import { ButtonAppContainer } from '../../shared/uibuttons';

function App() {
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);

  // KAIKKI HOOKS ENSIN - ei ehtolauseita ennen näitä!
  const { status: userStatus, data: user } = useUser();
  const { firestore } = useSdk();
  
  // Luodaan collection referencet vain jos user on olemassa
  const itemCollectionRef = user?.uid 
    ? collection(doc(firestore, 'user', user.uid), 'items')
    : null;
  
  const itemQuery = itemCollectionRef 
    ? query(itemCollectionRef, orderBy('pv', 'desc'))
    : null;
  
  const { status: itemStatus, data: itemCollection } = useFirestoreCollectionData(
    itemQuery || collection(firestore, '_dummy'),
    {
      idField: 'id',
      initialData: []
    }
  );
  
  const typeCollectionRef = user?.uid
    ? collection(doc(firestore, 'user', user.uid), 'types')
    : null;
  
  const typeQuery = typeCollectionRef
    ? query(typeCollectionRef, orderBy('type'))
    : null;
  
  const { status: typeStatus, data: typeCollection } = useFirestoreCollectionData(
    typeQuery || collection(firestore, '_dummy'),
    {
      initialData: []
    }
  );
  
  // Päivitä data kun itemCollection muuttuu
  useEffect(() => {
    if (user?.uid && itemCollection) {
      setData(itemCollection);
    }
  }, [itemCollection, user]); 

  // Päivitä typelist kun typeCollection muuttuu
  useEffect(() => {
    if (user?.uid && typeCollection) {
      const types = typeCollection.map(obj => obj.type);
      setTypelist(types);
    }
  }, [typeCollection, user]);

  // VASTA NYT conditionalit ja early returnsit
  if (userStatus === 'loading') {
    return <div>Ladataan käyttäjän tietoja...</div>;
  }

  if (!user || !user.uid) {
    return <div>Käyttäjää ei löydy. Ole hyvä ja kirjaudu sisään uudelleen.</div>;
  }
  
  if (itemStatus === 'loading' || typeStatus === 'loading') {
    return <div>Ladataan tietoja...</div>;
  }

  const handleItemSubmit = (newitem) => {
    if (itemCollectionRef) {
      setDoc(doc(itemCollectionRef, newitem.id), newitem);
    }
  }
  
  const handleItemDelete = (id) => {
    if (itemCollectionRef) {
      deleteDoc(doc(itemCollectionRef, id));
    }
  }

  const handleTypeSubmit = (newtype) => {
    if (typeCollectionRef) {
      const newTypeRef = doc(typeCollectionRef);
      setDoc(newTypeRef, { type: newtype });
    }
  }

  return (
    <ButtonAppContainer>
      <div className={styles.app}> 
        <Router>
          <Header /> 
          <Content> 
            <Routes>
              <Route exact path="/" element={<Items data={data} />} />
              <Route path="/stats" element={<Stats data={data} />} />
              <Route path="/settings" element={<Settings types={typelist} onTypeSubmit={handleTypeSubmit} />} />
              <Route path="/add" element={<AddItem onItemSubmit={handleItemSubmit} types={typelist} />} />
              <Route path="/edit/:id" element={<EditItem onItemSubmit={handleItemSubmit} data={data} types={typelist} onItemDelete={handleItemDelete} />} />
            </Routes>
          </Content>   
          <Menu />
        </Router>
      </div>
    </ButtonAppContainer>
  );
}

export default App;