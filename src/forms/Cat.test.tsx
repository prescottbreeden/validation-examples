import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { FormType } from 'types/form.type';
import { Cat, emptyCat } from 'types/pet.type';
import { CatForm } from './Cat.form';

const CatFormMock: FormType<Cat> = {
  data: emptyCat(),
  onChange: () => null,
  resetValidation: false,
  submitFailed: false,
};

afterEach(cleanup);

describe('Cat Form', () => {
  it('triggers an error for Cat Name', () => {
    const { getByLabelText, getByText } = render(<CatForm {...CatFormMock} />);
    const input = getByLabelText('Cat Name');
    input.focus();
    input.blur();
    getByText('Name is required.');
  });
  it('triggers an error for Cat Breed', () => {
    const { getByLabelText, getByText } = render(<CatForm {...CatFormMock} />);
    const input = getByLabelText('Cat Breed');
    input.focus();
    input.blur();
    getByText('Breed is required.');
  });
  it('triggers an error for Sleeping Habits', () => {
    const { getByLabelText, getByText } = render(<CatForm {...CatFormMock} />);
    const input = getByLabelText('Sleeping Habits');
    input.focus();
    input.blur();
    getByText('Sleeping Habits is required.');
  });
});
