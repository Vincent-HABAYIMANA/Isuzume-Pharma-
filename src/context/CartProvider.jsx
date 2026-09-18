import { useEffect, useMemo, useReducer } from "react";
import CartContext from "./CartContext.jsx";
import { cartReducer, initialCartState } from "./cartReducer.js";

const STORAGE_KEY = "isuzume-pharma.cart";

/** Read a cart saved by a previous visit, so a refresh does not lose the order. */
function loadSavedItems() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Restore the saved cart once, when the application starts.
  useEffect(() => {
    const savedItems = loadSavedItems();
    if (savedItems.length > 0) {
      dispatch({ type: "REPLACE_CART", items: savedItems });
    }
  }, []);

  // Keep the saved cart in step with what is on screen.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState.items));
    } catch (error) {
      // Saving is a convenience only; ignore storage errors.
    }
  }, [cartState.items]);

  const value = useMemo(
    () => ({
      items: cartState.items,
      totalQuantity: cartState.totalQuantity,
      subtotal: cartState.subtotal,
      hasPrescriptionItems: cartState.items.some((item) => item.prescription),
      addItem: (product, quantity = 1) => dispatch({ type: "ADD_ITEM", product, quantity }),
      decreaseItem: (id) => dispatch({ type: "DECREASE_ITEM", id }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
      clearCart: () => dispatch({ type: "CLEAR_CART" })
    }),
    [cartState]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
