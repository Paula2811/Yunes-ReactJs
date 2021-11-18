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
            const id = itemAgregado.id;
            const title = itemAgregado.title
            const price = itemAgregado.price * itemAgregado.cantidad
            
            return {id, title, price}   
        })
        console.log(orden)
        console.log(cartList)
        console.log(cartTotal)
        console.log(formData)

        const dbQuery = getFirestore()

        dbQuery.collection("orders").add(orden)
        .then(resp => setIdOrder(resp.id))
        .catch(err=> console.log("Error: ",err))
        .finally(()=> setFormData({
            name:'',
            email:'',
            phone:''
        }))
        console.log(orden)

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
            : <div>
            <p>¡Gracias por tu compra!</p>
            <p>El Id de tu compra es: {idOrder}</p>
            <Link to="/"> 
                    <Button variant="primary">Ir al Inicio</Button>
            </Link>
            </div>
        }
        <form onSubmit={generarOrden} onChange={handleChange}>
                <legend >Ingresá tus datos</legend>
                <div className="formItem">
                    <label>Nombre:</label>
                    <input type="text" name="name" placeholder="Ingresa tu nombre" value={formData.name}/>
                </div>
                <div className="formItem">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="ejemplo@email.com" value={formData.email}/>
                </div>
                <div className="formItem">
                    <label>Teléfono:</label>
                    <input type="text" name="phone" placeholder="Ingresa tu telefono" value={formData.phone}/> 
                </div>
                <button>Terminar la compra!</button>
            </form>
        </div>
    )
    
}

export default Cart;