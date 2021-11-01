import { ItemList} from './ItemList';
import {useEffect,useState} from 'react';
import {Productos} from '../services/getFetch';

export function ItemContainer ({title}){
    const [product, setProduct] = useState([])
    useEffect(() =>{
        Productos.then (res => {
            console.log("Llamada a la base de datos");
            setProduct(res)
        })
        .catch(err => console.log(err))
    },[])
    console.log(product)
    return(
        <div className="productos">
            <h1>{title}</h1>
            <div>
                <h2>Productos</h2> 
                <div className="productList">
                <ItemList product={product}/>
                </div>
            </div>
        </div>
    )
}
