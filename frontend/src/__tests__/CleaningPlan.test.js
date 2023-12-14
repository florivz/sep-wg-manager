import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CleaningSchedule from './CleaningSchedule';

describe('CleaningSchedule Component Tests', () => {
  // Mock Axios and useAuth functions
  jest.mock('axios');
  jest.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
      user: {
        user: {
          username: 'testUser'
        }
      }
    })
  }));

  // Test to check if the CleaningSchedule component renders without errors
  test('renders CleaningSchedule component without errors', () => {
    const { getByText, getByLabelText } = render(<CleaningSchedule />);
  
    // Get elements by text content and label text
    const titleElement = getByText('Putzplan'); // Title
    const roommateSelect = getByLabelText('Mitbewohner/in auswählen'); // Roommate selection
    
    // Assert that the elements are in the document
    expect(titleElement).toBeInTheDocument();
    expect(roommateSelect).toBeInTheDocument();
  });

  // Test to add a cleaning task when the form is submitted
  test('adds a cleaning task when the form is submitted', async () => {
    const { getByLabelText, getByText } = render(<CleaningSchedule />);
    
    const roommateSelect = getByLabelText('Mitbewohner/in auswählen');
    const taskInput = getByLabelText('Aufgabe eingeben');
    const addButton = getByText('Hinzufügen');
    
    // Simulate user input by firing change events
    fireEvent.change(roommateSelect, { target: { value: '1' } });
    fireEvent.change(taskInput, { target: { value: 'Testaufgabe' } });
    
    fireEvent.click(addButton);
    
    // Wait for the task to appear in the table
    await waitFor(() => getByText('Testaufgabe'));
    
    const taskRow = getByText('Testaufgabe');
    expect(taskRow).toBeInTheDocument();
  });

  // Test to delete a cleaning task when the delete button is clicked
  test('deletes a cleaning task when the delete button is clicked', async () => {
    const { getByLabelText, getByText, queryByText } = render(<CleaningSchedule />);
    
    const roommateSelect = getByLabelText('Mitbewohner/in auswählen');
    const taskInput = getByLabelText('Aufgabe eingeben');
    const addButton = getByText('Hinzufügen');
    
    // Simulate user input by firing change events
    fireEvent.change(roommateSelect, { target: { value: '1' } });
    fireEvent.change(taskInput, { target: { value: 'Testaufgabe' } });
    
    fireEvent.click(addButton);
    
    // Wait for the task to appear in the table
    await waitFor(() => getByText('Testaufgabe'));
    
    const deleteButton = getByText('Löschen');
    fireEvent.click(deleteButton);
    
    // Wait for the task to disappear from the table
    await waitFor(() => {
      const deletedTask = queryByText('Testaufgabe');
      expect(deletedTask).not.toBeInTheDocument();
    });
  });
});
