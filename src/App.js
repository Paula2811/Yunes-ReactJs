import './App.css';
import {Menu} from './componentes/Navbar.jsx';
import {ItemContainer} from './componentes/ItemListContainer';




function App() {
  return (
    <div className="App">
        <Menu />
        <ItemContainer title="Sakura Libreria"/>
    </div>
  );
}

export default App;
