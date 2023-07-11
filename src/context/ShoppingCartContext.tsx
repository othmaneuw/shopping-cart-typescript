import { createContext, useContext, useEffect, useState } from "react";
import { CartOptions } from "../components/CartOptions";

interface Cart {
    id: number;
    quantity: number;
  }


interface ShoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  cartQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  cartItems : Cart[]
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

type ShoppingCartProps = {
  children: React.ReactNode;
};

export const ShoppingCartProvider = ({ children }: ShoppingCartProps) => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseItemQuantity = (id: number) => {
    //console.log('hello')
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeItem = (id: number) : void => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  const cartQuantity = cartItems.reduce((quantity, item) => {
    return quantity + item.quantity;
  }, 0);
  useEffect(() => {
    console.log(cartItems);
  });
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        cartQuantity,
        closeCart,
        openCart,
        cartItems
      }}
    >
      {children}
      <CartOptions isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
