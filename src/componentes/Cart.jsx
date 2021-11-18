import {Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { useState} from 'react'
import { useCartContext } from '../context/CartContext';
import { getFirestore } from '../services/getFirestore';
import '../css/cart.css'
import firebase from "firebase"
import 'firebase/firestore'

const Cart = () =>{
    const {cartList, removeItem, removeCart, cartTotal} = useCartContext()
    const [formData, setFormData]= useState({name:"", email:"",phone:""})
    const [idOrder, setIdOrder] = useState("")
    
    const generarOrden = (e)=>{
        e.preventDefault()
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
        console.log(orden)

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
    
            batch.commit().then(res =>{
                console.log('resultado batch:', res)
            })
        })

    }
    const handleChange = (e) =>{
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }
    console.log(formData)
    return (
        <div className="form">
            {cartList.length
            ? <Button  onClick={() => removeCart()} className="cart">Vaciar carrito</Button>
            :idOrder ===""
                ?<div>
                <b>El carrito está vacío</b>
                <Link to="/"> 
                    <Button variant="primary">Ir al Inicio</Button>
                </Link>
                </div>
                : <div>
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
            <div>
                <b>
                    Total:  $ {`${cartTotal}`}
                </b>
            </div>
            <form onSubmit={generarOrden} onChange={handleChange}>
                <legend >Ingresá tus datos</legend>
                <div className="formItem">
                    <label>Nombre:</label>
                    <input type="text" name="name" placeholder="Ingresa tu nombre" defaultValue={formData.name}/>
                </div>
                <div className="formItem">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="ejemplo@email.com" defaultValue={formData.email}/>
                </div>
                <div className="formItem">
                    <label>Teléfono:</label>
                    <input type="text" name="phone" placeholder="Ingresa tu telefono" defaultValue={formData.phone}/> 
                </div>
                <button className="formButton">Terminar la compra!</button>
            </form>
        </div>
    )
    
}

export default Cart;