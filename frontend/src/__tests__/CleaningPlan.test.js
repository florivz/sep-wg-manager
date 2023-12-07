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

  test('renders CleaningSchedule component without errors', () => {
    const { getByText, getByLabelText } = render(<CleaningSchedule />);
  
    const titleElement = getByText('Putzplan');
    const roommateSelect = getByLabelText('Mitbewohner/in auswählen');
    
    expect(titleElement).toBeInTheDocument();
    expect(roommateSelect).toBeInTheDocument();
  });

  test('adds a cleaning task when the form is submitted', async () => {
    const { getByLabelText, getByText } = render(<CleaningSchedule />);
    
    const roommateSelect = getByLabelText('Mitbewohner/in auswählen');
    const taskInput = getByLabelText('Aufgabe eingeben');
    const addButton = getByText('Hinzufügen');
    
    fireEvent.change(roommateSelect, { target: { value: '1' } });
    fireEvent.change(taskInput, { target: { value: 'Testaufgabe' } });
    
    fireEvent.click(addButton);
    
    // Wait for the task to appear in the table
    await waitFor(() => getByText('Testaufgabe'));
    
    const taskRow = getByText('Testaufgabe');
    expect(taskRow).toBeInTheDocument();
  });

  test('deletes a cleaning task when the delete button is clicked', async () => {
    const { getByLabelText, getByText, queryByText } = render(<CleaningSchedule />);
    
    const roommateSelect = getByLabelText('Mitbewohner/in auswählen');
    const taskInput = getByLabelText('Aufgabe eingeben');
    const addButton = getByText('Hinzufügen');
    
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
