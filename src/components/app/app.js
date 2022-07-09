import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import 'firebase/firestore';
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
import testdata from '../../testdata.js';

function App() {

  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);

  const itemCollectionRef = useFirestore().collection('item');
  const { data: itemCollection } = useFirestoreCollectionData(itemCollectionRef, {initialData: [], idField: "id"});

  console.log(itemCollection);
  
  useEffect(() => {
    setData(testdata);
    setTypelist(["olo on ok", "mahdollinen rytmihäiriö", "olo on heikko"])
    //setData(testdata);
  },[]);

  useEffect(() => {
    setData(itemCollection);
  }, [itemCollection]);

  const handleItemSubmit = (newitem) => {
    let storeddata = data.slice();
    const index = storeddata.findIndex(item => item.id === newitem.id);
    if(index >= 0){
      storeddata[index] = newitem;      
    } else {
      storeddata.push(newitem);
    }
  

    storeddata.sort((a,b) =>{
      const aDate = new Date(a.paymentDate);
      const bDate = new Date(a.paymentDate);
      return bDate.getTime() - aDate.getTime();
      
    });

    setData(storeddata);
  }

  const handleItemDelete = (id) => {
    let storeddata = data.slice();
    // filtteröidään merkinnät joita ei poisteta
    storeddata = storeddata.filter(item => item.id !== id);
    setData(storeddata); 
    alert("DELETE -> " + id);
  }

  const handleTypeSubmit = (newtype) => {
    let storedtypelist = typelist.slice();
    storedtypelist.push(newtype);
    storedtypelist.sort();
    setTypelist(storedtypelist);
  }

  return (
    <ButtonAppContainer>
    <div className={styles.app}> 
    <Router>
    <Header /> 
    <Content> 
      <Route exact path="/">
      <Items data={data} />
      </Route>
      <Route exact path="/stats">
      <Stats data={data} />
      </Route>
      <Route exact path="/settings">
      <Settings data={data} types={typelist} onTypeSubmit={handleTypeSubmit}/>
      </Route>
      <Route exact path="/add">
      <AddItem onItemSubmit={handleItemSubmit} types={typelist}/>
      </Route>
      <Route path="/edit/:id">
        <EditItem onItemSubmit={handleItemSubmit} data={data} types={typelist} onItemDelete={handleItemDelete}/>
      </Route>
    </Content>   
    <Menu />
    </Router>
    </div>
    </ButtonAppContainer>
  );
}

export default App;
