import {Navbar,Container,Nav} from 'react-bootstrap';
import {BsFillCartCheckFill} from 'react-icons/bs'
//Navbar
export function Menu() {
    return(
        <Navbar bg="dark" variant="dark" ClassName="Navbar">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src= '../logo4.png'
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
                    <Nav.Link href=""><Icon/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
//Icono
function Icon (){
    return(
        <BsFillCartCheckFill/>
    )
}

