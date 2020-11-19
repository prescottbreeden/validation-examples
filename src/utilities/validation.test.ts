import { formatPhone } from './validation.utils';

describe('formatPhone', () => {
  it('returns a formatted 10-digit phone number', () => {
    const phone = '1231231234';
    const expected = '(123) 123 - 1234';
    expect(formatPhone(phone)).toBe(expected);
  });
  it('returns the existing number if less than 10 digits', () => {
    const phone = '123123123';
    expect(formatPhone(phone)).toBe(phone);
  });
});
