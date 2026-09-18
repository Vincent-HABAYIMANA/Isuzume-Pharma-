/**
 * Cart reducer.
 *
 * Written as a pure function: it receives the current state and an action and
 * returns the next state, without touching React. That makes the shopping
 * rules easy to test (see src/context/cartReducer.test.js).
 */

export const initialCartState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0
};

/** Maximum units of one product a customer may order in a single online order. */
export const MAX_UNITS_PER_ITEM = 5;

function summarise(items) {
  return {
    items,
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0)
  };
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action;
      const limit = Math.min(MAX_UNITS_PER_ITEM, product.stock);
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index === -1) {
        const newItem = {
          id: product.id,
          name: product.name,
          strength: product.strength,
          form: product.form,
          price: product.price,
          prescription: product.prescription,
          stock: product.stock,
          quantity: Math.min(quantity, limit)
        };
        return summarise([...state.items, newItem]);
      }

      const updatedItems = [...state.items];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: Math.min(updatedItems[index].quantity + quantity, limit)
      };
      return summarise(updatedItems);
    }

    case "DECREASE_ITEM": {
      const index = state.items.findIndex((item) => item.id === action.id);
      if (index === -1) return state;

      const existing = state.items[index];
      if (existing.quantity <= 1) {
        return summarise(state.items.filter((item) => item.id !== action.id));
      }

      const updatedItems = [...state.items];
      updatedItems[index] = { ...existing, quantity: existing.quantity - 1 };
      return summarise(updatedItems);
    }

    case "REMOVE_ITEM":
      return summarise(state.items.filter((item) => item.id !== action.id));

    case "CLEAR_CART":
      return initialCartState;

    case "REPLACE_CART":
      return summarise(action.items ?? []);

    default:
      return state;
  }
}
