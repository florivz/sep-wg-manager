import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { RoommateProvider } from '../contexts/RoommateContext';
import { AuthProvider } from '../contexts/AuthContext';
import RoommateManagement from './RoommateManagement';

describe('RoommateManagement Component Tests', () => {
  // Mock axios.get, axios.delete, and axios.post
  const mockAxiosGet = jest.spyOn(axios, 'get');
  const mockAxiosDelete = jest.spyOn(axios, 'delete');
  const mockAxiosPost = jest.spyOn(axios, 'post');

  // Mock RoommateProvider and AuthProvider for testing
  const MockedProviders = ({ children }) => (
    <AuthProvider>
      <RoommateProvider>{children}</RoommateProvider>
    </AuthProvider>
  );

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test to check if the RoommateManagement component renders without errors
  test('renders RoommateManagement component without errors', () => {
    const { getByText, getByLabelText } = render(
      <MockedProviders>
        <RoommateManagement />
      </MockedProviders>
    );

    // Get elements by text content and label text
    const header = getByText('Mitbewohnerverwaltung'); // Header
    const firstnameInput = getByLabelText('Vorname:'); // Firstname input
    const lastnameInput = getByLabelText('Nachname:'); // Lastname input
    const emailInput = getByLabelText('Email:'); // Email input
    const addButton = getByText('Hinzufügen'); // Add button
    const countText = getByText('Anzahl Mitbewohner/innen: 0'); // Count text

    // Assert that the elements are in the document
    expect(header).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  });

  // Test to handle form submission
  test('handles form submission', async () => {
    const { getByLabelText, getByText } = render(
      <MockedProviders>
        <RoommateManagement />
      </MockedProviders>
    );

    const firstnameInput = getByLabelText('Vorname:');
    const lastnameInput = getByLabelText('Nachname:');
    const emailInput = getByLabelText('Email:');
    const addButton = getByText('Hinzufügen');

    // Simulate user input by firing change events
    fireEvent.change(firstnameInput, { target: { value: 'John' } });
    fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      // Verify that axios.post was called with the expected parameters
      expect(mockAxiosPost).toHaveBeenCalledWith('http://localhost:5001/api/roommates', {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        username: 'testUser',
      });

      // Verify that axios.get was called to fetch roommates data
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/roommates/testUser');
    });
  });

  // Test to handle roommate deletion
  test('handles roommate deletion', async () => {
    // Mock Axios get response with sample roommates data
    mockAxiosGet.mockResolvedValueOnce({
      data: [
        {
          roommateid: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
        },
        {
          roommateid: 2,
          firstname: 'Jane',
          lastname: 'Smith',
          email: 'jane.smith@example.com',
        },
      ],
    });

    const { getAllByText } = render(
      <MockedProviders>
        <RoommateManagement />
      </MockedProviders>
    );

    const deleteButtons = getAllByText('Entfernen');

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      // Verify that axios.delete was called with the expected parameters
      expect(mockAxiosDelete).toHaveBeenCalledWith('http://localhost:5001/api/roommates/1');

      // Verify that axios.get was called to fetch updated roommates data
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/roommates/testUser');
    });
  });
});
