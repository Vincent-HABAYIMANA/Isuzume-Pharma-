/**
 * Validation rules for the checkout form.
 * Each rule returns an error message, or an empty string when the value is valid.
 */

/** Rwandan mobile numbers: 078, 079, 072 or 073 followed by seven digits. */
const RWANDA_PHONE = /^(\+?25)?0?7[2389]\d{7}$/;

export function validateName(value) {
  const name = value.trim();
  if (name === "") return "Enter the name of the person receiving the order.";
  if (name.length < 3) return "The name is too short.";
  return "";
}

export function validatePhone(value) {
  const phone = value.replace(/[\s-]/g, "");
  if (phone === "") return "Enter a phone number so the rider can call you.";
  if (!RWANDA_PHONE.test(phone)) return "Use a Rwandan mobile number, for example 0788123456.";
  return "";
}

export function validateDistrict(value) {
  if (value.trim() === "") return "Choose the district where you want the delivery.";
  return "";
}

export function validateAddress(value) {
  const address = value.trim();
  if (address === "") return "Enter the sector, street or a landmark near you.";
  if (address.length < 5) return "Add a little more detail so the rider can find you.";
  return "";
}

/**
 * Validate the whole checkout form at once.
 * @param {{name:string, phone:string, district:string, address:string}} values
 * @returns {{errors: Object, isValid: boolean}}
 */
export function validateCheckout(values) {
  const errors = {
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    district: validateDistrict(values.district),
    address: validateAddress(values.address)
  };
  const isValid = Object.values(errors).every((message) => message === "");
  return { errors, isValid };
}
