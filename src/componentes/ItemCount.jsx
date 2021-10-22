import React, { useState } from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap';

export default function ItemCount({stock,initial,onAdd}){
    const [count, setCount] = useState(initial)

    const disminuir=()=>{
        if(count>1){
            setCount(count-1)
        }else{
            console.log("No puede elegir menor a 1")
        }
    }

    const aumentar = ()=>{
        if(count<stock){
            setCount(count+1)
        }else{
            console.log("Alcanzo el maximo del stock disponible")
        }
    }


    return (
        <div>
            <InputGroup className="mb-3">
                <Button variant="outline-primary" onClick={disminuir} disabled={count < 1}>-</Button>
                <FormControl className="text-center" aria-label="Example text with two button addons" value={count}/>
                <Button variant="outline-primary" onClick={aumentar} disabled={count>stock}>+</Button>
            </InputGroup>
            <Button variant="primary" onClick={()=>onAdd(count)}>Agregar al Carrito</Button>
        </div>
    )
}