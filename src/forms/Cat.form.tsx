import React, { useEffect } from "react";
import { mergeDeepRight } from "ramda";
import { Box, FlexColumn, Input, Label } from "layouts";
import { PetValidation } from "validations/pet.validation";
import {Cat} from "types/Pet.types";
import {compose, display, handleChangeEvent} from "utilities/general.utils";
import {displayValidationError} from "utilities/validation.utils";

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
  const v = PetValidation();

  // -- component logic --
  const onCatChange = compose(
    onChange,
    (cat: Cat) => ({ cat }),
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = v.validateOnBlur(data);
  const handleOnChange = v.validateOnChange(onCatChange, data);

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
        <Label htmlFor={`number_${render("id")}`}>Cat Name</Label>
        <Input
          id={`number_${render("id")}`}
          name="name"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render("name")}
        />
        <Box>{getError("name")}</Box>
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`cat-breed_${render("id")}`}>Cat Breed</Label>
        <Input
          id={`cat-breed_${render("id")}`}
          name="breed"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render("breed")}
        />
        <Box>{getError("breed")}</Box>
      </FlexColumn>
      <FlexColumn>
        <Label htmlFor={`sleeping-habits_${render("id")}`}>
          Sleeping Habits
        </Label>
        <Input
          id={`sleeping-habits_${render("id")}`}
          name="sleepingHabits"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render("sleepingHabits")}
        />
        <Box>{getError("sleepingHabits" as any)}</Box>
      </FlexColumn>
    </>
  );
};
