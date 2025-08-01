import { useState, useEffect,  useMemo  } from "react";
import type {CartItem, Guitar} from '../types/index.js';


const useCart = () => {
  
   const initialCart= () : CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];  
  }


  const [cart, setCart] = useState(initialCart);


// Constants for maximum and minimum item quantities
  const MAX_ITEM = 5; // Maximum quantity allowed for each item
  const MIN_ITEM = 1; // Minimum quantity allowed for each item

  useEffect(()=>{
      localStorage.setItem("cart", JSON.stringify(cart)); 
  },[cart]);

  function addToCart(item : Guitar) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      const updateCart = [...cart];
      updateCart[itemExists].quantity += 1; // Increment quantity if item already exists
      setCart(updateCart);
    } else {
      const newItem : CartItem = { ...item, quantity: 1 }; 
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id:Guitar['id']) {
    setCart( prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  function incrementQuantity(id:Guitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEM) { // Limit quantity to a maximum of 10
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);  
  }
  function decrementQuantity(id:Guitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEM) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }
   
  function clearCart() {
    setCart([]);  
  }
  // Calcular el total del carrito
   const isEmpty =useMemo(() => cart.length === 0, [cart]); // State derivado
  const cartTotal =useMemo (() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);
  
  
  return {
 
    cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };


  
}

export default useCart
