import React from 'react';
import ItemDetail from './ItemDetail';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getFirestore } from '../services/getFirestore';


const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({})
    const {id} = useParams()

    useEffect(() =>{
        const db = getFirestore()
        const dbQuery = db.collection('items').doc(id).get()
        dbQuery
        .then (item => {
            setDetail({id:item.id, ...item.data()})
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