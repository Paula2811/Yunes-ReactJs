import {useEffect,useState} from 'react';
import {Item} from './Item';
import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';

export function Productos (){
    const [product, setProduct] = useState([])
    useEffect(() =>{
        Item.then (res => {
            console.log("Llamada a la base de datos");
            setProduct(res)
        })
        .catch(err => console.log(err))
    },[])
    console.log(product)
    return (
        <>         
            {        
                    product.map(product=><Card key={product.id} style={{ width: '28rem' }} className="Card">
                                        <Card.Img variant="top" src={product.img} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>
                                                    ${product.price}
                                                </Card.Text>
                                                <ItemCount stock={product.stock} initial={1} onAdd={agregarCarrito}/>
                                        </Card.Body>
                                    </Card>
            )
            }
        </>
    )
}
const agregarCarrito = (cantidad)=>{
    console.log(`Agrego al carrito ${cantidad} productos`)
}