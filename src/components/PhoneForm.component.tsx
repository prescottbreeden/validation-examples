import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { compose, display, handleChangeEvent, displayValidationError } from 'utilities';
import { Phone } from 'types';
import { PhoneValidation } from 'validations/phone.validation';
import {Box, FlexColumn, Input, Label} from 'layouts';

interface PhoneFormProps {
  canSubmit: boolean;
  onChange: Function;
  phone: Phone;
}
export const PhoneForm: React.FC<PhoneFormProps> = ({
  canSubmit,
  onChange,
  phone,
}) => {
  // -- dependencies --
  const v = PhoneValidation();

  // -- component logic --
  const onPhoneChange = compose(
    onChange,
    mergeDeepRight(phone),
    handleChangeEvent
  );
  const handleOnBlur = v.validateOnBlur(phone);
  const handleOnChange = v.validateOnChange(onPhoneChange, phone);

  // -- lifecycle --
  useEffect(() => {
    !canSubmit && v.validateAll(phone);
  }, [canSubmit, phone]); //eslint-disable-line

  // -- render logic --
  const render = display(phone);
  const getError = displayValidationError(v);

  return (
    <>
      <FlexColumn>
        <Label htmlFor={`number_${render('id')}`}>
          Phone Number
        </Label>
        <Input 
          id={`number_${render('id')}`}
          name="number"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render('number')}
        />
        <Box>
          {getError('number')}
        </Box>
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`description_${render('id')}`}>
          Description
        </Label>
        <Input
          id={`description_${render('id')}`}
          name="description"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render('description')}
        />
        <Box>
          {getError('description')}
        </Box>
      </FlexColumn>
   </>
  );
};
