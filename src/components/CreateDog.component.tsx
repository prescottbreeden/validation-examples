import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { Button, FlexColumn, FlexRow } from 'layouts';
import { DogForm } from 'forms/Dog.form';
import { Dog, emptyDog } from 'types/pet.type';
import { compose } from 'utilities/general.utils';
import { PetValidation } from 'validations/pet.validation';

export const CreateDog: FC = () => {
  // -- validation functions --
  const { resetValidationState, validateAll } = PetValidation();

  // -- local states --
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);
  const [dog, setDog] = useState<Dog>(emptyDog());

  // -- component logic --
  const onChange = compose(
    setDog,
    mergeDeepRight(dog)
  );

  const handleSave = () => {
    if (validateAll(dog)) {
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
    setDog(emptyDog());
    resetValidationState();
  };
  return (
    <>
      <FlexRow>
        <FlexColumn>
          <DogForm
            data={dog}
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
