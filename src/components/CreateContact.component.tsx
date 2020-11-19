import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { ContactValidation } from 'validations/contact.validation';
import { Button, FlexColumn, FlexRow } from 'layouts';
import { ContactForm } from 'forms/Contact.form';
import { Contact, emptyContact } from 'types/contact.type';
import { compose } from 'utilities/general.utils';

export const CreateContact: FC = () => {
  // -- validation functions --
  const { resetValidationState, validateAll } = ContactValidation();

  // -- local states --
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);
  const [contact, setContact] = useState<Contact>(emptyContact());

  // -- component logic --
  const onChange = compose(
    setContact,
    mergeDeepRight(contact)
  );

  const handleSave = () => {
    if (validateAll(contact)) {
      setSubmitFailed(false);
      alert('Validations all passed!');
      // do the save-y bits
    } else {
      setSubmitFailed(true);
      // do the oops-y bits
    }
  };

  const handleReset = () => {
    setSubmitFailed(false);
    setResetValidation(!resetValidation);
    setContact(emptyContact());
    resetValidationState();
  };

  return (
    <>
      <FlexRow>
        <FlexColumn>
          <ContactForm
            data={contact}
            onChange={onChange}
            resetValidation={resetValidation}
            submitFailed={submitFailed}
          />
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <Button onClick={handleSave}>Submit</Button>
        </FlexColumn>
        <FlexColumn>
          <Button onClick={handleReset}>Reset Form</Button>
        </FlexColumn>
      </FlexRow>
    </>
  );
};
