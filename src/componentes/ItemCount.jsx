import React, { useState } from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function ItemCount({stock,initial,onAdd}){
    const [count, setCount] = useState(initial)
    const [changeButton, setChangeButton] = useState(false)
    
    const disminuir=()=>{
        if(count>1){
            setCount(count-1)
        }else{
            alert("No puede elegir menor a 1")
        }
    }

    const aumentar = ()=>{
        if(count<stock){
            setCount(count+1)
        }else{
            alert("Alcanzo el maximo del stock disponible")
        }
    }

    const addManipulator = ()=>{
        onAdd(count)
        setChangeButton(true)
    }

    return (
        <div>
            <InputGroup className="mb-3">
                <Button variant="outline-primary" onClick={disminuir} disabled={count < 1}>-</Button>
                <FormControl className="text-center" aria-label="Example text with two button addons" value={count}/>
                <Button variant="outline-primary" onClick={aumentar} disabled={count>stock}>+</Button>
            </InputGroup>
            { changeButton 
            ? <Link to="/cart"><Button variant="outline-primary" >Terminar compra</Button></Link>
            : <Button variant="outline-primary" onClick={addManipulator}>Agregar al carrito</Button>
            }
        </div>
    )
}