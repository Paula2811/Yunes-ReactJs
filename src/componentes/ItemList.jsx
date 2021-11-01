import { Item } from './Item';

export function ItemList ({product}){
    
    return (
        <>         
            {        
                    product.map(product=> <Item key={product.id} product={product}/>
            )
            }
        </>
    )
}
