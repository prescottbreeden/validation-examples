import React, { useEffect } from "react";
import { mergeDeepRight } from "ramda";
import { PhoneValidation } from "validations/phone.validation";
import { Box, FlexColumn, Input, Label } from "layouts";
import {Phone} from "types/Phone.type";
import {compose, display, handleChangeEvent} from "utilities/general.utils";
import {displayValidationError, formatPhone} from "utilities/validation.utils";

interface PhoneFormProps {
  canSubmit: boolean;
  onChange: Function;
  data: Phone;
}
export const PhoneForm: React.FC<PhoneFormProps> = ({
  canSubmit,
  onChange,
  data,
}) => {
  // -- dependencies --
  const v = PhoneValidation();

  // -- component logic --
  const onPhoneChange = compose(
    onChange,
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = v.validateOnBlur(data);
  const handleOnChange = v.validateOnChange(onPhoneChange, data);

  // -- lifecycle --
  useEffect(() => {
    !canSubmit && v.validateAll(data);
  }, [canSubmit, data]); //eslint-disable-line

  // -- render logic --
  const render = display(data);
  const getError = displayValidationError(v);

  return (
    <>
      <FlexColumn>
        <Label htmlFor={`number_${render("id")}`}>Phone Number</Label>
        <Input
          id={`number_${render("id")}`}
          name="number"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={formatPhone(render("number"))}
        />
        <Box>{getError("number")}</Box>
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`description_${render("id")}`}>Description</Label>
        <Input
          id={`description_${render("id")}`}
          name="description"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render("description")}
        />
        <Box>{getError("description")}</Box>
      </FlexColumn>
    </>
  );
};
