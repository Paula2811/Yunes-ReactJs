import {BsFillCartCheckFill} from 'react-icons/bs'
import {useCartContext } from '../../context/CartContext'; 
import './CartWidget.css'

export function Icon (){
    const {itemCantidad} = useCartContext()
    return(
        <div className="icon">
            <BsFillCartCheckFill/>
            <span  className={
                itemCantidad>0 
                ? "badge bg-dark text-white ms-1 rounded-pill"
                : "hideCartWidget"
            }>{itemCantidad}</span>
        </div>
    )
}

