import { compose, prop } from 'utilities/general.utils';
import { equals } from 'ramda';
import { PET_TYPE_ENUM } from 'types/pet.type';

export const isCat = compose(
  equals(PET_TYPE_ENUM.CAT),
  prop('petTypeId')
);

export const isDog = compose(
  equals(PET_TYPE_ENUM.DOG),
  prop('petTypeId')
);
