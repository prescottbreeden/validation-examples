import { randomString } from 'utilities/general.utils';
import { Cat, Dog, emptyCat, emptyDog } from './Pet.types';
import { emptyPhone, Phone } from './Phone.type';

export type Contact = {
  id: string;
  name: string;
  isSubcribed: boolean;
  subscriptionEmail: string;
  emails: string[];
  phones: Phone[];
  dog: Dog;
  cat: Cat;
};

export const emptyContact = (): Contact => ({
  id: randomString(),
  name: '',
  isSubcribed: false,
  subscriptionEmail: '',
  emails: [''],
  phones: [emptyPhone()],
  dog: emptyDog(),
  cat: emptyCat(),
});
