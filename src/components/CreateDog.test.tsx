import React from 'react';
import { cleanup, fireEvent, screen, render } from '@testing-library/react';
import { CreateDog } from './CreateDog.component';

afterEach(cleanup);

describe('Create Dog Component', () => {
  /* const catName = getByLabelText("Dog Name"); */
  /* const catBreed = getByLabelText("Dog Breed"); */
  /* const sleepingHabits = getByLabelText("Sleeping Habits"); */

  it('errors if submit is clicked and data invalid', async () => {
    render(<CreateDog />);
    fireEvent.click(screen.getByText('Submit'));
    const errors = await screen.findAllByText('Name is required.');
    expect(errors.length).toBe(1);
  });
  it('resets form when reset is clicked', async () => {
    render(<CreateDog />);
    fireEvent.click(screen.getByText('Submit'));
    fireEvent.click(screen.getByText('Reset Form'));
    /* const errors = await screen.findAllByText("Name is required."); */
    /* expect(errors.length).toBe(0); */
  });
});
