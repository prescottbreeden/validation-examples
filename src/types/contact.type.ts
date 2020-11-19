import { randomString } from 'utilities/general.utils';
import { Cat, Dog, emptyCat, emptyDog } from './pet.type';
import { emptyPhone, Phone } from './phone.type';

export type Contact = {
  id: string;
  name: string;
  isSubcribed: boolean;
  subscriptionEmail: string;
  phones: Phone[];
  dog: Dog;
  cat: Cat;
};

export const emptyContact = (): Contact => ({
  id: randomString(),
  name: '',
  isSubcribed: false,
  subscriptionEmail: '',
  phones: [emptyPhone()],
  dog: emptyDog(),
  cat: emptyCat(),
});
