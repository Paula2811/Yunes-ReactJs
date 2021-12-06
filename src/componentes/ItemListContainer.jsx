import { ItemList} from './ItemList';
import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import { getFirestore } from '../services/getFirestore';

export function ItemContainer ({title}){
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const {idCategorias} = useParams()
    useEffect(() =>{
        const db = getFirestore()
        
        if(idCategorias){
            const dbQuery = db.collection("items").where("categoria", "==", idCategorias).get()
            dbQuery
            .then (res => {
                setProduct(res.docs.map(item => ({id:item.id, ...item.data()})))
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
        }else{
            const dbQuery = db.collection("items").orderBy("categoria").get()
            dbQuery
            .then (res => {
                setProduct(res.docs.map(item => ({id:item.id, ...item.data()})))
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
        }
        
    },[idCategorias])
    return(
        <div>
            <div className="productos">
                <h1>{title}</h1>
                <div>
                    <h2>Productos</h2> 
                    <div className="productList">
                    {loading
                    ? <h2 className="loading">Loading...</h2>
                    : <ItemList product={product}/>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
