import {createContext, useState, useContext} from 'react'

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext);


const CartContextProvider = ({children}) =>{

    const [itemCantidad, setItemCantidad] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [cartList,setCartList] = useState([])
    const [formData, setFormData]= useState({name:"", email:"",validationemail:"",phone:""})

    const addToCartList = itemAgregado => {
        setItemCantidad(itemCantidad + itemAgregado.cantidad)
        setCartTotal(cartTotal + itemAgregado.cantidad * itemAgregado.product.price)
        const findItem = cartList.find(item => item.product.id === itemAgregado.product.id)        
        if (findItem) {
            findItem.cantidad = findItem.cantidad + itemAgregado.cantidad
            setCartList(cartList)
        }
        else {
            setCartList(previousItems => [...previousItems, itemAgregado])
        }
    }

    const removeItem = idItemToRemove => {
        const itemToRemove = cartList.find(itemInCart => itemInCart.product.id === idItemToRemove)
        setItemCantidad(itemCantidad - itemToRemove.cantidad)
        setCartTotal(cartTotal - (itemToRemove.product.price * itemToRemove.cantidad))
        setCartList(cartList.filter(itemBuscado => itemBuscado.product.id !== idItemToRemove))
    }

    const removeCart = () => {
        setItemCantidad(0)
        setCartTotal (0)
        setCartList([])
    }
    const handleChange = (e) =>{
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }
    return(
        <CartContext.Provider value ={{
            cartList,
            addToCartList,
            removeItem,
            removeCart,
            itemCantidad,
            cartTotal,
            formData,
            handleChange
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider