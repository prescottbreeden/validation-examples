import React, { useEffect } from "react";
import { mergeDeepRight } from "ramda";
import { Box, FlexColumn, Input, Label } from "layouts";
import { PetValidation } from "validations/pet.validation";
import {Dog} from "types/Pet.types";
import {compose, display, handleChangeEvent} from "utilities/general.utils";
import {displayValidationError} from "utilities/validation.utils";

interface DogFormProps {
  canSubmit: boolean;
  onChange: Function;
  data: Dog;
}
export const DogForm: React.FC<DogFormProps> = ({
  canSubmit,
  onChange,
  data,
}) => {
  // -- dependencies --
  const v = PetValidation();

  // -- component logic --
  const onDogChange = compose(
    onChange,
    (dog: Dog) => ({ dog }),
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = v.validateOnBlur(data);
  const handleOnChange = v.validateOnChange(onDogChange, data);

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
        <Label htmlFor={`number_${render("id")}`}>Dog Name</Label>
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
        <Label htmlFor={`cat-breed_${render("id")}`}>Dog Breed</Label>
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
          Favorite Chew Toy
        </Label>
        <Input
          id={`sleeping-habits_${render("id")}`}
          name="favoriteChewToy"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={render("favoriteChewToy")}
        />
        <Box>{getError("favoriteChewToy" as any)}</Box>
      </FlexColumn>
    </>
  );
};