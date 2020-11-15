import {randomString} from "utilities";
import {emptyPhone, Phone} from "./Phone.type";

export type Contact = {
  id: string;
  name: string;
  isSubcribed: boolean;
  subscriptionEmail: string;
  emails: string[];
  phones: Phone[];
};

export const emptyContact = (): Contact => ({
  id: randomString(),
  name: '',
  isSubcribed: false,
  subscriptionEmail: '',
  emails: [''],
  phones: [emptyPhone()],
});

