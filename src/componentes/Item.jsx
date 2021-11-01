import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';

export const Item = ({product})=>{
    return(
        <>
        <Card key={product.id} style={{ width: '28rem' }} className="Card">
                                        <Card.Img variant="top" src={product.img} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>
                                                    ${product.price}
                                                </Card.Text>
                                                <ItemCount stock={product.stock} initial={1} onAdd={agregarCarrito}/>
                                        </Card.Body>
        </Card>
        </>
    )
}

const agregarCarrito = (cantidad)=>{
    console.log(`Agrego al carrito ${cantidad} productos`)
}