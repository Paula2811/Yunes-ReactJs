import {Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { useCartContext } from '../context/CartContext';

const Cart = () =>{
    const {cartList, removeItem, removeCart, cartTotal, total} = useCartContext()
    
    return (
        <div>
            <div className=
                {cartList.length
                ? "carrito-lleno"
                : "carrito-vacio"
                }
                > 
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
                                Total: $ {itemAgregado.cantidad* itemAgregado.product.total}
                                {console.log(cartTotal)}
                                </Card.Text>
                        </Card.Body>
                    </Card>    
                )}
                <div>
                    <Card.Text>
                        Total: $ {total}
                        {console.log(cartTotal)}
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