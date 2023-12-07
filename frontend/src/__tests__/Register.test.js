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

  // Mock AuthProvider
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Register component without errors', () => {
    const { getByText, getByLabelText } = render(
      <mockAuthProvider>
        <Register />
      </mockAuthProvider>
    );
  
    const registerHeader = getByText('Neue/n Nutzer/in anlegen');
    const usernameInput = getByLabelText('Nutzername:');
    const passwordInput = getByLabelText('Passwort:');
    const emailInput = getByLabelText('Email:');
    const registerButton = getByText('Registrieren');
    
    expect(registerHeader).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

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

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://localhost:5001/api/user', {
        username: 'testUser',
        password: 'testPassword',
        email: 'test@example.com',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

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

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorElement = getByText('Registration failed');
      expect(errorElement).toBeInTheDocument();
    });
  });
});
