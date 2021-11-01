import './App.css';
import {Menu} from './componentes/Navbar.jsx';
import {ItemContainer} from './componentes/ItemListContainer';
import ItemDetailContainer from './componentes/ItemDetailContainer';




function App() {
  return (
    <div className="App">
        <Menu />
        <ItemContainer title="Sakura Libreria"/>
        <ItemDetailContainer/>
    </div>
  );
}

export default App;
