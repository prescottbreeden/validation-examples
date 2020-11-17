import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { Contact, emptyContact } from 'types';
import { compose, validationErrors } from 'utilities';
import { ContactValidation } from 'validations/contact.validation';
import { Button, FlexColumn, FlexRow } from 'layouts';
import { ContactForm } from 'forms/ContactForm.form';

export const CreateContact: FC = () => {
  // -- dependencies --
  const v = ContactValidation();

  // -- local states --
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [contact, setContact] = useState<Contact>(emptyContact());

  // -- component logic --
  const onChange = compose(
    setContact,
    mergeDeepRight(contact),
  );

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
      <ContactForm
        canSubmit={canSubmit}
        data={contact}
        onChange={onChange}
      />
      <FlexRow>
        <Button onClick={handleSave}>Submit</Button>
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          {validationErrors(v)}
        </FlexColumn>
      </FlexRow>
    </>
  );
};
