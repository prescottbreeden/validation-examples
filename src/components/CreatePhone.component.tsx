import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { Button, FlexColumn, FlexRow } from 'layouts';
import { PhoneForm } from 'forms/Phone.form';
import { Phone, emptyPhone } from 'types/phone.type';
import { compose } from 'utilities/general.utils';
import { PhoneValidation } from 'validations/phone.validation';

export const CreatePhone: FC = () => {
  // -- validation functions --
  const { resetValidationState, validateAll } = PhoneValidation();

  // -- local states --
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);
  const [phone, setPhone] = useState<Phone>(emptyPhone());

  // -- component logic --
  const onChange = compose(
    setPhone,
    mergeDeepRight(phone)
  );

  const handleSave = () => {
    if (validateAll(phone)) {
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
    setPhone(emptyPhone());
    resetValidationState();
  };
  return (
    <>
      <FlexRow>
        <FlexColumn>
          <PhoneForm
            data={phone}
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
