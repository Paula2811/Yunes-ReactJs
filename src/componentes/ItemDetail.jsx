import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';
import { useState } from "react";

const ItemDetail = ({product}) => {
    const agregarCarrito = (cantidad)=>{
        alert(`Agrego al carrito ${cantidad} productos`)
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
                                                <ItemCount stock={product.stock} initial={1} onAdd={agregarCarrito}/>
                                        </Card.Body>
            </Card>
        </div>
    )
}

export default ItemDetail;

