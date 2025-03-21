import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom' //used this to help debug why it wasn't running https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import AddIndividualForm from '/Users/tpl622_6/Documents/techtonica/techtonica-assignments/endangered-animals/client/src/components/AddIndividualForm.jsx';

describe('Add indivdual forms functionality', () => {
  it('renders all form fields and loads species', async () => {
    // renders the form
    render(<AddIndividualForm />)

    await waitFor(() => {
      const screenEldment = screen.getByLabelText('Nickname:');
      expect(screenEldment).toBeInTheDocument();
      const speciesElement = screen.getByLabelText('Species:');
      expect(speciesElement).toBeInTheDocument();
    });
  });
});

// import numbers from '../numbers';

// it('returns a sum of two number', () => {
//   expect(numbers(2, 2)).toBe(4);
// })