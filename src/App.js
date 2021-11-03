import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import {ItemContainer} from './componentes/ItemListContainer';
import ItemDetailContainer from './componentes/ItemDetailContainer';
import { Menu } from './componentes/Navbar/Navbar';
import Cart from './componentes/Cart';


function App() {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/">
          <ItemContainer title="Sakura Libreria"/>
          </Route>
          <Route exact path="/categoria/:idCategorias">
          <ItemContainer title="Sakura Libreria"/>
          </Route>
          <Route exact path="/detalle/:id" component={ItemDetailContainer}/>
          <Route exact path="/cart" component={Cart}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
