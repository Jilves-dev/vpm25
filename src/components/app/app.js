import { BrowserRouter as Router, Route } from 'react-router-dom';
import styles from './app.module.scss';
import Header from '../header';
import Content from '../content';
import Items from '../../routes/items';
//import Items2 from '../../routes/items2';
import Stats from '../../routes/stats';
import Settings from '../../routes/settings';
import AddItem from '../../routes/additem';
import Menu from '../menu';
import { ButtonAppContainer } from '../../shared/uibuttons';
import testdata from '../../testdata.js';

function App() {
  return (
    <ButtonAppContainer>
    <div className={styles.app}> 
    <Router>
    <Header /> 
    <Content> 
      <Route exact path="/">
      <Items data={testdata} />
      </Route>
      <Route exact path="/stats">
      <Stats />
      </Route>
      <Route exact path="/settings">
      <Settings />
      </Route>
      <Route exact path="/add">
      <AddItem />
      </Route>
    </Content>   
    <Menu />
    </Router>
    </div>
    </ButtonAppContainer>
  );
}

export default App;
