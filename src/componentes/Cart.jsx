import {Card, Button, Form, Alert} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { useState} from 'react'
import { useCartContext } from '../context/CartContext';
import firebase from 'firebase';
import 'firebase/firestore';
import { getFirestore } from '../services/getFirestore';
import '../css/cart.css'

const Cart = () =>{
    const {cartList, removeItem, removeCart, cartTotal} = useCartContext()
    const [form, setForm]= useState({name:"", email:"",number:""})
    const [ordenId, setOrdenId] = useState("");

    const generarOrden = (e)=>{
        e.preventDefault()

        let orden = {}
        orden.date = firebase.firestore.Timestamp.fromDate(new Date())
        orden.buyer = form
        orden.total = cartTotal
        orden.items = cartList.map(itemAgregado =>{
            const id = itemAgregado.item.id
            const title = itemAgregado.item.title
            const total = itemAgregado.item.price * itemAgregado.cantidad
            return {id, title, total}
        })
        
        const db = getFirestore()
        db.collection("ordenes").add(orden)
        .then(resp => setOrdenId(resp.id))
        .catch(error => alert(error))
        .finally(() =>removeCart())

        const newStock = db.collection("items").where(firebase.firestore.FieldPath.documentId(),"in",cartList.map(newStock => newStock.item.id))

        const batch = db.batch()

        newStock.get()
        .then(resp =>{
            resp.docs.forEach(docSnapshot =>{
                batch.update(docSnapshot.ref, {
                    stock: docSnapshot.data().stock - cartList.find(newId => newId.item.id === docSnapshot.id).cantidad
            })
        })
        batch.commit()
            .then(resp => {console.log("Stock actualizado",resp)})
        })
    }
    const cambio = (e) =>{
        setForm({
            ...setForm, 
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="form">
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
                                {console.log(cartTotal)}
                                </Card.Text>
                        </Card.Body>
                    </Card>    
                )}
                <div>
                    <Card.Text className="cart">
                        <b>
                        Total:  $ {`${cartTotal}`}
                        </b>
                    </Card.Text>
                </div>
            </div>
        {cartList.length
        ? <Button  onClick={() => removeCart()} className="cart">Vaciar carrito</Button>
        :ordenId ===""
            ?<div>
                <b>El carrito está vacío</b>
                <Link to="/"> 
                    <Button variant="primary">Ir al Inicio</Button>
                </Link>
            </div>
            :<Alert variant="success">
                <Alert.Heading>Gracias por su compra!</Alert.Heading>
                <p>
                Tu codigo de compra es {ordenId}
                </p>
                <hr />
                <Link to="/" className="mb-0"> 
                    <Button variant="primary">Ir al Inicio</Button>
                </Link>
            </Alert>
        }
        <Form onSubmit={generarOrden} onChange={cambio} className="cart">
            <legend className="form-legend">Ingresá tus datos</legend>
            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={form.name}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" value={form.email}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" value={form.number} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Terminar la compra!
            </Button>
        </Form>
        </div>
    )
    
}

export default Cart;