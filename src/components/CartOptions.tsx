import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from '../data/items.json';
import { useState } from "react";

type CartOptionsProps = {
    isOpen : boolean
}

export function CartOptions({isOpen}:CartOptionsProps){
    const {closeCart,cartItems,clearCart} = useShoppingCart();
    const [phone,setPhone] = useState<string>("");
    const [error,setError] = useState<boolean>(false);
    const handleClick = () =>{
        if(phone.match(/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g)){
            setError(false);
            clearCart();
        }else{
           setError(true);
        }
    }
    return(
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item =>(
                        <CartItem key={item.id} {...item} />
                    ))}
                </Stack>
                <div className="ms-auto fs-5 fw-bold">
                    Total : {formatCurrency(cartItems.reduce((total,cartItem)=>{
                        const item = storeItems.find(i => i.id === cartItem.id);
                        return total + ((item?.price || 0) * cartItem.quantity);
                    },0))}
                </div>
                <br></br>
                <br></br>
                <input type="text" style={{
                    width:"100%",
                    borderRadius:"5px",
                    padding : "5px 3px",
                    border : "1px solid gray",
                    color:"gray",
                    fontWeight:"bold"
                }} placeholder="entrez votre numero de telephone (+212)" 
                   value={phone}
                   onChange={e =>setPhone(e.target.value)}
                />
                <button style={{
                    marginTop:"10px",
                    border : "none",
                    background : "green",
                    fontWeight : "bold",
                    color : "white",
                    padding: "5px 10px",
                    borderRadius : "5px"
                }} onClick={handleClick}>Valider la commande</button>
                <br></br>
                {error && <p style={{color:"red"}}>Veuillez entrer un numero de telephone</p>}
            </Offcanvas.Body>

        </Offcanvas>
    )
} 