import { useValidation } from 'de-formed-validations';
import { replace } from 'ramda';
import { Phone } from 'types';
import { compose } from 'utilities';
import {
  isLength,
  stringIsNumbers,
  stringIsRequired,
} from 'utilities';

// PhoneValidation :: () -> ValidationObject<Phone>
export const PhoneValidation = () => {
  return useValidation<Phone>({
    number: [
      {
        ...stringIsRequired('Number'),
      },
      {
        errorMessage: 'Can only have digits.',
        validation: compose(stringIsNumbers, replace(/-/g, '')),
      },
      {
        errorMessage: 'Must be 10 digits.',
        validation: compose(isLength(10), replace(/-/g, '')),
      },
    ],
    description: [
      {
        ...stringIsRequired('Description'),
      }
    ],
  });
};
