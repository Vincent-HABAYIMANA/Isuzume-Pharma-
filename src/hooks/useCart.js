import { useContext } from "react";
import CartContext from "../context/CartContext.jsx";

/** Short way for any component to read and change the cart. */
export default function useCart() {
  return useContext(CartContext);
}
