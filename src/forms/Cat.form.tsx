import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { FlexColumn, Input, Label } from 'layouts';
import { PetValidation } from 'validations/pet.validation';
import { Cat } from 'types/Pet.types';
import { compose, display, handleChangeEvent } from 'utilities/general.utils';

interface CatFormProps {
  canSubmit: boolean;
  onChange: Function;
  data: Cat;
}
export const CatForm: React.FC<CatFormProps> = ({
  canSubmit,
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
    !canSubmit && validateAll(data);
  }, [canSubmit, data]); //eslint-disable-line

  // -- render logic --
  const render = display(data);

  return (
    <>
      <FlexColumn>
        <Label htmlFor={`number_${render('id')}`}>Cat Name</Label>
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
        <Label htmlFor={`cat-breed_${render('id')}`}>Cat Breed</Label>
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
          Sleeping Habits
        </Label>
        <Input
          id={`sleeping-habits_${render('id')}`}
          name="sleepingHabits"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render('sleepingHabits')}
        />
        {getError('sleepingHabits') && (
          <p className="form__error">{getError('sleepingHabits')}</p>
        )}
      </FlexColumn>
    </>
  );
};
