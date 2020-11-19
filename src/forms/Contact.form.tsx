import React, { useEffect } from 'react';
import { DynamicForm } from 'components/DynamicForm.component';
import { FlexColumn, FlexRow, Input, Label } from 'layouts';
import { ContactValidation } from 'validations/contact.validation';
import { PhoneForm } from 'forms/Phone.form';
import { CatForm } from './Cat.form';
import { DogForm } from './Dog.form';
import { Contact } from 'types/contact.type';
import { emptyPhone, Phone } from 'types/phone.type';
import {
  compose,
  safeGet,
  handleChangeEvent,
  replaceItem,
} from 'utilities/general.utils';
import { mergeRight } from 'ramda';

interface ContactFormProps {
  submitFailed: boolean;
  onChange: (event: any) => any;
  data: Contact;
}
export const ContactForm: React.FC<ContactFormProps> = ({
  submitFailed,
  onChange,
  data,
}) => {
  // -- dependencies --
  const {
    getError,
    validateAll,
    validateIfTrue,
    validateOnBlur,
    validateOnChange,
  } = ContactValidation();

  // -- component logic --
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(
    compose(
      onChange,
      handleChangeEvent
    ),
    data
  );
  const handleCheckbox = () => {
    const state = mergeRight(data, { isSubcribed: !data.isSubcribed });
    validateIfTrue('subscriptionEmail', state.subscriptionEmail, state);
    onChange(state);
  };
  const updatePhones = compose(
    onChange,
    (phones: Phone[]) => ({ phones }),
    replaceItem(data.phones)
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
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  // -- render logic --
  const get = safeGet(data);

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
            value={get('name')}
          />
          {getError('name') && (
            <p className="form__error">{getError('name')}</p>
          )}
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <Label htmlFor="isSubcribed">Subscribe to Newsletter</Label>
        <input
          className="form__checkbox"
          id="isSubcribed"
          name="isSubcribed"
          onBlur={handleOnBlur}
          onChange={handleCheckbox}
          type="checkbox"
          value={get('isSubcribed')}
        />
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <Label htmlFor="subscriptionEmail">Subscription Email</Label>
          <Input
            id="subscriptionEmail"
            name="subscriptionEmail"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={get('subscriptionEmail')}
          />
          {getError('subscriptionEmail') && (
            <p className="form__error">{getError('subscriptionEmail')}</p>
          )}
        </FlexColumn>
      </FlexRow>
      <DynamicForm
        addForm={addNewPhone}
        submitFailed={submitFailed}
        form={PhoneForm}
        removeForm={deletePhone}
        onChange={updatePhones}
        items={get('phones')}
      />
      <FlexRow>
        <DogForm
          submitFailed={submitFailed}
          onChange={onChange}
          data={get('dog')}
        />
      </FlexRow>
      <FlexRow>
        <CatForm
          submitFailed={submitFailed}
          onChange={onChange}
          data={get('cat')}
        />
      </FlexRow>
    </>
  );
};
