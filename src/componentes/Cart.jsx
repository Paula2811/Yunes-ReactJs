import {Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { useCartContext } from '../context/CartContext';

const Cart = () =>{
    const {cartList, removeItem, removeCart, cartTotal} = useCartContext()
    
    return (
        <div>
            <div> 
                {cartList.map(itemAgregado => 
                    <Card key={itemAgregado.product.id} style={{ width: '28rem' }} className="Card">
                        <Card.Img variant="top" src={itemAgregado.product.img} />
                        <Card.Body>
                            <Card.Title>{itemAgregado.product.title}</Card.Title>
                                <Card.Text>
                                    {itemAgregado.product.description}
                                    <br />
                                    <b>${itemAgregado.product.price}</b>
                                    <br/>
                                    Cantidad: {itemAgregado.cantidad}
                                </Card.Text>
                                <Button variant="primary" onClick={() => removeItem(itemAgregado.product.id)}>Eliminar Producto</Button>
                                <Card.Text>
                                Total: $ {itemAgregado.cantidad * itemAgregado.product.price}
                                {console.log(cartTotal)}
                                </Card.Text>
                        </Card.Body>
                    </Card>    
                )}
                <div>
                    <Card.Text>
                        <b>
                        Total:  $ {`${cartTotal}`}
                        </b>
                    </Card.Text>
                </div>
            </div>
        {cartList.length
        ? <Button  onClick={() => removeCart()}>Vaciar carrito</Button>
        : <div>
            <b>El carrito está vacío</b>
            <Link to="/"> 
                <Button variant="primary">Ir al Inicio</Button>
            </Link>
        </div>
        }
        </div>
    )
    
}

export default Cart;