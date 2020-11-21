import React from 'react';
import { cleanup, fireEvent, screen, render } from '@testing-library/react';
import { CreateContact } from './CreateContact.component';

afterEach(cleanup);

describe('Create Contact Component', () => {
  /* const name = getByLabelText("Name"); */
  /* const isSubscribed = getByLabelText("Subscribe to Newsletter"); */
  /* const subscriptionEmail = getByLabelText("Subscription Email"); */
  /* const phoneNumber = getByLabelText("Phone Number"); */
  /* const description = getByLabelText("Description"); */
  /* const dogName = getByLabelText("Dog Name"); */
  /* const dogBreed = getByLabelText("Dog Breed"); */
  /* const favoriteChewToy = getByLabelText("Favorite Chew Toy"); */
  /* const catName = getByLabelText("Cat Name"); */
  /* const catBreed = getByLabelText("Cat Breed"); */
  /* const sleepingHabits = getByLabelText("Sleeping Habits"); */

  it('adds a form for Phone when add is clicked', async () => {
    render(<CreateContact />);
    fireEvent.click(screen.getByText('Add'));
    const roles = await screen.findAllByLabelText('Phone Number');
    expect(roles.length).toBe(2);
  });
  it('removes a form for Phone when remove icon is clicked', async () => {
    render(<CreateContact />);
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getAllByText('Remove')[0]);
    const roles = await screen.findAllByLabelText('Phone Number');
    expect(roles.length).toBe(1);
  });
  it('errors if isSubscribed is clicked and email is empty', async () => {
    render(<CreateContact />);
    fireEvent.click(screen.getByLabelText('Subscribe to Newsletter'));
    const email = screen.getByLabelText('Subscription Email');
    email.focus();
    email.blur();
    screen.getByText('Please provide an email.');
  });
  it('errors if submit is clicked and data invalid', async () => {
    render(<CreateContact />);
    fireEvent.click(screen.getByText('Submit'));
    const errors = await screen.findAllByText('Name is required.');
    expect(errors.length).toBe(3);
  });
  it('resets form when reset is clicked', async () => {
    render(<CreateContact />);
    fireEvent.click(screen.getByText('Submit'));
    fireEvent.click(screen.getByText('Reset Form'));
    /* const errors = await screen.findAllByText("Name is required."); */
    /* expect(errors.length).toBe(0); */
  });
});
