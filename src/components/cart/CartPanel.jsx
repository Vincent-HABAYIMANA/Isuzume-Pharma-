import { useState } from "react";
import CartItemRow from "./CartItemRow.jsx";
import CheckoutForm from "./CheckoutForm.jsx";
import Modal from "../ui/Modal.jsx";
import useCart from "../../hooks/useCart.js";
import { deliveryFeeFor, FREE_DELIVERY_FROM } from "../../data/districts.js";
import { submitOrder } from "../../services/orderService.js";
import { formatPrice } from "../../utils/format.js";

/**
 * The cart dialog. It moves through four stages:
 * cart -> checkout -> sending -> confirmed.
 */
const CartPanel = ({ onClose }) => {
  const cart = useCart();
  const [stage, setStage] = useState("cart");
  const [district, setDistrict] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const deliveryFee = deliveryFeeFor(district, cart.subtotal);
  const total = cart.subtotal + deliveryFee;
  const isEmpty = cart.items.length === 0;

  const handleConfirm = (customer) => {
    setStage("sending");
    setSubmitError("");

    const fee = deliveryFeeFor(customer.district, cart.subtotal);

    submitOrder({
      customer,
      items: cart.items,
      subtotal: cart.subtotal,
      deliveryFee: fee,
      total: cart.subtotal + fee
    })
      .then((result) => {
        setConfirmation({ ...result, customer, total: cart.subtotal + fee });
        setStage("confirmed");
        cart.clearCart();
      })
      .catch((error) => {
        setSubmitError(error.message);
        setStage("checkout");
      });
  };

  if (stage === "confirmed" && confirmation) {
    return (
      <Modal title="Order received" onClose={onClose}>
        <div className="confirmation">
          <p className="confirmation-lead">
            Thank you {confirmation.customer.name.split(" ")[0]}. Your order is with our pharmacist.
          </p>
          <p className="confirmation-reference">
            Order reference
            <strong>{confirmation.reference}</strong>
          </p>
          <p>
            We will call {confirmation.customer.phone} within 30 minutes to confirm the delivery to{" "}
            {confirmation.customer.address}, {confirmation.customer.district}. Keep{" "}
            {formatPrice(confirmation.total)} ready for the rider.
          </p>
          <div className="modal-actions">
            <button type="button" className="button" onClick={onClose}>
              Continue shopping
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Your cart" onClose={onClose}>
      {isEmpty ? (
        <div className="state state--empty">
          <p>Your cart is empty.</p>
          <button type="button" className="button" onClick={onClose}>
            Browse the medicines
          </button>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={() => cart.addItem(item, 1)}
                onDecrease={() => cart.decreaseItem(item.id)}
                onRemove={() => cart.removeItem(item.id)}
              />
            ))}
          </ul>

          <div className="cart-summary">
            <div>
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            <div>
              <span>Delivery</span>
              <span>
                {district === ""
                  ? "Choose a district"
                  : deliveryFee === 0
                    ? "Free"
                    : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            {cart.subtotal < FREE_DELIVERY_FROM && (
              <p className="cart-hint">
                Add {formatPrice(FREE_DELIVERY_FROM - cart.subtotal)} more for free delivery.
              </p>
            )}
          </div>

          {cart.hasPrescriptionItems && (
            <p className="rx-notice">
              Your cart contains prescription medicines. A pharmacist will call you and receive your
              prescription before these items are dispensed.
            </p>
          )}

          {submitError && (
            <p className="field-error" role="alert">
              {submitError}
            </p>
          )}

          {stage === "cart" && (
            <div className="modal-actions">
              <button type="button" className="button button--quiet" onClick={onClose}>
                Keep shopping
              </button>
              <button type="button" className="button" onClick={() => setStage("checkout")}>
                Checkout
              </button>
            </div>
          )}

          {(stage === "checkout" || stage === "sending") && (
            <CheckoutForm
              onConfirm={handleConfirm}
              onBack={() => setStage("cart")}
              onDistrictChange={setDistrict}
              isSending={stage === "sending"}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default CartPanel;
