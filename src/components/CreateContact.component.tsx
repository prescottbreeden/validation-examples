import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { Contact, emptyContact, emptyPhone, Phone } from 'types';
import { compose, display, handleChangeEvent, displayValidationError, upsert, validationErrors } from 'utilities';
import {ContactValidation } from 'validations/contact.validation';
import {DynamicPhone} from './DynamicPhone.component';
import {Box, Button, FlexColumn, FlexRow, Input, Label } from 'layouts';
import {prop} from 'de-formed-validations';

export const CreateContact: FC = () => {
  // -- dependencies --
  const v = ContactValidation();

  // -- local states --
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [contact, setContact] = useState<Contact>(emptyContact());

  // -- component logic --
  const mergeContact = compose(setContact, mergeDeepRight(contact));
  const handleOnBlur = v.validateOnBlur(contact);
  const handleOnChange = v.validateOnChange(
    compose(
      mergeContact,
      handleChangeEvent
    ),
    contact
  );
  const upsertPhones = compose(
    mergeContact,
    (phones: Phone[]) => ({ phones }),
    upsert(contact.phones),
  );
  const addNewPhone = () => {
    const phones = [...contact.phones, emptyPhone()];
    mergeContact({phones});
  };
  const deletePhone = (p1: Phone) => {
    const phones = contact.phones.filter((p2: Phone) => {
      return p1.id !== p2.id;
    });
    return mergeContact({ phones });
  };
  const handleSave = () => {
    if (v.validateAll(contact)) {
      setCanSubmit(true);
      console.log(v.validationState);
    } else {
      setCanSubmit(false);
      console.log(v.validationState);
    }
  };

  // -- render logic --
  const render = display(contact);
  const getError = displayValidationError(v);

  return (
    <>
      <FlexRow>
        <FlexColumn>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={render('name')}
          />
          <Box>
            {getError('name')}
          </Box>
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <Label htmlFor="subscriptionEmail">Subscription Email</Label>
          <Input
            id="subscriptionEmail"
            name="subscriptionEmail"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={render('subscriptionEmail')}
          />
          <Box>
            {getError('subscriptionEmail')}
          </Box>
        </FlexColumn>
      </FlexRow>
      <DynamicPhone
        addNewPhone={addNewPhone}
        canSubmit={canSubmit}
        deletePhone={deletePhone}
        onChange={upsertPhones}
        phones={prop('phones', contact)}
      />
      <FlexRow>
        <Button onClick={handleSave}>Submit</Button>
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          {validationErrors(v)}
        </FlexColumn>
      </FlexRow>
    </>
  );
};
