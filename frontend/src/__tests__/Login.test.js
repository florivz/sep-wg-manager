import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';

describe('Login Component Tests', () => {
  // Mock axios.post
  const mockAxios = jest.spyOn(axios, 'post');

  // Mock navigate
  const mockNavigate = jest.fn();

  // Mock AuthProvider for testing
  const mockAuthProvider = ({ children }) => {
    return (
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Route path="/login">{children}</Route>
          <Route path="/home">Home Page</Route>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test to check if the Login component renders without errors
  test('renders Login component without errors', () => {
    const { getByText, getByLabelText } = render(
      <mockAuthProvider>
        <Login />
      </mockAuthProvider>
    );
  
    // Get elements by text content and label text
    const loginHeader = getByText('Login');
    const usernameInput = getByLabelText('Nutzername:');
    const passwordInput = getByLabelText('Passwort:');
    const loginButton = getByText('Login');
    
    // Assert that the elements are in the document
    expect(loginHeader).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // Test to handle successful login
  test('handles successful login', async () => {
    mockAxios.mockResolvedValueOnce({ status: 200, data: { token: 'testToken' } });
    const { getByLabelText, getByText } = render(
      <mockAuthProvider>
        <Login />
      </mockAuthProvider>
    );

    const usernameInput = getByLabelText('Nutzername:');
    const passwordInput = getByLabelText('Passwort:');
    const loginButton = getByText('Login');

    // Simulate user input by firing change events
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      // Verify that axios.post was called with the expected parameters
      expect(mockAxios).toHaveBeenCalledWith('http://localhost:5001/api/login', {
        username: 'testUser',
        password: 'testPassword',
      });

      // Verify that navigation to the home page occurred
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  // Test to handle login failure with invalid status code
  test('handles login failure with invalid status code', async () => {
    mockAxios.mockResolvedValueOnce({ status: 500 });
    const { getByLabelText, getByText } = render(
      <mockAuthProvider>
        <Login />
      </mockAuthProvider>
    );

    const usernameInput = getByLabelText('Nutzername:');
    const passwordInput = getByLabelText('Passwort:');
    const loginButton = getByText('Login');

    // Simulate user input by firing change events
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      // Verify that axios.post was called with the expected parameters
      expect(mockAxios).toHaveBeenCalledWith('http://localhost:5001/api/login', {
        username: 'testUser',
        password: 'testPassword',
      });

      // Verify that an error message is displayed
      const errorElement = getByText('Login failed: Invalid status code');
      expect(errorElement).toBeInTheDocument();
    });
  });
});
