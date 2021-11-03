import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';

const ItemDetail = ({detail}) => {
    
    return(
        <div>
            <Card key={detail.id} style={{ width: '28rem' }} className="Card">
                                        <Card.Img variant="top" src={detail.img} />
                                        <Card.Body>
                                            <Card.Title>{detail.title}</Card.Title>
                                                <Card.Text>
                                                    {detail.description}
                                                    <br />
                                                    <b>${detail.price}</b>
                                                </Card.Text>
                                                <ItemCount stock={detail.stock} initial={1} onAdd={agregarCarrito}/>
                                        </Card.Body>
            </Card>
        </div>
    )
}

export default ItemDetail;

const agregarCarrito = (cantidad)=>{
    console.log(`Agrego al carrito ${cantidad} productos`)
}