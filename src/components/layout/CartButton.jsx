import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart.js";

/** Cart button in the header. It gives a short nudge whenever the cart changes. */
const CartButton = ({ onClick }) => {
  const { totalQuantity } = useCart();
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    if (totalQuantity === 0) return undefined;

    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 280);
    return () => clearTimeout(timer);
  }, [totalQuantity]);

  return (
    <button
      type="button"
      className={`cart-button ${isBumping ? "cart-button--bump" : ""}`}
      onClick={onClick}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        />
      </svg>
      <span>Cart</span>
      <span className="cart-count" aria-label={`${totalQuantity} items in cart`}>
        {totalQuantity}
      </span>
    </button>
  );
};

export default CartButton;
