import products from "../data/products.js";

/**
 * Catalogue service.
 *
 * The rest of the application talks to this module instead of talking to the
 * data file directly. It returns a Promise, exactly like a real HTTP call, so
 * the day a back-end is added only this file has to change.
 */

const NETWORK_DELAY_MS = 450;

export function fetchProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // A copy is returned so that no component can modify the catalogue.
        resolve(products.map((product) => ({ ...product })));
      } catch (error) {
        reject(new Error("The catalogue could not be loaded. Please try again."));
      }
    }, NETWORK_DELAY_MS);
  });
}
