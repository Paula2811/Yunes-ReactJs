import React from 'react';
import ItemDetail from './ItemDetail';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import GetFetchDetail from '../services/getFetchDetail';


const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({})
    const {id} = useParams()

    useEffect(() =>{
        GetFetchDetail
        .then (res => {
            console.log("Llamada a la base de datos");
            setDetail(res.find(prod => prod.id === id))
        })
        .catch(err => console.log(err))
    },[id])
    return(
        <div>
            <div className="productos">
                <div>
                    <h2>Detalle del Producto</h2> 
                    <div className="productList">
                    <ItemDetail product={detail}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ItemDetailContainer