/** Small formatting helpers shared by the whole application. */

const numberFormatter = new Intl.NumberFormat("en-RW");

/**
 * Format an amount in Rwandan Francs, e.g. 6500 -> "6,500 RWF".
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `${numberFormatter.format(safeAmount)} RWF`;
}

/**
 * Build a human readable order reference, e.g. "ISZ-20260917-4821".
 * @param {Date} [date]
 * @returns {string}
 */
export function buildOrderReference(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `ISZ-${year}${month}${day}-${random}`;
}
