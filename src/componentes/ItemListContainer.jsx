import { ItemList} from './ItemList';
import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import {Productos} from '../services/getFetch';

export function ItemContainer ({title}){
    const [product, setProduct] = useState([])
    const {idCategorias} = useParams()
    useEffect(() =>{
        if(idCategorias){
            Productos
            .then (res => {
                console.log("Llamada a la base de datos");
                setProduct(res.filter(prod=>prod.categoria === idCategorias))
            })
            .catch(err => console.log(err))
        }else{
            Productos
            .then (res => {
                console.log("Llamada a la base de datos");
                setProduct(res)
            })
            .catch(err => console.log(err))
        }
        
    },[idCategorias])
    console.log(idCategorias)
    return(
        <div>
            <div className="productos">
                <h1>{title}</h1>
                <div>
                    <h2>Productos</h2> 
                    <div className="productList">
                    <ItemList product={product}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
