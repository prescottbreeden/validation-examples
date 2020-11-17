import React from 'react';
import {Box, Button, FlexColumn, FlexRow, Icon} from 'layouts';
import {safeMap} from 'utilities';
import {prop} from 'de-formed-validations';

interface DynamicFormProps {
  addForm: Function;
  canSubmit: boolean;
  form: any;
  items: any[];
  removeForm: Function;
  onChange: Function;
}
export const DynamicForm: React.FC<DynamicFormProps> = ({
  addForm,
  canSubmit,
  form,
  items,
  onChange,
  removeForm,
}) => {

  // -- render logic --
  return (
    <>
      <FlexColumn>
        {safeMap(
          (item: any) => (
            <FlexRow key={prop('id', item)}>
              {React.createElement(form, {
                canSubmit,
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
        <Button
          onClick={() => addForm()}
          className="button form__btn--add"
        >
          + Add New Phone
        </Button>
      </FlexRow>
    </>
  );
};

