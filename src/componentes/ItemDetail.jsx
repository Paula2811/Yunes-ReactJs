import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';

const ItemDetail = ({product}) => {
    
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

const agregarCarrito = (cantidad)=>{
    console.log(`Agrego al carrito ${cantidad} productos`)
}