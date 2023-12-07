import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Budget from './Budget';

describe('Budget Component Tests', () => {
  test('renders Budget component without errors', () => {
    const { getByText, getByLabelText } = render(<Budget />);
  
    const titleElement = getByText('Haushaltsplaner');
    const payerSelect = getByLabelText('Zahler:');
    
    expect(titleElement).toBeInTheDocument();
    expect(payerSelect).toBeInTheDocument();
  });

  test('adds an expense when the form is submitted', () => {
    const { getByLabelText, getByText } = render(<Budget />);
    
    const payerSelect = getByLabelText('Zahler:');
    const descriptionInput = getByLabelText('Beschreibung:');
    const amountInput = getByLabelText('Betrag (€):');
    const submitButton = getByText('Ausgabe hinzufügen');
    
    fireEvent.change(payerSelect, { target: { value: '1' } });
    fireEvent.change(descriptionInput, { target: { value: 'Testausgabe' } });
    fireEvent.change(amountInput, { target: { value: '10' } });
    
    fireEvent.click(submitButton);
    
    const expenseRow = getByText('Testausgabe');
    expect(expenseRow).toBeInTheDocument();
  });

  test('deletes an expense when the delete button is clicked', () => {
    const { getByText, getByLabelText } = render(<Budget />);
    
    const payerSelect = getByLabelText('Zahler:');
    const descriptionInput = getByLabelText('Beschreibung:');
    const amountInput = getByLabelText('Betrag (€):');
    const submitButton = getByText('Ausgabe hinzufügen');
    
    fireEvent.change(payerSelect, { target: { value: '1' } });
    fireEvent.change(descriptionInput, { target: { value: 'Testausgabe' } });
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.click(submitButton);
    
    const expenseRow = getByText('Testausgabe');
    expect(expenseRow).toBeInTheDocument();
    
    const deleteButton = getByText('Löschen');
    fireEvent.click(deleteButton);
    
    expect(expenseRow).not.toBeInTheDocument();
  });
});
