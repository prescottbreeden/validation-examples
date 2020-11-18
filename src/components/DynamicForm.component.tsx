import React from 'react';
import { Box, Button, FlexColumn, FlexRow, Icon } from 'layouts';
import { prop } from 'utilities/general.utils';
import { map } from 'ramda';

interface DynamicFormProps {
  addForm: Function;
  submitFailed: boolean;
  form: any;
  items: any[];
  removeForm: Function;
  onChange: Function;
}
export const DynamicForm: React.FC<DynamicFormProps> = ({
  addForm,
  submitFailed,
  form,
  items,
  onChange,
  removeForm,
}) => {
  return (
    <>
      <FlexColumn>
        {map(
          (item: any) => (
            <FlexRow key={prop('id', item)}>
              {React.createElement(form, {
                submitFailed,
                data: item,
                onChange,
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
