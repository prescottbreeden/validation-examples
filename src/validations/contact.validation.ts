import { all, useValidation } from "de-formed-validations";
import { compose, map } from "ramda";
import {Contact} from "types/Contact.type";
import {containsNoNumbers, emailIsValid, stringIsLessThan, stringIsNotEmpty} from "utilities/validation.utils";
import { PhoneValidation } from "./phone.validation";

// ContactValidation :: () -> ValidationObject<Contact>
export const ContactValidation = () => {
  const { validateAll: validatePhone } = PhoneValidation();
  return useValidation<Contact>({
    name: [
      {
        errorMessage: "Name is required.",
        validation: stringIsNotEmpty,
      },
      {
        errorMessage: "Name cannot contain numbers.",
        validation: containsNoNumbers,
      },
      {
        errorMessage: "Name must be less than 40 characters.",
        validation: stringIsLessThan(40),
      },
    ],
    subscriptionEmail: [
      {
        errorMessage: "Please provide an email.",
        validation: (val: string, contact: Contact) => {
          return contact.isSubcribed ? stringIsNotEmpty(val) : true;
        },
      },
      {
        errorMessage: "Email is invalid.",
        validation: (val: string, contact: Contact) => {
          return contact.isSubcribed ? emailIsValid(val) : true;
        },
      },
    ],
    emails: [
      {
        errorMessage: "Not all emails provided are valid.",
        validation: compose(all, map(emailIsValid)),
      },
    ],
    phones: [
      {
        errorMessage: "Not all phones provided are valid.",
        validation: compose(all, map(validatePhone)),
      },
    ],
  });
};
