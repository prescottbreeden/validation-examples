import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { FlexColumn, Input, Label } from 'layouts';
import { PetValidation } from 'validations/pet.validation';
import { FormType } from 'types/form.type';
import { Cat } from 'types/pet.type';
import { compose, safeGet, handleChangeEvent } from 'utilities/general.utils';

export const CatForm: React.FC<FormType<Cat>> = ({
  data,
  onChange,
  resetValidation,
  submitFailed,
}) => {
  // -- validation functions --
  const {
    getError,
    resetValidationState,
    validateAll,
    validateOnBlur,
    validateOnChange,
  } = PetValidation();

  // -- component logic --
  const onCatChange = compose(
    onChange,
    (cat: Cat) => ({ cat }),
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(onCatChange, data);

  // -- lifecycle --
  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

  // -- render logic --
  const get = safeGet(data);

  return (
    <>
      <FlexColumn>
        <Label htmlFor={`number_${get('id')}`}>Cat Name</Label>
        <Input
          id={`number_${get('id')}`}
          name="name"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('name')}
        />
        {getError('name') && <p className="form__error">{getError('name')}</p>}
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`cat-breed_${get('id')}`}>Cat Breed</Label>
        <Input
          id={`cat-breed_${get('id')}`}
          name="breed"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('breed')}
        />
        {getError('breed') && (
          <p className="form__error">{getError('breed')}</p>
        )}
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`sleeping-habits_${get('id')}`}>Sleeping Habits</Label>
        <Input
          id={`sleeping-habits_${get('id')}`}
          name="sleepingHabits"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('sleepingHabits')}
        />
        {getError('sleepingHabits') && (
          <p className="form__error">{getError('sleepingHabits')}</p>
        )}
      </FlexColumn>
    </>
  );
};
