import {NavLink} from 'react-router-dom'
import './Navbar.css'
import {Navbar,Container,Nav} from 'react-bootstrap';
import {BsFillCartCheckFill} from 'react-icons/bs'
//Navbar
export function Menu() {
    return(
        <Navbar bg="dark" variant="dark" ClassName="Navbar">
            <Container>
                <Navbar.Brand href="/">
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
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/categoria/cuadernos" ClassName="nav-link">Cuadernos</NavLink>
                    <NavLink to="/categoria/organizadores" ClassName="nav-link">Organizadores</NavLink>
                    <NavLink to="/categoria/resaltadores" ClassName="nav-link">Resaltadores</NavLink>
                    <NavLink to="/cart" ClassName="nav-link"><Icon/></NavLink>
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

