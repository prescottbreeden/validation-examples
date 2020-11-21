import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { FormType } from 'types/form.type';
import { Phone, emptyPhone } from 'types/phone.type';
import { PhoneForm } from './Phone.form';

const PhoneFormMock: FormType<Phone> = {
  data: emptyPhone(),
  onChange: () => null,
  resetValidation: false,
  submitFailed: false,
};

afterEach(cleanup);

describe('Phone Form', () => {
  it('triggers an error for Phone Number', () => {
    const { getByLabelText, getByText } = render(
      <PhoneForm {...PhoneFormMock} />
    );
    const input = getByLabelText('Phone Number');
    input.focus();
    input.blur();
    getByText('Number is required.');
  });
  it('triggers an error for Description', () => {
    const { getByLabelText, getByText } = render(
      <PhoneForm {...PhoneFormMock} />
    );
    const input = getByLabelText('Description');
    input.focus();
    input.blur();
    getByText('Description is required.');
  });
});
