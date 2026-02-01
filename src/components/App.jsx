import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useFirestoreCollectionData, useUser } from 'reactfire';
import { collection, doc, setDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { useSdk } from '../sdk';
import Header from './Header';
import Content from './Content';
import Items from '../routes/Items';
import Stats from '../routes/Stats';
import Settings from '../routes/Settings';
import AddItem from '../routes/AddItem';
import EditItem from '../routes/EditItem';
import Menu from './Menu';
import { ButtonAppContainer, FloatingButton } from '../shared/Button';

// Apukomponentti joka näyttää napin vain etusivulla
function FloatingAddButton() {
  const location = useLocation();
  
  // Näytä nappi vain etusivulla
  if (location.pathname !== '/') {
    return null;
  }
  
  return (
    <Link to="/add">
      <FloatingButton secondary>+</FloatingButton>
    </Link>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);

  const { status: userStatus, data: user } = useUser();
  const { firestore } = useSdk();

  const itemCollectionRef = user?.uid ? collection(firestore, 'user', user.uid, 'item') : null;
  const itemQuery = itemCollectionRef ? query(itemCollectionRef, orderBy('pv', 'desc')) : null;
  
  const { status: itemStatus, data: itemCollection } = useFirestoreCollectionData(
    itemQuery || collection(firestore, '_placeholder'), 
    {
      idField: 'id',
      initialData: []
    }
  );

  const typeCollectionRef = user?.uid ? collection(firestore, 'user', user.uid, 'type') : null;
  const typeQuery = typeCollectionRef ? query(typeCollectionRef, orderBy('type')) : null;
  
  const { status: typeStatus, data: typeCollection } = useFirestoreCollectionData(
    typeQuery || collection(firestore, '_placeholder'),
    {
      initialData: []
    }
  );

  useEffect(() => {
    if (itemCollection) {
      setData(itemCollection);
    }
  }, [itemCollection]);

  useEffect(() => {
    if (typeCollection) {
      const types = typeCollection.map(obj => obj.type);
      setTypelist(types);
    }
  }, [typeCollection]);

  const handleItemSubmit = (newitem) => {
    if (itemCollectionRef) {
      setDoc(doc(itemCollectionRef, newitem.id), newitem);
    }
  };

  const handleItemDelete = (id) => {
    if (itemCollectionRef) {
      deleteDoc(doc(itemCollectionRef, id));
    }
  };

  const handleTypeSubmit = (newtype) => {
    if (typeCollectionRef) {
      const newTypeRef = doc(typeCollectionRef);
      setDoc(newTypeRef, { type: newtype });
    }
  };

  if (userStatus === 'loading' || itemStatus === 'loading' || typeStatus === 'loading') {
    return <div className="flex justify-center items-center h-screen">Ladataan tietoja...</div>;
  }

  if (!user || !user.uid) {
    return <div className="flex justify-center items-center h-screen">Käyttäjää ei löydy. Ole hyvä ja kirjaudu sisään uudelleen.</div>;
  }

  return (
    <ButtonAppContainer>
      <Router>
        <div className="font-comic max-w-app mx-auto flex flex-col h-screen relative">
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
          
          {/* Nappi näkyy vain etusivulla */}
          <FloatingAddButton />
          
          <Menu />
        </div>
      </Router>
    </ButtonAppContainer>
  );
}

export default App;
