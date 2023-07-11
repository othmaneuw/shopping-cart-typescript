import { Button, Stack } from "react-bootstrap";
import storeItems from '../data/items.json';
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type CartItemProps = {
    id : number,
    quantity : number
}

export function CartItem({id , quantity}:CartItemProps){
    const item = storeItems.find(i => i.id === id)!;
    const {removeItem} = useShoppingCart();
    return(
        <Stack direction="horizontal" gap={2}>
            <div>
                <img src={item?.imgUrl} style={{width : "125px",height:"75px",objectFit:"cover"}} />
            </div>
            <div className="me-auto">
                <div>
                    {item?.name}
                </div>
                <div className="text-muted fs-8 d-flex align-items-center" style={{gap:"3px"}}>
                    {formatCurrency(item.price)}
                    {quantity > 1 && <span style={{fontSize:"12px"}}>{quantity}x</span>}
                </div>
            </div>
            <div>
                {formatCurrency(quantity*item.price)}
                <Button variant="outline-danger" size="sm" onClick={()=> removeItem(id)}>X</Button>
            </div>
        </Stack>
    )
}