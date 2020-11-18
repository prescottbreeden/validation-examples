import { compose, prop } from 'de-formed-validations';
import { equals } from 'ramda';
import { PET_TYPE_ENUM } from 'types/Pet.types';

export const isCat = compose(
  equals(PET_TYPE_ENUM.CAT),
  prop('petTypeId')
);

export const isDog = compose(
  equals(PET_TYPE_ENUM.DOG),
  prop('petTypeId')
);
