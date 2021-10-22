import {Card} from 'react-bootstrap';
import ItemCount from './ItemCount';

export function Titulo ({title}){
    return(
        <div>
            <h1>{title}</h1>
            <div>
                <ItemCard/>
            </div>
        </div>
    )
}

function ItemCard(){
    const agregarCarrito = (cantidad)=>{
        console.log(`Agrego al carrito ${cantidad} productos`)
    }
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>Producto 1</Card.Title>
                    <Card.Text>
                        Algo sobre el producto 1
                    </Card.Text>
                    <ItemCount stock={15} initial={1} onAdd={agregarCarrito}/>
            </Card.Body>
        </Card>
    )
}