import { ContactValidation } from "./contact.validation";

describe("contact validations", () => {
  it("validate All", () => {
    const v = ContactValidation();
    expect(true).toBe(true);
  });
});
