import React from 'react';
import GetFetchDetail from "../services/getFetchDetail";
import ItemDetail from './ItemDetail';
import { useState, useEffect } from 'react';


const ItemDetailContainer = () => {
    const [detalle, setDetalle] = useState([])
    useEffect(() =>{
        GetFetchDetail.then (res => {
            console.log("Llamada a la base de datos");
            setDetalle(res)
        })
        .catch(err => console.log(err))
    },[])
    return(
        <>
            <h2>Detalle del Producto</h2>
            <div className="productList">
            <ItemDetail detalle={detalle} />
            </div>
            
        </>
    )
}

export default ItemDetailContainer