import { renderHook, act } from '@testing-library/react-hooks';
import { emptyPhone, Phone } from 'types/phone.type';
import { PhoneValidation } from './phone.validation';

describe('phone validations', () => {
  describe('validate All', () => {
    it('validates a valid payload', () => {
      const { result } = renderHook(() => PhoneValidation());
      const pet: Phone = {
        ...emptyPhone(),
        number: '1231231234',
        description: 'cell',
      };
      act(() => {
        result.current.validateAll(pet);
      });
      expect(result.current.validationErrors).toEqual([]);
      expect(result.current.isValid).toBe(true);
    });
  });
});
