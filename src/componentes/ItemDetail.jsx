import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';
import { useCartContext } from '../context/CartContext';
import { useState } from 'react';

const ItemDetail = ({product}) => {
    const [count, setCount] = useState(1)
    const {addToCartList} = useCartContext()

    const onAdd = (cantidad)=>{
        alert(`Agrego al carrito ${cantidad} productos`)
        setCount(cantidad)
        addToCartList({product, cantidad: cantidad})
    }
    
    return(
        <div>
            <Card key={product.id} style={{ width: '28rem' }} className="Card">
                                        <Card.Img variant="top" src={product.img} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>
                                                    {product.description}
                                                    <br />
                                                    <b>${product.price}</b>
                                                </Card.Text>
                                                <ItemCount stock={product.stock} initial={1} onAdd={onAdd}/>
                                        </Card.Body>
            </Card>
        </div>
    )
}

export default ItemDetail;

