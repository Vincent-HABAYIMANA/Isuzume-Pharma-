import { createContext } from "react";

/**
 * Shape of the cart context. The default values are only used when a component
 * is rendered outside CartProvider, which should not happen in this app.
 */
const CartContext = createContext({
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  hasPrescriptionItems: false,
  addItem: () => {},
  decreaseItem: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

export default CartContext;
