import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { FlexColumn, Input, Label } from 'layouts';
import { PetValidation } from 'validations/pet.validation';
import { Dog } from 'types/Pet.types';
import { compose, display, handleChangeEvent } from 'utilities/general.utils';

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
  const render = display(data);

  return (
    <>
      <FlexColumn>
        <Label htmlFor={`number_${render('id')}`}>Dog Name</Label>
        <Input
          id={`number_${render('id')}`}
          name="name"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render('name')}
        />
        {getError('name') && <p className="form__error">{getError('name')}</p>}
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`cat-breed_${render('id')}`}>Dog Breed</Label>
        <Input
          id={`cat-breed_${render('id')}`}
          name="breed"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render('breed')}
        />
        {getError('breed') && (
          <p className="form__error">{getError('breed')}</p>
        )}
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`sleeping-habits_${render('id')}`}>
          Favorite Chew Toy
        </Label>
        <Input
          id={`sleeping-habits_${render('id')}`}
          name="favoriteChewToy"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render('favoriteChewToy')}
        />
        {getError('favoriteChewToy') && (
          <p className="form__error">{getError('favoriteChewToy')}</p>
        )}
      </FlexColumn>
    </>
  );
};
