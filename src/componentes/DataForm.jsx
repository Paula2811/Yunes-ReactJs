import { useCartContext } from "../context/CartContext"
import '../css/cart.css'

export function DataForm({generarOrden}){

    const {formData, handleChange} = useCartContext();
    const validacionemail = (e)=>{
        e.preventDefault()
        formData.email === formData.emailvalidation
            ? generarOrden()
            : alert("Los correos electrónicos ingresados no son iguales. Intentalo nuevamente")
    }
    return (
        <form onChange={handleChange} onSubmit={validacionemail}>
            <legend className="form-legend">Ingresá tus datos</legend>
            <div className="formItem">
                <label htmlFor="name" className="">Nombre:</label>
                <input type="text" name="name" placeholder="Ingresa tu nombre" defaultValue={formData.name} />
            </div>
            <div className="formItem">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" placeholder="ejemplo@email.com" defaultValue={formData.email} required/>
            </div>
            <div className="formItem">
                <label htmlFor="emailvalidation" className="form-label">Repetí tu Email</label>
                <input type="email" name="emailvalidation" placeholder="ejemplo@tuemail.com" defaultValue={formData.emailvalidation}/>
            </div>
            <div className="formItem">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input type="text" name="phone" placeholder="Ingresa tu telefono" defaultValue={formData.phone} required/> 
            </div>
            <button type="submit" className="formButton">Terminar la compra!</button>
        </form>
    )
}

