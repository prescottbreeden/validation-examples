import React, { useEffect } from 'react';
import { DynamicForm } from 'components/DynamicForm.component';
import { FlexColumn, FlexRow, Input, Label } from 'layouts';
import { ContactValidation } from 'validations/contact.validation';
import { PhoneForm } from 'forms/Phone.form';
import { CatForm } from './Cat.form';
import { DogForm } from './Dog.form';
import { FormType } from 'types/form.type';
import { Contact } from 'types/contact.type';
import { emptyPhone, Phone } from 'types/phone.type';
import { mergeRight } from 'ramda';
import {
  compose,
  safeGet,
  handleChangeEvent,
  replaceItem,
} from 'utilities/general.utils';
import { Cat, Dog } from 'types/pet.type';

export const ContactForm: React.FC<FormType<Contact>> = ({
  data,
  onChange,
  resetValidation,
  submitFailed,
}) => {
  // -- validation functions --
  const {
    getError,
    resetValidationState,
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
  const handleIsSubscribed = () => {
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

  const handleDog = compose(
    onChange,
    (dog: Dog) => ({ dog })
  );
  const handleCat = compose(
    onChange,
    (cat: Cat) => ({ cat })
  );

  // -- lifecycle --
  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

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
          onChange={handleIsSubscribed}
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
        form={PhoneForm}
        items={get('phones')}
        onChange={updatePhones}
        removeForm={deletePhone}
        resetValidation={resetValidation}
        submitFailed={submitFailed}
      />
      <FlexRow>
        <DogForm
          data={get('dog')}
          onChange={handleDog}
          resetValidation={resetValidation}
          submitFailed={submitFailed}
        />
      </FlexRow>
      <FlexRow>
        <CatForm
          data={get('cat')}
          onChange={handleCat}
          resetValidation={resetValidation}
          submitFailed={submitFailed}
        />
      </FlexRow>
    </>
  );
};
