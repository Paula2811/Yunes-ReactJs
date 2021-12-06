import {NavLink} from 'react-router-dom'
import './Navbar.css'
import {Navbar,Container,Nav} from 'react-bootstrap';
import { Icon } from '../CartWidget/CartWidget';

//Navbar
export function Menu() {
    return(
        <Navbar bg="dark" variant="dark" className="Navbar">
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
                    <NavLink to="/categoria/cuadernos" className="nav-link">Cuadernos</NavLink>
                    <NavLink to="/categoria/organizadores" className="nav-link">Organizadores</NavLink>
                    <NavLink to="/categoria/resaltadores" className="nav-link">Resaltadores</NavLink>
                    <NavLink to="/cart" className="nav-link"><Icon/></NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}


