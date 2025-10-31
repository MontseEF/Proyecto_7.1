/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer, useCallback } from "react";

export const CartContext = createContext(null);

const initial = [];
function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const i = state.findIndex((x) => x.id === action.payload.id);
      if (i >= 0) {
        const copy = [...state];
        copy[i] = { ...copy[i], quantity: copy[i].quantity + 1 };
        return copy;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter((x) => x.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, initial);

  const add = useCallback((p) => dispatch({ type: "ADD", payload: p }), []);
  const remove = useCallback((id) => dispatch({ type: "REMOVE", payload: id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totalItems = useCallback(() => items.reduce((s, it) => s + it.quantity, 0), [items]);
  const totalPrice = useCallback(() => items.reduce((s, it) => s + it.quantity * it.price, 0), [items]);

  const value = useMemo(
    () => ({ items, add, remove, clear, totalItems, totalPrice }),
    [items, add, remove, clear, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
