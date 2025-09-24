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

  // Get user from ReactFire
  const { status: userStatus, data: user } = useUser();
  const { firestore } = useSdk();
  
  // Show loading state if user is not ready
  if (userStatus === 'loading') {
    return <div>Ladataan käyttäjän tietoja...</div>;
  }

  // Ensure user exists and has UID before continuing
  if (!user || !user.uid) {
    return <div>Käyttäjää ei löydy tai käyttäjällä ei ole UID:tä. Ole hyvä ja kirjaudu sisään uudelleen.</div>;
  }
  
  // Create references to Firestore collections
  //const itemCollectionRef = collection(doc(firestore, 'user', user.uid), 'item');
  const itemCollectionRef = collection(doc(collection(firestore, 'user', user.uid), 'item'), 'item')
  const itemQuery = query(itemCollectionRef, orderBy('pv', 'desc'));
  const { status: itemStatus, data: itemCollection } = useFirestoreCollectionData(itemQuery, {
    idField: 'id',
    initialData: []
  });
  
  const typeCollectionRef = collection(doc(firestore, 'user', user.uid), 'type');
  const typeQuery = query(typeCollectionRef, orderBy('type'));
  const { status: typeStatus, data: typeCollection } = useFirestoreCollectionData(typeQuery, {
    initialData: []
  });
  
  // Show loading state if data is still loading
  if (itemStatus === 'loading' || typeStatus === 'loading') {
    return <div>Ladataan tietoja...</div>;
  }
  
  useEffect(() => {
    setData(itemCollection);
  }, [itemCollection]); 

  useEffect(() => {
    const types = typeCollection.map(obj => obj.type);
    setTypelist(types);
  }, [typeCollection]);

  const handleItemSubmit = (newitem) => {
    setDoc(doc(itemCollectionRef, newitem.id), newitem);
  }
  
  const handleItemDelete = (id) => {
    deleteDoc(doc(itemCollectionRef, id));
  }

  const handleTypeSubmit = (newtype) => {
    const newTypeRef = doc(typeCollectionRef);
    setDoc(newTypeRef, { type: newtype });
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