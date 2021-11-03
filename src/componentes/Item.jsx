import {Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'


export const Item = ({product})=>{
    return(
        <>
        <Card key={product.id} style={{ width: '28rem' }} className="Card">
                                        <Card.Img variant="top" src={product.img} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>
                                                    {`${product.categoria}`}
                                                    ${product.price}
                                                </Card.Text>
                                                <div>
                                                    <Link to={`/detalle/${product.id}`}>
                                                    <Button variant="primary">Ver mas</Button>
                                                    </Link>
                                                </div>
                                                
                                        </Card.Body>
        </Card>
        </>
    )
}
