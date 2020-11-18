import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { ContactValidation } from 'validations/contact.validation';
import { Button, FlexColumn, FlexRow } from 'layouts';
import { ContactForm } from 'forms/Contact.form';
import { Contact, emptyContact } from 'types/Contact.type';
import { compose } from 'de-formed-validations';

export const CreateContact: FC = () => {
  // -- dependencies --
  const { validateAll } = ContactValidation();

  // -- local states --
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [contact, setContact] = useState<Contact>(emptyContact());

  // -- component logic --
  const onChange = compose(
    setContact,
    mergeDeepRight(contact)
  );

  const handleSave = () => {
    if (validateAll(contact)) {
      setSubmitFailed(false);
      // do the save-y bits
    } else {
      setSubmitFailed(true);
      // do the oops-y bits
    }
  };

  return (
    <>
      <FlexRow>
        <FlexColumn>
          <ContactForm
            submitFailed={submitFailed}
            data={contact}
            onChange={onChange}
          />
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <Button onClick={handleSave}>Submit</Button>
      </FlexRow>
    </>
  );
};
