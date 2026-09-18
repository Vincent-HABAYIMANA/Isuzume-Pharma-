import { useState } from "react";
import FormField from "../ui/FormField.jsx";
import deliveryZones from "../../data/districts.js";
import { validateCheckout } from "../../utils/validation.js";

const EMPTY_FORM = {
  name: "",
  phone: "",
  district: "",
  address: "",
  notes: ""
};

const EMPTY_ERRORS = { name: "", phone: "", district: "", address: "" };

/** Delivery details collected before the order is sent to the pharmacy. */
const CheckoutForm = ({ onConfirm, onBack, onDistrictChange, isSending }) => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((previous) => ({ ...previous, [field]: value }));

    // Clear the message for a field as soon as the customer edits it.
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: "" }));
    if (field === "district") onDistrictChange(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors: nextErrors, isValid } = validateCheckout(values);
    setErrors(nextErrors);
    if (isValid) onConfirm(values);
  };

  return (
    <form className="checkout" onSubmit={handleSubmit} noValidate>
      <FormField id="checkout-name" label="Full name" error={errors.name}>
        <input
          id="checkout-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange("name")}
          aria-invalid={Boolean(errors.name)}
        />
      </FormField>

      <FormField
        id="checkout-phone"
        label="Phone number"
        hint="The rider and the pharmacist will call this number."
        error={errors.phone}
      >
        <input
          id="checkout-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0788123456"
          value={values.phone}
          onChange={handleChange("phone")}
          aria-invalid={Boolean(errors.phone)}
        />
      </FormField>

      <FormField id="checkout-district" label="District" error={errors.district}>
        <select
          id="checkout-district"
          value={values.district}
          onChange={handleChange("district")}
          aria-invalid={Boolean(errors.district)}
        >
          <option value="">Choose a district</option>
          {deliveryZones.map((zone) => (
            <option key={zone.district} value={zone.district}>
              {zone.district}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="checkout-address"
        label="Sector, street or landmark"
        hint="For example: Kimironko, near the market gate."
        error={errors.address}
      >
        <input
          id="checkout-address"
          type="text"
          value={values.address}
          onChange={handleChange("address")}
          aria-invalid={Boolean(errors.address)}
        />
      </FormField>

      <FormField id="checkout-notes" label="Note for the pharmacist (optional)">
        <textarea
          id="checkout-notes"
          rows="2"
          value={values.notes}
          onChange={handleChange("notes")}
        />
      </FormField>

      <div className="modal-actions">
        <button type="button" className="button button--quiet" onClick={onBack} disabled={isSending}>
          Back to cart
        </button>
        <button type="submit" className="button" disabled={isSending}>
          {isSending ? "Sending order..." : "Place order"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
