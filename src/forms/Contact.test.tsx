import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { FormType } from 'types/form.type';
import { Contact, emptyContact } from 'types/contact.type';
import { ContactForm } from './Contact.form';

const ContactFormMock: FormType<Contact> = {
  data: emptyContact(),
  onChange: () => null,
  resetValidation: false,
  submitFailed: false,
};

afterEach(cleanup);

describe('Contact Form', () => {
  it('triggers an error for Contact Name', () => {
    const { getByLabelText, getByText } = render(
      <ContactForm {...ContactFormMock} />
    );
    const input = getByLabelText('Name');
    input.focus();
    input.blur();
    getByText('Name is required.');
  });
});
