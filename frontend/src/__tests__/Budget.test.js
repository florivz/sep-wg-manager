import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Budget from './Budget';

describe('Budget Component Tests', () => {
  // Test to check if the Budget component renders without errors
  test('renders Budget component without errors', () => {
    const { getByText, getByLabelText } = render(<Budget />);
  
    // Get elements by text and label text
    const titleElement = getByText('Haushaltsplaner'); // Find title element
    const payerSelect = getByLabelText('Zahler:'); // Find payer select input
    
    // Assert that the elements are in the document
    expect(titleElement).toBeInTheDocument();
    expect(payerSelect).toBeInTheDocument();
  });

  // Test to add an expense when the form is submitted
  test('adds an expense when the form is submitted', () => {
    const { getByLabelText, getByText } = render(<Budget />);
    
    // Get form input elements
    const payerSelect = getByLabelText('Zahler:');
    const descriptionInput = getByLabelText('Beschreibung:');
    const amountInput = getByLabelText('Betrag (€):');
    const submitButton = getByText('Ausgabe hinzufügen');
    
    // Simulate user input by firing change events
    fireEvent.change(payerSelect, { target: { value: '1' } });
    fireEvent.change(descriptionInput, { target: { value: 'Testausgabe' } });
    fireEvent.change(amountInput, { target: { value: '10' } });
    
    // Click the submit button
    fireEvent.click(submitButton);
    
    // Assert that the added expense is displayed
    const expenseRow = getByText('Testausgabe');
    expect(expenseRow).toBeInTheDocument();
  });

  // Test to delete an expense when the delete button is clicked
  test('deletes an expense when the delete button is clicked', () => {
    const { getByText, getByLabelText } = render(<Budget />);
    
    // Get form input elements
    const payerSelect = getByLabelText('Zahler:');
    const descriptionInput = getByLabelText('Beschreibung:');
    const amountInput = getByLabelText('Betrag (€):');
    const submitButton = getByText('Ausgabe hinzufügen');
    
    // Add an expense
    fireEvent.change(payerSelect, { target: { value: '1' } });
    fireEvent.change(descriptionInput, { target: { value: 'Testausgabe' } });
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.click(submitButton);
    
    // Assert that the added expense is displayed
    const expenseRow = getByText('Testausgabe');
    expect(expenseRow).toBeInTheDocument();
    
    // Get the delete button and click it
    const deleteButton = getByText('Löschen');
    fireEvent.click(deleteButton);
    
    // Assert that the expense is no longer in the document
    expect(expenseRow).not.toBeInTheDocument();
  });
});
