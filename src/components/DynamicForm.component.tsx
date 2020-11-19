import React from 'react';
import { Box, Button, FlexColumn, FlexRow, Icon } from 'layouts';
import { prop } from 'utilities/general.utils';
import { map } from 'ramda';

type DynamicFormProps = {
  addForm: Function;
  form: any;
  items: any[];
  onChange: (event: any) => any;
  removeForm: Function;
  resetValidation: boolean;
  submitFailed: boolean;
};
export const DynamicForm: React.FC<DynamicFormProps> = ({
  addForm,
  form,
  items,
  onChange,
  removeForm,
  resetValidation,
  submitFailed,
}) => {
  return (
    <>
      <FlexColumn>
        {map(
          (item: any) => (
            <FlexRow key={prop('id', item)}>
              {React.createElement(form, {
                data: item,
                onChange,
                resetValidation,
                submitFailed,
              })}
              <Box>
                <Icon
                  className="button--delete"
                  name="crossCircle"
                  onClick={() => removeForm(item)}
                  title="Remove"
                />
              </Box>
            </FlexRow>
          ),
          items
        )}
      </FlexColumn>
      <FlexRow>
        <Button onClick={() => addForm()} className="button form__btn--add">
          + Add New Phone
        </Button>
      </FlexRow>
    </>
  );
};
