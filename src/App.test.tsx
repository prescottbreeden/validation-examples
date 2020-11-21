import React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import App from 'App';

afterEach(cleanup);

describe('App Component', () => {
  it('Renders the App', async () => {
    render(<App />);
    screen.getByText('De-formed-validations Examples');
  });
});
