import { renderHook, act } from '@testing-library/react-hooks';
import { ContactValidation } from './contact.validation';
import { Contact, emptyContact } from 'types/Contact.type';
import { emptyPhone } from 'types/Phone.type';

describe('contact validations', () => {
  describe('allValid', () => {
    it('validates a valid payload', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...emptyContact(),
        name: 'bob ross',
        phones: [
          {
            ...emptyPhone(),
            number: '(123) 123 - 1234',
            description: 'cell',
          },
        ],
      };
      act(() => {
        result.current.validateAll(contact);
      });
      expect(result.current.validationErrors).toEqual([]);
      expect(result.current.isValid).toBe(true);
    });
  });
});
