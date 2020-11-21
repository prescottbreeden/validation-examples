import React from 'react';
import { cleanup, fireEvent, screen, render } from '@testing-library/react';
import { CreatePhone } from './CreatePhone.component';

afterEach(cleanup);

describe('Create Phone Component', () => {
  /* const phoneNumber = getByLabelText("Phone Number"); */
  /* const description = getByLabelText("Description"); */

  it('errors if submit is clicked and data invalid', async () => {
    render(<CreatePhone />);
    fireEvent.click(screen.getByText('Submit'));
    const errors = await screen.findAllByText('Number is required.');
    expect(errors.length).toBe(1);
  });
  it('resets form when reset is clicked', async () => {
    render(<CreatePhone />);
    fireEvent.click(screen.getByText('Submit'));
    fireEvent.click(screen.getByText('Reset Form'));
    /* const errors = await screen.findAllByText("Name is required."); */
    /* expect(errors.length).toBe(0); */
  });
});
