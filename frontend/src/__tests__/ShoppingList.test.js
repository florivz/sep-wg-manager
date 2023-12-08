import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AuthProvider } from '../contexts/AuthContext';
import ShoppingList from './ShoppingList'; // Import the ShoppingList component for testing

describe('ShoppingList Component Tests', () => {
  // Mock axios.get, axios.post, and axios.delete
  const mockAxiosGet = jest.spyOn(axios, 'get');
  const mockAxiosPost = jest.spyOn(axios, 'post');
  const mockAxiosDelete = jest.spyOn(axios, 'delete');

  // Mock AuthProvider for testing
  const MockedAuthProvider = ({ children }) => (
    <AuthProvider value={{ user: { user: { username: 'testUser' } } }}>{children}</AuthProvider>
  );

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test to check if the ShoppingList component renders without errors
  test('renders ShoppingList component without errors', () => {
    const { getByText, getByPlaceholderText } = render(
      <MockedAuthProvider>
        <ShoppingList />
      </MockedAuthProvider>
    );

    // Get elements by text content and placeholder text
    const header = getByText('Einkaufsliste'); // Header
    const itemInput = getByPlaceholderText('Item hinzufügen'); // Item input
    const addButton = getByText('Hinzufügen'); // Add button

    // Assert that the elements are in the document
    expect(header).toBeInTheDocument();
    expect(itemInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  // Test to handle form submission
  test('handles form submission', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MockedAuthProvider>
        <ShoppingList />
      </MockedAuthProvider>
    );

    const itemInput = getByPlaceholderText('Item hinzufügen');
    const addButton = getByText('Hinzufügen');

    // Simulate user input by firing change events
    fireEvent.change(itemInput, { target: { value: 'Milk' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      // Verify that axios.post was called with the expected parameters
      expect(mockAxiosPost).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items', {
        itemname: 'Milk',
        username: 'testUser',
      });

      // Verify that axios.get was called to fetch shopping items data
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items/testUser');
    });
  });

  // Test to handle item removal
  test('handles item removal', async () => {
    // Mock Axios get response with sample items data
    mockAxiosGet.mockResolvedValueOnce({
      data: [
        {
          itemid: 1,
          itemname: 'Milk',
        },
        {
          itemid: 2,
          itemname: 'Eggs',
        },
      ],
    });

    const { getAllByText } = render(
      <MockedAuthProvider>
        <ShoppingList />
      </MockedAuthProvider>
    );

    const removeButtons = getAllByText('Entfernen');

    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      // Verify that axios.delete was called with the expected parameters
      expect(mockAxiosDelete).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items/1');

      // Verify that axios.get was called to fetch updated shopping items data
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items/testUser');
    });
  });
});
