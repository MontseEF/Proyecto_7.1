/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer, useCallback } from "react";

export const CartContext = createContext(null);

const initial = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.payload || {};
      const id = p.id ?? p._id ?? p.name ?? p.title;
      if (!id) return state; // si no hay id, no agregamos

      const i = state.findIndex((x) => x.id === id);
      if (i >= 0) {
        const copy = [...state];
        copy[i] = { ...copy[i], quantity: copy[i].quantity + 1 };
        return copy;
      }
      return [
        ...state,
        {
          id,
          title: p.title ?? p.name ?? "Producto",
          price: Number(p.price) || 0,
          imageUrl: p.imageUrl ?? p.img ?? p.image ?? "/placeholder.png",
          stock: typeof p.stock === "number" ? p.stock : 99,
          quantity: 1,
        },
      ];
    }

    case "INC": {
      const id = action.payload;
      return state.map((x) => (x.id === id ? { ...x, quantity: x.quantity + 1 } : x));
    }

    case "DEC": {
      const id = action.payload;
      return state
        .map((x) => (x.id === id ? { ...x, quantity: Math.max(0, x.quantity - 1) } : x))
        .filter((x) => x.quantity > 0);
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

  // acciones
  const add = useCallback((p) => dispatch({ type: "ADD", payload: p }), []);
  const inc = useCallback((id) => dispatch({ type: "INC", payload: id }), []);
  const dec = useCallback((id) => dispatch({ type: "DEC", payload: id }), []);
  const remove = useCallback((id) => dispatch({ type: "REMOVE", payload: id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  // selectores
  const qtyById = useCallback((id) => items.find((x) => x.id === id)?.quantity || 0, [items]);
  const totalItems = useCallback(() => items.reduce((s, it) => s + it.quantity, 0), [items]);
  const totalPrice = useCallback(
    () => items.reduce((s, it) => s + it.quantity * (Number(it.price) || 0), 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, add, inc, dec, remove, clear, qtyById, totalItems, totalPrice }),
    [items, add, inc, dec, remove, clear, qtyById, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
