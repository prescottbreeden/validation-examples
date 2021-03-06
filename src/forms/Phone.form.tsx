import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { PhoneValidation } from 'validations/phone.validation';
import { FlexColumn, Input, Label } from 'layouts';
import { FormType } from 'types/form.type';
import { Phone } from 'types/phone.type';
import {
  compose,
  safeGet,
  handleChangeEvent,
  formatPhone,
} from 'utilities/general.utils';

export const PhoneForm: React.FC<FormType<Phone>> = ({
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
  } = PhoneValidation();

  // -- component logic --
  const onPhoneChange = compose(
    onChange,
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(onPhoneChange, data);

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
        <Label htmlFor={`number_${get('id')}`}>Phone Number</Label>
        <Input
          id={`number_${get('id')}`}
          name="number"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={formatPhone(get('number'))}
        />
        {getError('number') && (
          <p className="form__error">{getError('number')}</p>
        )}
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`description_${get('id')}`}>Description</Label>
        <Input
          id={`description_${get('id')}`}
          name="description"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('description')}
        />
        {getError('description') && (
          <p className="form__error">{getError('description')}</p>
        )}
      </FlexColumn>
    </>
  );
};
