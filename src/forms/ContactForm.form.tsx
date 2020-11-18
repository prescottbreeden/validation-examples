import React, { useEffect } from 'react';
import { DynamicForm } from 'components/DynamicForm.component';
import { Box, FlexColumn, FlexRow, Input, Label } from 'layouts';
import { prop } from 'de-formed-validations';
import { ContactValidation } from 'validations/contact.validation';
import { PhoneForm } from 'forms/PhoneForm.form';
import { Contact } from 'types/Contact.type';
import {
  compose,
  display,
  handleChangeEvent,
  upsert,
} from 'utilities/general.utils';
import { emptyPhone, Phone } from 'types/Phone.type';
import { displayValidationError } from 'utilities/validation.utils';

interface ContactFormProps {
  canSubmit: boolean;
  onChange: (event: any) => any;
  data: Contact;
}
export const ContactForm: React.FC<ContactFormProps> = ({
  canSubmit,
  onChange,
  data,
}) => {
  // -- dependencies --
  const v = ContactValidation();

  // -- component logic --
  const handleOnBlur = v.validateOnBlur(data);
  const handleOnChange = v.validateOnChange(
    compose(
      onChange,
      handleChangeEvent
    ),
    data
  );
  const upsertPhones = compose(
    onChange,
    (phones: Phone[]) => ({ phones }),
    upsert(data.phones)
  );
  const addNewPhone = () => {
    const phones = [...data.phones, emptyPhone()];
    onChange({ phones });
  };
  const deletePhone = (p1: Phone) => {
    const phones = data.phones.filter((p2: Phone) => {
      return p1.id !== p2.id;
    });
    return onChange({ phones });
  };

  // -- lifecycle --
  useEffect(() => {
    !canSubmit && v.validateAll(data);
  }, [canSubmit, data]); //eslint-disable-line

  // -- render logic --
  const render = display(data);
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
          <Box>{getError('name')}</Box>
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
          <Box>{getError('subscriptionEmail')}</Box>
        </FlexColumn>
      </FlexRow>
      <DynamicForm
        addForm={addNewPhone}
        canSubmit={canSubmit}
        form={PhoneForm}
        removeForm={deletePhone}
        onChange={upsertPhones}
        items={prop('phones', data)}
      />
    </>
  );
};
