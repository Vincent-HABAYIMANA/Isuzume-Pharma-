import { describe, expect, it } from "vitest";
import { validateCheckout, validatePhone } from "./validation.js";

describe("checkout validation", () => {
  it("accepts a Rwandan mobile number in the usual formats", () => {
    expect(validatePhone("0788123456")).toBe("");
    expect(validatePhone("+250788123456")).toBe("");
    expect(validatePhone("0722123456")).toBe("");
  });

  it("rejects a number that is not a Rwandan mobile number", () => {
    expect(validatePhone("12345")).not.toBe("");
    expect(validatePhone("")).not.toBe("");
  });

  it("marks every empty field of the form", () => {
    const { errors, isValid } = validateCheckout({
      name: "",
      phone: "",
      district: "",
      address: ""
    });

    expect(isValid).toBe(false);
    expect(Object.values(errors).every((message) => message !== "")).toBe(true);
  });

  it("passes a complete delivery address", () => {
    const { isValid } = validateCheckout({
      name: "Vincent Habayimana",
      phone: "0788123456",
      district: "Gasabo",
      address: "Kimironko, near the market gate"
    });

    expect(isValid).toBe(true);
  });
});
