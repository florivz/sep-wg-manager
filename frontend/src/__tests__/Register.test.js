import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';
import { AuthProvider } from '../contexts/AuthContext';

describe('Register Component Tests', () => {
  // Mock axios.post
  const mockAxios = jest.spyOn(axios, 'post');

  // Mock navigate
  const mockNavigate = jest.fn();

  // Mock AuthProvider for testing
  const mockAuthProvider = ({ children }) => {
    return (
      <AuthProvider>
        <MemoryRouter initialEntries={['/register']}>
          <Route path="/register">{children}</Route>
          <Route path="/home">Home Page</Route>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test to check if the Register component renders without errors
  test('renders Register component without errors', () => {
    const { getByText, getByLabelText } = render(
      <mockAuthProvider>
        <Register />
      </mockAuthProvider>
    );
  
    // Get elements by text content and label text
    const registerHeader = getByText('Neue/n Nutzer/in anlegen'); // Register header
    const usernameInput = getByLabelText('Nutzername:'); // Username input
    const passwordInput = getByLabelText('Passwort:'); // Password input
    const emailInput = getByLabelText('Email:'); // Email input
    const registerButton = getByText('Registrieren'); // Register button
    
    // Assert that the elements are in the document
    expect(registerHeader).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  // Test to handle successful registration
  test('handles successful registration', async () => {
    mockAxios.mockResolvedValueOnce({ data: { success: true } });
    const { getByLabelText, getByText } = render(
      <mockAuthProvider>
        <Register />
      </mockAuthProvider>
    );

    const usernameInput = getByLabelText('Nutzername:');
    const passwordInput = getByLabelText('Passwort:');
    const emailInput = getByLabelText('Email:');
    const registerButton = getByText('Registrieren');

    // Simulate user input by firing change events
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      // Verify that axios.post was called with the expected parameters
      expect(mockAxios).toHaveBeenCalledWith('http://localhost:5001/api/user', {
        username: 'testUser',
        password: 'testPassword',
        email: 'test@example.com',
      });

      // Verify that navigation to the home page occurred
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  // Test to handle registration failure
  test('handles registration failure', async () => {
    mockAxios.mockResolvedValueOnce({ data: { success: false, message: 'Registration failed' } });
    const { getByLabelText, getByText } = render(
      <mockAuthProvider>
        <Register />
      </mockAuthProvider>
    );

    const usernameInput = getByLabelText('Nutzername:');
    const passwordInput = getByLabelText('Passwort:');
    const emailInput = getByLabelText('Email:');
    const registerButton = getByText('Registrieren');

    // Simulate user input by firing change events
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      // Verify that an error message is displayed
      const errorElement = getByText('Registration failed');
      expect(errorElement).toBeInTheDocument();
    });
  });
});
