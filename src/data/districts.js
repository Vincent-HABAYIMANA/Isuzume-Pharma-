/** Districts served by Isuzume Pharma, with the delivery fee in RWF. */
const deliveryZones = [
  { district: "Gasabo", fee: 1500 },
  { district: "Kicukiro", fee: 1500 },
  { district: "Nyarugenge", fee: 1500 },
  { district: "Bugesera", fee: 3000 },
  { district: "Kamonyi", fee: 3000 },
  { district: "Rwamagana", fee: 3500 }
];

export const FREE_DELIVERY_FROM = 30000;

/**
 * Delivery fee for a district. Orders above FREE_DELIVERY_FROM are delivered free.
 * @param {string} district
 * @param {number} subtotal
 * @returns {number}
 */
export function deliveryFeeFor(district, subtotal) {
  if (subtotal >= FREE_DELIVERY_FROM) return 0;
  const zone = deliveryZones.find((item) => item.district === district);
  return zone ? zone.fee : 0;
}

export default deliveryZones;
