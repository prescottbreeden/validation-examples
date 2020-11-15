import React from 'react';
import {Phone} from 'types';
import {PhoneForm} from './PhoneForm.component';
import {Box, Button, FlexColumn, FlexRow, Icon} from 'layouts';
import {safeMap} from 'utilities';
import {prop} from 'de-formed-validations';

interface DynamicItemProps {
  addNewPhone: Function;
  canSubmit: boolean;
  deletePhone: Function;
  onChange: Function;
  phones: Phone[];
}
export const DynamicPhone: React.FC<DynamicItemProps> = ({
  addNewPhone,
  canSubmit,
  deletePhone,
  onChange,
  phones,
}) => {
  // -- component logic --------------------------------------------------------


  // -- render logic -----------------------------------------------------------
  return (
    <>
      <FlexColumn>
        {safeMap(
          (phone: Phone) => (
            <FlexRow key={prop('id', phone)}>
              <PhoneForm
                canSubmit={canSubmit}
                onChange={onChange}
                phone={phone}
              />
              <Box>
                <Icon
                  className="button--delete"
                  name="crossCircle"
                  onClick={() => deletePhone(phone)}
                  title="Remove"
                />
              </Box>
            </FlexRow>
          ),
          phones
        )}
      </FlexColumn>
      <FlexRow>
        <Button
          onClick={() => addNewPhone()}
          className="button form__btn--add"
        >
          + Add New Phone
        </Button>
      </FlexRow>
    </>
  );
};

