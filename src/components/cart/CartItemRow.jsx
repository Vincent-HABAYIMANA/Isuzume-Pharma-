import { formatPrice } from "../../utils/format.js";

/** One line of the cart, with the controls that change its quantity. */
const CartItemRow = ({ item, onIncrease, onDecrease, onRemove }) => (
  <li className="cart-row">
    <div className="cart-row-main">
      <h3>
        {item.name} <span>{item.strength}</span>
      </h3>
      <p className="cart-row-unit">
        {formatPrice(item.price)} each
        {item.prescription && <span className="rx-badge rx-badge--small">Rx</span>}
      </p>
    </div>

    <div className="cart-row-controls">
      <button type="button" onClick={onDecrease} aria-label={`Remove one ${item.name}`}>
        &minus;
      </button>
      <span className="cart-quantity" aria-label={`Quantity ${item.quantity}`}>
        {item.quantity}
      </span>
      <button type="button" onClick={onIncrease} aria-label={`Add one ${item.name}`}>
        +
      </button>
    </div>

    <div className="cart-row-total">
      <p>{formatPrice(item.price * item.quantity)}</p>
      <button type="button" className="link-button" onClick={onRemove}>
        Remove
      </button>
    </div>
  </li>
);

export default CartItemRow;
