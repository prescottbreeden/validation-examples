import { all, useValidation } from 'de-formed-validations';
import { map } from 'ramda';
import { PhoneValidation } from './phone.validation';
import { Contact } from 'types';
import {
  compose,
  containsNoNumbers,
  emailIsValid,
  stringIsLessThan,
  stringIsNotEmpty,
} from 'utilities';

// ContactValidation :: () -> ValidationObject<Contact>
export const ContactValidation = () => {
  const { validateAll: validatePhone } = PhoneValidation();
  return useValidation<Contact>({
    name: [
      {
        errorMessage: 'Name is required.',
        validation: stringIsNotEmpty,
      },
      {
        errorMessage: 'Name cannot contain numbers.',
        validation: containsNoNumbers,
      },
      {
        errorMessage: 'Name must be less than 40 characters.',
        validation: stringIsLessThan(40),
      },
    ],
    subscriptionEmail: [
      {
        errorMessage: 'Please provide an email for your subscription service.',
        validation: (email: string, contact: Contact) => {
          return contact.isSubcribed ? stringIsNotEmpty(email) : true;
        },
      },
      {
        errorMessage: 'Email is invalid.',
        validation: (email: string, contact: Contact) => {
          return contact.isSubcribed ? emailIsValid(email) : true;
        },
      },
    ],
    emails: [
      {
        errorMessage: 'Not all emails provided are valid.',
        validation: compose(all, map(emailIsValid)),
      },
    ],
    phones: [
      {
        errorMessage: 'Not all phones provided are valid.',
        validation: compose(all, map(validatePhone)),
      },
    ],
  });
};
