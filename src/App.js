import {Navbar,Container,Nav} from "react-bootstrap"
import './App.css';
import logo from './logo4.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark" ClassName="Navbar">
          <Container>
            <Navbar.Brand href="#home">
              <img
              alt=""
              src= {logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
              Sakura Libreria
            </Navbar.Brand>
            <Nav className="d-flex">
              <Nav.Link href="">Inicio</Nav.Link>
              <Nav.Link href="">Productos</Nav.Link>
              <Nav.Link href="">Contacto</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default App;
