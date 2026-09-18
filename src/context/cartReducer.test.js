import { describe, expect, it } from "vitest";
import { cartReducer, initialCartState, MAX_UNITS_PER_ITEM } from "./cartReducer.js";

const paracetamol = {
  id: "isz-001",
  name: "Paracetamol",
  strength: "500 mg",
  form: "tablet",
  price: 1200,
  prescription: false,
  stock: 84
};

describe("cartReducer", () => {
  it("adds a new product and keeps the totals in step", () => {
    const state = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      product: paracetamol,
      quantity: 2
    });

    expect(state.items).toHaveLength(1);
    expect(state.totalQuantity).toBe(2);
    expect(state.subtotal).toBe(2400);
  });

  it("increases the quantity instead of repeating the same product", () => {
    const first = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      product: paracetamol,
      quantity: 1
    });
    const second = cartReducer(first, { type: "ADD_ITEM", product: paracetamol, quantity: 2 });

    expect(second.items).toHaveLength(1);
    expect(second.items[0].quantity).toBe(3);
  });

  it("never goes above the legal limit per product", () => {
    const state = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      product: paracetamol,
      quantity: 50
    });

    expect(state.items[0].quantity).toBe(MAX_UNITS_PER_ITEM);
  });

  it("removes the line when the last unit is taken away", () => {
    const withItem = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      product: paracetamol,
      quantity: 1
    });
    const emptied = cartReducer(withItem, { type: "DECREASE_ITEM", id: paracetamol.id });

    expect(emptied.items).toHaveLength(0);
    expect(emptied.subtotal).toBe(0);
  });

  it("empties the cart after an order is placed", () => {
    const withItem = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      product: paracetamol,
      quantity: 3
    });

    expect(cartReducer(withItem, { type: "CLEAR_CART" })).toEqual(initialCartState);
  });
});
