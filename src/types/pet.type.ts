import { randomString } from 'utilities/general.utils';

export enum PET_TYPE_ENUM {
  UNKNOWN = 0,
  CAT = 1,
  DOG = 2,
}
export interface Pet {
  id: string;
  name: string;
  breed: string;
  petTypeId: PET_TYPE_ENUM;
  sleepingHabits?: string;
  favoriteChewToy?: string;
}

export const emptyPet = (): Pet => {
  return {
    id: randomString(),
    name: '',
    breed: '',
    petTypeId: 0,
  };
};

export interface Cat extends Pet {
  sleepingHabits: string;
}

export const emptyCat = (): Cat => {
  return {
    ...emptyPet(),
    sleepingHabits: '',
    petTypeId: 1,
  };
};

export interface Dog extends Pet {
  favoriteChewToy: string;
}

export const emptyDog = (): Dog => {
  return {
    ...emptyPet(),
    favoriteChewToy: '',
    petTypeId: 2,
  };
};
