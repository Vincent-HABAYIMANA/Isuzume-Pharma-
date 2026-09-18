import { useState } from "react";
import useCart from "../../hooks/useCart.js";
import DosageIcon from "../ui/DosageIcon.jsx";
import { MAX_UNITS_PER_ITEM } from "../../context/cartReducer.js";
import { formatPrice } from "../../utils/format.js";

/** One product, presented like the label on a medicine box. */
const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const limit = Math.min(MAX_UNITS_PER_ITEM, product.stock);
  const isOutOfStock = product.stock === 0;

  const handleAdd = (event) => {
    event.preventDefault();
    if (isOutOfStock) return;

    addItem(product, quantity);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 1600);
  };

  return (
    <li className={`product-card ${product.prescription ? "product-card--rx" : ""}`}>
      <div className="product-top">
        <span className="product-icon">
          <DosageIcon form={product.form} />
        </span>
        <span className="product-form">{product.form}</span>
        {product.prescription && <span className="rx-badge">Rx</span>}
      </div>

      <h3 className="product-name">
        {product.name} <span className="product-strength">{product.strength}</span>
      </h3>
      <p className="product-description">{product.description}</p>

      <dl className="product-meta">
        <div>
          <dt>Pack</dt>
          <dd>{product.packSize}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{product.category}</dd>
        </div>
      </dl>

      <div className="product-price-row">
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className={`product-stock ${product.stock < 15 ? "product-stock--low" : ""}`}>
          {isOutOfStock
            ? "Out of stock"
            : product.stock < 15
              ? `Only ${product.stock} left`
              : "In stock"}
        </p>
      </div>

      <form className="product-actions" onSubmit={handleAdd}>
        <label htmlFor={`quantity-${product.id}`} className="sr-only">
          Quantity of {product.name}
        </label>
        <input
          id={`quantity-${product.id}`}
          type="number"
          min="1"
          max={limit || 1}
          step="1"
          value={quantity}
          disabled={isOutOfStock}
          onChange={(event) => {
            const next = Number(event.target.value);
            setQuantity(Math.min(Math.max(next || 1, 1), limit || 1));
          }}
        />
        <button type="submit" className="button" disabled={isOutOfStock}>
          {confirmed ? "Added" : "Add to cart"}
        </button>
      </form>

      {product.prescription && (
        <p className="product-note">A pharmacist will ask for your prescription before delivery.</p>
      )}
    </li>
  );
};

export default ProductCard;
