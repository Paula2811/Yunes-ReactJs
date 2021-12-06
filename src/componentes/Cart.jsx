import {Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { useState} from 'react'
import { useCartContext } from '../context/CartContext';
import { getFirestore } from '../services/getFirestore';
import '../css/cart.css'
import firebase from "firebase"
import 'firebase/firestore'
import { DataForm } from './DataForm';

const Cart = () =>{
    const {cartList, removeItem, removeCart, cartTotal,formData} = useCartContext()
    
    const [idOrder, setIdOrder] = useState("")
    
    const generarOrden = ()=>{
        let orden = {}
        orden.date = firebase.firestore.Timestamp.fromDate(new Date());    
        orden.buyer = formData
        orden.total = cartTotal;
        orden.item = cartList.map(itemAgregado => {
            const id = itemAgregado.product.id;
            const title = itemAgregado.product.title
            const total = itemAgregado.product.price * itemAgregado.cantidad
            return {id, title, total}   
        })

        const dbQuery = getFirestore()

        dbQuery.collection("orders").add(orden)
        .then(resp => setIdOrder(resp.id))
        .catch(err=> console.log("Error: ",err))
        .finally(()=> removeCart())

        const itemsToUpdate = dbQuery.collection('items').where(
            firebase.firestore.FieldPath.documentId(), 'in', cartList.map(idToUpdate=> idToUpdate.product.id)
        )
    
        const batch = dbQuery.batch();
        
    
        itemsToUpdate.get()
        .then( collection=>{
            collection.docs.forEach(docSnapshot => {
                batch.update(docSnapshot.ref, {
                    stock: docSnapshot.data().stock - cartList.find(idToUpdate => idToUpdate.product.id === docSnapshot.id).product.cantidad
                })
            })
            batch.commit()
        })

    }
    return (
        <div className="form">
            {cartList.length
            ? <Button  onClick={() => removeCart()} className="cart">Vaciar carrito</Button>
            :idOrder ===""
                ?<div className="compra">
                <p>El carrito está vacío</p>
                <Link to="/"> 
                    <Button variant="primary">Ir al Inicio</Button>
                </Link>
                </div>
                : <div className="compra">
                <p>¡Gracias por tu compra!</p>
                <p>El Id de tu compra es: {idOrder}</p>
                <Link to="/"> 
                    <Button variant="primary">Ir al Inicio</Button>
                </Link>
                </div>
            }
            <div> 
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
                                <Button variant="primary" onClick={() => removeItem(itemAgregado.product.id)} className="cartButton">Eliminar Producto</Button>
                                <Card.Text>
                                Subtotal: $ {itemAgregado.cantidad * itemAgregado.product.price}
                                </Card.Text>
                        </Card.Body>
                    </Card>    
                )}
            </div>
            <div className="compra">
                <p>
                    Total:  $ {`${cartTotal}`}
                </p>
            </div>
            <DataForm generarOrden={generarOrden}/>
        </div>
    )
    
}

export default Cart;