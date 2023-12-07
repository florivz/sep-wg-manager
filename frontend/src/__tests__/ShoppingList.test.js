import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AuthProvider } from '../contexts/AuthContext';
import ShoppingList from './ShoppingList';

describe('ShoppingList Component Tests', () => {
  // Mock axios.get and axios.post
  const mockAxiosGet = jest.spyOn(axios, 'get');
  const mockAxiosPost = jest.spyOn(axios, 'post');
  const mockAxiosDelete = jest.spyOn(axios, 'delete');

  // Mock AuthProvider
  const MockedAuthProvider = ({ children }) => (
    <AuthProvider value={{ user: { user: { username: 'testUser' } } }}>{children}</AuthProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ShoppingList component without errors', () => {
    const { getByText, getByPlaceholderText } = render(
      <MockedAuthProvider>
        <ShoppingList />
      </MockedAuthProvider>
    );

    const header = getByText('Einkaufsliste');
    const itemInput = getByPlaceholderText('Item hinzufügen');
    const addButton = getByText('Hinzufügen');

    expect(header).toBeInTheDocument();
    expect(itemInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MockedAuthProvider>
        <ShoppingList />
      </MockedAuthProvider>
    );

    const itemInput = getByPlaceholderText('Item hinzufügen');
    const addButton = getByText('Hinzufügen');

    fireEvent.change(itemInput, { target: { value: 'Milk' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items', {
        itemname: 'Milk',
        username: 'testUser',
      });
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items/testUser');
    });
  });

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
      expect(mockAxiosDelete).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items/1');
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/shopping-items/testUser');
    });
  });

  // You can add more test cases to cover other scenarios as needed.
});
