import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom' //used this to help debug why it wasn't running https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import AddSightingForm from '../AddSightingForm';

describe('AddIndividualForm Component (without mocks)', () => {
  it('renders the form fields', async () => {
    render(<AddSightingForm />);

    // form has the fields and buttons
    await waitFor(() => {
      expect(screen.getByLabelText('Date/Time:')).toBeInTheDocument();
      expect(screen.getByLabelText('Animal:')).toBeInTheDocument();
      expect(screen.getByLabelText('Health:')).toBeInTheDocument();
      expect(screen.getByLabelText('Sighter Email:')).toBeInTheDocument();
      expect(screen.getByLabelText('Location:')).toBeInTheDocument();
    });
  });
});