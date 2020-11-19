import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { FlexColumn, Input, Label } from 'layouts';
import { PetValidation } from 'validations/pet.validation';
import { Dog } from 'types/Pet.types';
import { compose, safeGet, handleChangeEvent } from 'utilities/general.utils';

interface DogFormProps {
  submitFailed: boolean;
  onChange: Function;
  data: Dog;
}
export const DogForm: React.FC<DogFormProps> = ({
  submitFailed,
  onChange,
  data,
}) => {
  // -- dependencies --
  const {
    getError,
    validateAll,
    validateOnBlur,
    validateOnChange,
  } = PetValidation();

  // -- component logic --
  const onDogChange = compose(
    onChange,
    (dog: Dog) => ({ dog }),
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(onDogChange, data);

  // -- lifecycle --
  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

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
