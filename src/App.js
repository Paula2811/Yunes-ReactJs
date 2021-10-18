import './App.css';
import {Menu} from './componentes/Navbar.jsx';
import {Titulo} from './componentes/ItemListContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        <Titulo title="Sakura Libreria"/>
      </header>
    </div>
  );
}

export default App;
