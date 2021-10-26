import { Productos } from './ItemList';

export function ItemContainer ({title}){
    return(
        <div className="productos">
            <h1>{title}</h1>
            <div>
                <h2>Productos</h2> 
                <div className="productList">
                <Productos/>
                </div>
            </div>
        </div>
    )
}
