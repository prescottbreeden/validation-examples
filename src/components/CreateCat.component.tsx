import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { Button, FlexColumn, FlexRow } from 'layouts';
import { CatForm } from 'forms/Cat.form';
import { Cat, emptyCat } from 'types/pet.type';
import { compose } from 'utilities/general.utils';
import { PetValidation } from 'validations/pet.validation';

export const CreateCat: FC = () => {
  // -- validation functions --
  const { resetValidationState, validateAll } = PetValidation();

  // -- local states --
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);
  const [cat, setCat] = useState<Cat>(emptyCat());

  // -- component logic --
  const onChange = compose(
    setCat,
    mergeDeepRight(cat)
  );

  const handleSave = () => {
    if (validateAll(cat)) {
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
    setCat(emptyCat());
    resetValidationState();
  };
  return (
    <>
      <FlexRow>
        <FlexColumn>
          <CatForm
            data={cat}
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
