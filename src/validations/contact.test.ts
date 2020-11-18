import { renderHook, act } from '@testing-library/react-hooks';
import { ContactValidation } from './contact.validation';
import { Contact, emptyContact } from 'types/Contact.type';
import { emptyPhone } from 'types/Phone.type';
import { emptyCat, emptyDog } from 'types/Pet.types';

const validContactMock: Contact = {
  ...emptyContact(),
  name: 'bob ross',
  phones: [
    {
      ...emptyPhone(),
      number: '(123) 123 - 1234',
      description: 'cell',
    },
  ],
  dog: {
    ...emptyDog(),
    name: 'phil',
    breed: 'dog',
    favoriteChewToy: 'couch',
  },
  cat: {
    ...emptyCat(),
    name: 'phil',
    breed: 'dog',
    sleepingHabits: 'also couch',
  },
};

describe('contact validations', () => {
  describe('name', () => {
    it('fails if no name is provided', () => {
      const { result } = renderHook(() => ContactValidation());
      act(() => {
        const output = result.current.validate('name', '');
        expect(output).toBe(false);
      });
    });
    it('passes if name is provided', () => {
      const { result } = renderHook(() => ContactValidation());
      act(() => {
        const output = result.current.validate('name', 'bob ross');
        expect(output).toBe(true);
      });
    });
  });

  describe('subscriptionEmail', () => {
    it('passes if isSubcribed is false', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...emptyContact(),
        isSubcribed: false,
      };
      act(() => {
        const output = result.current.validate(
          'subscriptionEmail',
          '',
          contact
        );
        expect(output).toBe(true);
      });
    });
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

  describe('phones', () => {
    it('fails if a phone has no number', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...validContactMock,
        phones: [
          {
            ...emptyPhone(),
            number: '(123) 123 - 1234',
            description: 'cell',
          },
          {
            ...emptyPhone(),
            description: 'cell',
          },
        ],
      };
      act(() => {
        const output = result.current.validate('phones', contact.phones);
        expect(output).toBe(false);
      });
    });
    it('fails if a phone has no description', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...validContactMock,
        phones: [
          {
            ...emptyPhone(),
            number: '(123) 123 - 1234',
            description: 'cell',
          },
          {
            ...emptyPhone(),
            number: '(123) 123 - 1234',
          },
        ],
      };
      act(() => {
        const output = result.current.validate('phones', contact.phones);
        expect(output).toBe(false);
      });
    });
    it('passes if phones are empty', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...validContactMock,
        name: 'bob ross',
        phones: [],
      };
      act(() => {
        const output = result.current.validate('phones', contact.phones);
        expect(output).toBe(true);
      });
    });
  });

  describe('dog', () => {
    it('fails if dog is invalid', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...validContactMock,
        dog: emptyDog(),
      };
      act(() => {
        const output = result.current.validate('dog', contact.dog, contact);
        expect(output).toBe(false);
      });
    });
    it('passes if dog is valid', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...validContactMock,
      };
      act(() => {
        const output = result.current.validate('dog', contact.dog, contact);
        expect(output).toBe(true);
      });
    });
  });

  describe('cat', () => {
    it('fails if cat is invalid', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...validContactMock,
        cat: emptyCat(),
      };
      act(() => {
        const output = result.current.validate('cat', contact.cat, contact);
        expect(output).toBe(false);
      });
    });
    it('passes if cat is valid', () => {
      const { result } = renderHook(() => ContactValidation());
      const contact: Contact = {
        ...validContactMock,
      };
      act(() => {
        const output = result.current.validate('cat', contact.cat, contact);
        expect(output).toBe(true);
      });
    });
  });
});
