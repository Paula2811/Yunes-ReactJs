import {Card, Button, Form, Alert} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { useState} from 'react'
import { useCartContext } from '../context/CartContext';
import { getFirestore } from '../services/getFirestore';
import '../css/cart.css'
import firebase from "firebase"
import 'firebase/firestore'

const Cart = () =>{
    const {cartList, removeItem, removeCart, cartTotal} = useCartContext()
    const [formData, setFormData]= useState({name:"", email:"",number:""})
    const [idOrder, setIdOrder] = useState("");

    const generarOrden = (e)=>{
        e.preventDefault()

        let orden = {}
        orden.date = firebase.firestore.Timestamp.fromDate(new Date());    
        orden.buyer = formData
        orden.total = cartTotal;
        orden.items = cartList.map(cartItem => {
            const id = cartItem.id;
            const title = cartItem.title;
            const price = cartItem.price * cartItem.cantidad;
            
            return {id, title, price}   
        })

        
        const dbQuery = getFirestore()

        dbQuery.collection('orders').add(orden)
        .then(resp => setIdOrder(resp.id))
        .catch(err=> console.log(err))
        .finally(()=> setFormData({
            name:'',
            phone:'',
            email: ''
        }))


        const itemsToUpdate = dbQuery.collection('items').where(
            firebase.firestore.FieldPath.documentId(), 'in', cartList.map(i=> i.id)
        )
    
        const batch = dbQuery.batch();
        
    
        itemsToUpdate.get()
        .then( collection=>{
            collection.docs.forEach(docSnapshot => {
                batch.update(docSnapshot.ref, {
                    stock: docSnapshot.data().stock - cartList.find(item => item.id === docSnapshot.id).cantidad
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
        :idOrder ===""
            ?<div>
                <b>El carrito está vacío</b>
                <Link to="/"> 
                    <Button variant="primary">Ir al Inicio</Button>
                </Link>
            </div>
            :<Alert variant="success">
                <Alert.Heading>Gracias por su compra!</Alert.Heading>
                <p>
                Tu codigo de compra es {idOrder}
                </p>
                <hr />
                <Link to="/" className="mb-0"> 
                    <Button variant="primary">Ir al Inicio</Button>
                </Link>
            </Alert>
        }
        <Form onSubmit={generarOrden} onChange={handleChange} className="cart">
            <legend className="form-legend">Ingresá tus datos</legend>
            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={formData.name}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" value={formData.email}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" value={formData.number} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Terminar la compra!
            </Button>
        </Form>
        </div>
    )
    
}

export default Cart;