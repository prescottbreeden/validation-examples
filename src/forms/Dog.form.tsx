import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { FlexColumn, Input, Label } from 'layouts';
import { PetValidation } from 'validations/pet.validation';
import { FormType } from 'types/form.type';
import { Dog } from 'types/pet.type';
import { compose, safeGet, handleChangeEvent } from 'utilities/general.utils';

export const DogForm: React.FC<FormType<Dog>> = ({
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
  const onDogChange = compose(
    onChange,
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(onDogChange, data);

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
        <Label htmlFor={`number_${get('id')}`}>Dog Name</Label>
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
        <Label htmlFor={`dog-breed_${get('id')}`}>Dog Breed</Label>
        <Input
          id={`dog-breed_${get('id')}`}
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
        <Label htmlFor={`favoriteChewToy_${get('id')}`}>
          Favorite Chew Toy
        </Label>
        <Input
          id={`favoriteChewToy_${get('id')}`}
          name="favoriteChewToy"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('favoriteChewToy')}
        />
        {getError('favoriteChewToy') && (
          <p className="form__error">{getError('favoriteChewToy')}</p>
        )}
      </FlexColumn>
    </>
  );
};
