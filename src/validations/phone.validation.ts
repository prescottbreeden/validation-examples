import { useValidation } from "de-formed-validations";
import { replace } from "ramda";
import {Phone} from "types/Phone.type";
import {compose } from "utilities/general.utils";
import {isLength, stringIsNotEmpty, stringIsNumbers} from "utilities/validation.utils";

// PhoneValidation :: () -> ValidationObject<Phone>
export const PhoneValidation = () => {
  return useValidation<Phone>({
    number: [
      {
        errorMessage: "Number is required.",
        validation: stringIsNotEmpty,
      },
      {
        errorMessage: "Can only have digits.",
        validation: compose(stringIsNumbers, replace(/[-.() ]/g, "")),
      },
      {
        errorMessage: "Must be 10 digits.",
        validation: compose(isLength(10), replace(/[-.() ]/g, "")),
      },
    ],
    description: [
      {
        errorMessage: "Description is required.",
        validation: stringIsNotEmpty,
      },
    ],
  });
};
