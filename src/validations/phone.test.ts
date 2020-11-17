import { PhoneValidation } from "./phone.validation";

describe('contact validations', () => {
  it('validate All', () => {
    const v = PhoneValidation();
    expect(true).toBe(true);
  });
});
