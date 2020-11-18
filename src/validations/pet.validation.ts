import { useValidation } from 'de-formed-validations';
import { Pet } from 'types/Pet.types';
import { isCat, isDog } from 'utilities/pet.utils';
import { matchString, stringIsNotEmpty } from 'utilities/validation.utils';

// PetValidation :: () -> ValidationObject<Pet>
export const PetValidation = () => {
  return useValidation<Pet>({
    name: [
      {
        errorMessage: 'Name is required.',
        validation: stringIsNotEmpty,
      },
    ],
    breed: [
      {
        errorMessage: 'Breed is required.',
        validation: stringIsNotEmpty,
      },
      {
        errorMessage: 'Garfield is a Persian/Tabby',
        validation: (val: string, pet: Pet) => {
          if (isCat(pet)) {
            return matchString(pet.name, 'Garfield')
              ? matchString(val, 'Persian/Tabby')
              : true;
          }
          return true;
        },
      },
    ],
    favoriteChewToy: [
      {
        errorMessage: 'Favorite Chew Toy is required.',
        validation: (val: string, pet: Pet) => {
          return isDog(pet) ? stringIsNotEmpty(val) : true;
        },
      },
    ],
    sleepingHabits: [
      {
        errorMessage: 'Sleeping Habits is required.',
        validation: (val: string, pet: Pet) => {
          return isCat(pet) ? stringIsNotEmpty(val) : true;
        },
      },
    ],
  });
};
