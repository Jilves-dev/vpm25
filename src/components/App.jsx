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

// Default lifestyle kategoriat (näytetään jos käyttäjällä ei ole omia)
export const DEFAULT_LIFESTYLES = [
  'Suolan vähentäminen',
  'Liikunta',
  'Hyvä uni',
  'Vähä alkoholia',
  'Stressinhallinta',
  'Terveellinen ruokavalio'
];

function FloatingAddButton() {
  const location = useLocation();
  if (location.pathname !== '/') return null;
  return (
    <Link to="/add">
      <FloatingButton secondary>+</FloatingButton>
    </Link>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);
  const [lifestyles, setLifestyles] = useState(DEFAULT_LIFESTYLES);

  const { status: userStatus, data: user } = useUser();
  const { firestore } = useSdk();

  const itemCollectionRef = user?.uid ? collection(firestore, 'user', user.uid, 'item') : null;
  const itemQuery = itemCollectionRef ? query(itemCollectionRef, orderBy('pv', 'desc')) : null;

  const { status: itemStatus, data: itemCollection } = useFirestoreCollectionData(
    itemQuery || collection(firestore, '_placeholder'),
    { idField: 'id', initialData: [] }
  );

  const typeCollectionRef = user?.uid ? collection(firestore, 'user', user.uid, 'type') : null;
  const typeQuery = typeCollectionRef ? query(typeCollectionRef, orderBy('type')) : null;

  const { status: typeStatus, data: typeCollection } = useFirestoreCollectionData(
    typeQuery || collection(firestore, '_placeholder'),
    { initialData: [] }
  );

  // Lifestyle collection
  const lifestyleCollectionRef = user?.uid ? collection(firestore, 'user', user.uid, 'lifestyle') : null;
  const lifestyleQuery = lifestyleCollectionRef ? query(lifestyleCollectionRef, orderBy('name')) : null;

  const { status: lifestyleStatus, data: lifestyleCollection } = useFirestoreCollectionData(
    lifestyleQuery || collection(firestore, '_placeholder'),
    { initialData: [] }
  );

  useEffect(() => {
    if (itemCollection) setData(itemCollection);
  }, [itemCollection]);

  useEffect(() => {
    if (typeCollection) {
      setTypelist(typeCollection.map(obj => obj.type));
    }
  }, [typeCollection]);

  useEffect(() => {
    if (lifestyleCollection && lifestyleCollection.length > 0) {
      setLifestyles(lifestyleCollection.map(obj => obj.name));
    }
  }, [lifestyleCollection]);

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
      setDoc(doc(typeCollectionRef), { type: newtype });
    }
  };

  const handleLifestyleSubmit = (newlifestyle) => {
    if (lifestyleCollectionRef) {
      setDoc(doc(lifestyleCollectionRef), { name: newlifestyle });
    }
  };

  const handleLifestyleDelete = (name) => {
    if (lifestyleCollectionRef) {
      // Etsi ja poista dokumentti nimestä
      const item = lifestyleCollection.find(obj => obj.name === name);
      if (item && item.id) {
        deleteDoc(doc(lifestyleCollectionRef, item.id));
      }
    }
  };

  if (userStatus === 'loading' || itemStatus === 'loading' || typeStatus === 'loading' || lifestyleStatus === 'loading') {
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
              <Route path="/settings" element={
                <Settings
                  types={typelist}
                  onTypeSubmit={handleTypeSubmit}
                  lifestyles={lifestyles}
                  onLifestyleSubmit={handleLifestyleSubmit}
                  onLifestyleDelete={handleLifestyleDelete}
                />
              } />
              <Route path="/add" element={<AddItem onItemSubmit={handleItemSubmit} types={typelist} lifestyles={lifestyles} />} />
              <Route path="/edit/:id" element={
                <EditItem
                  onItemSubmit={handleItemSubmit}
                  data={data}
                  types={typelist}
                  lifestyles={lifestyles}
                  onItemDelete={handleItemDelete}
                />
              } />
            </Routes>
          </Content>
          <FloatingAddButton />
          <Menu />
        </div>
      </Router>
    </ButtonAppContainer>
  );
}

export default App;
