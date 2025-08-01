import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";


export type CartActions = 
   { type: 'ADD_TO_CART', payload: {item:Guitar}}|
   { type: 'REMOVE_FROM_CART', payload: {id: Guitar['id']} }| // Assuming payload is the guitar ID
   { type: 'INCREMENT_QUANTITY', payload: {id: Guitar['id']} }| // Assuming payload is the guitar ID
   { type: 'DECREMENT_QUANTITY', payload: {id: Guitar['id']} }| // Assuming payload is the guitar ID
   { type: 'CLEAR_CART' };


   export type CartState = {
    data: Guitar[],
    cart: CartItem[]
   }

   export const initialState: CartState = {
    data: db,
    cart: []
   }

   export const cartReducer = (
    state: CartState = initialState, 
    action: CartActions)=> {
    
      if (action.type === 'ADD_TO_CART') {

        return{
          ...state
        }
      }

      if(action.type === 'REMOVE_FROM_CART') {
       
        return {
          ...state,
        };
      }

      if (action.type === 'INCREMENT_QUANTITY') {
        return {
          ...state,
        };
      }
      if (action.type === 'DECREMENT_QUANTITY') {
        return {
          ...state,
        };
      }
      if (action.type === 'CLEAR_CART') {
        return {
          ...state,
          cart: []
        };
      }
      return state; // Return the current state if no action matches
    }
  