import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  console.log(quantity);
  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={imgUrl}
          height="200px"
          style={{ objectFit: "cover", gap: "3" }}
        ></Card.Img>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline">
            <span className="fs-2">{name}</span>
            <span className="text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div>
            {quantity === 0 ? (
              <Button className="w-100" onClick={()=> increaseItemQuantity(id)}>+ Add To Cart</Button>
            ) : (
              <div
                className="d-flex flex-column align-items-center"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={()=>decreaseItemQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span> In cart
                  </div>
                  <Button onClick={()=>increaseItemQuantity(id)}>+</Button>
                </div>
                <Button variant="danger" onClick={()=>removeItem(id)}>Remove</Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
