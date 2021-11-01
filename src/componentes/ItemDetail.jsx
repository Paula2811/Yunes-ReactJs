import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';

const ItemDetail = ({detalle}) => {
    
    return(
        <>
        <Card key={detalle.id} style={{ width: '28rem' }} className="Card">
                                        <Card.Img variant="top" src={detalle.img} />
                                        <Card.Body>
                                            <Card.Title>{detalle.title}</Card.Title>
                                                <Card.Text>
                                                    {detalle.description}
                                                    <br />
                                                    <b>${detalle.price}</b>
                                                </Card.Text>
                                                <ItemCount stock={detalle.stock} initial={1} onAdd={agregarCarrito}/>
                                        </Card.Body>
        </Card>
        </>
    )
}

export default ItemDetail;

const agregarCarrito = (cantidad)=>{
    console.log(`Agrego al carrito ${cantidad} productos`)
}