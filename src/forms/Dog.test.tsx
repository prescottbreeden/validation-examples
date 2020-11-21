import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { FormType } from 'types/form.type';
import { Dog, emptyDog } from 'types/pet.type';
import { DogForm } from './Dog.form';

const DogFormMock: FormType<Dog> = {
  data: emptyDog(),
  onChange: () => null,
  resetValidation: false,
  submitFailed: false,
};

afterEach(cleanup);

describe('Dog Form', () => {
  it('triggers an error for Dog Name', () => {
    const { getByLabelText, getByText } = render(<DogForm {...DogFormMock} />);
    const input = getByLabelText('Dog Name');
    input.focus();
    input.blur();
    getByText('Name is required.');
  });
  it('triggers an error for Dog Breed', () => {
    const { getByLabelText, getByText } = render(<DogForm {...DogFormMock} />);
    const input = getByLabelText('Dog Breed');
    input.focus();
    input.blur();
    getByText('Breed is required.');
  });
  it('triggers an error for Favorite Chew Toy', () => {
    const { getByLabelText, getByText } = render(<DogForm {...DogFormMock} />);
    const input = getByLabelText('Favorite Chew Toy');
    input.focus();
    input.blur();
    getByText('Favorite Chew Toy is required.');
  });
});
