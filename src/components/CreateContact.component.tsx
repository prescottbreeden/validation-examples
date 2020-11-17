import React, { FC, useState } from "react";
import { mergeDeepRight } from "ramda";
import { ContactValidation } from "validations/contact.validation";
import { Button, FlexColumn, FlexRow } from "layouts";
import { ContactForm } from "forms/Contact.form";
import {Contact, emptyContact} from "types/Contact.type";
import {Cat, Dog, emptyCat, emptyDog} from "types/Pet.types";
import {compose} from "de-formed-validations";
import {validationErrors} from "utilities/validation.utils";

type CustomForm = Contact & { cat: Cat; dog: Dog };

export const CreateContact: FC = () => {
  // -- dependencies --
  const v = ContactValidation();

  // -- local states --
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [contact, setContact] = useState<CustomForm>({
    ...emptyContact(),
    cat: emptyCat(),
    dog: emptyDog(),
  });

  // -- component logic --
  const onChange = compose(setContact, mergeDeepRight(contact));

  const handleSave = () => {
    if (v.validateAll(contact)) {
      setCanSubmit(true);
      // do the save-y bits
    } else {
      setCanSubmit(false);
      // do the oops-y bits
    }
  };

  return (
    <>
      <ContactForm canSubmit={canSubmit} data={contact} onChange={onChange} />
      <FlexRow>
        <Button onClick={handleSave}>Submit</Button>
      </FlexRow>
      <FlexRow>
        <FlexColumn>{validationErrors(v)}</FlexColumn>
      </FlexRow>
    </>
  );
};
