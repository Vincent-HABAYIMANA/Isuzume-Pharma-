import { buildOrderReference } from "../utils/format.js";

/**
 * Order service.
 *
 * Orders are stored in the browser (localStorage) so the application can be
 * demonstrated without a server. Replace the body of submitOrder with a fetch
 * call to the pharmacy API when the back-end is ready.
 */

const STORAGE_KEY = "isuzume-pharma.orders";
const PROCESSING_DELAY_MS = 900;

function readOrders() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function writeOrders(orders) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    // Storage can be full or blocked in private mode. The order still succeeds
    // for the customer, so the failure is ignored on purpose.
  }
}

/**
 * Send an order to the pharmacy.
 * @param {{customer: Object, items: Array, subtotal: number, deliveryFee: number, total: number}} order
 * @returns {Promise<{reference: string, placedAt: string}>}
 */
export function submitOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order.items || order.items.length === 0) {
        reject(new Error("The cart is empty, so there is nothing to order."));
        return;
      }

      const record = {
        ...order,
        reference: buildOrderReference(),
        placedAt: new Date().toISOString(),
        status: "received"
      };

      writeOrders([record, ...readOrders()]);
      resolve({ reference: record.reference, placedAt: record.placedAt });
    }, PROCESSING_DELAY_MS);
  });
}

/** All orders placed on this device, newest first. */
export function getOrderHistory() {
  return readOrders();
}
