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

  describe('name', () => {
    it('fails if no name is provided', () => {
      const { result } = renderHook(() => ContactValidation());
      act(() => {
        const output = result.current.validate('name', '');
        expect(output).toBe(false);
      });
    });
  });

  describe('subscriptionEmail', () => {
    it('fails if isSubcribed and no subscriptionEmail is provided', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...emptyContact(),
        isSubcribed: true,
        subscriptionEmail: '',
      };
      act(() => {
        const output = result.current.validate(
          'subscriptionEmail',
          '',
          contact
        );
        expect(output).toBe(false);
      });
    });
    it('passes if isSubcribed and subscriptionEmail is provided', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...emptyContact(),
        isSubcribed: true,
        subscriptionEmail: 'bob@ross.com',
      };
      act(() => {
        const output = result.current.validate(
          'subscriptionEmail',
          'bob@ross.com',
          contact
        );
        expect(output).toBe(true);
      });
    });
  });
});
