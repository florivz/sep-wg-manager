import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { RoommateProvider } from '../contexts/RoommateContext';
import { AuthProvider } from '../contexts/AuthContext';
import RoommateManagement from './RoommateManagement';

describe('RoommateManagement Component Tests', () => {
  // Mock axios.get and axios.delete
  const mockAxiosGet = jest.spyOn(axios, 'get');
  const mockAxiosDelete = jest.spyOn(axios, 'delete');
  const mockAxiosPost = jest.spyOn(axios, 'post');

  // Mock RoommateProvider and AuthProvider
  const MockedProviders = ({ children }) => (
    <AuthProvider>
      <RoommateProvider>{children}</RoommateProvider>
    </AuthProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders RoommateManagement component without errors', () => {
    const { getByText, getByLabelText } = render(
      <MockedProviders>
        <RoommateManagement />
      </MockedProviders>
    );

    const header = getByText('Mitbewohnerverwaltung');
    const firstnameInput = getByLabelText('Vorname:');
    const lastnameInput = getByLabelText('Nachname:');
    const emailInput = getByLabelText('Email:');
    const addButton = getByText('Hinzufügen');
    const countText = getByText('Anzahl Mitbewohner/innen: 0');

    expect(header).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  });

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

    fireEvent.change(firstnameInput, { target: { value: 'John' } });
    fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith('http://localhost:5001/api/roommates', {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        username: 'testUser', // Replace with the actual username from AuthContext
      });
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/roommates/testUser');
    });
  });

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
      expect(mockAxiosDelete).toHaveBeenCalledWith('http://localhost:5001/api/roommates/1');
      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5001/api/roommates/testUser');
    });
  });
});
