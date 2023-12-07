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

  // Mock AuthProvider
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component without errors', () => {
    const { getByText, getByLabelText } = render(
      <mockAuthProvider>
        <Login />
      </mockAuthProvider>
    );
  
    const loginHeader = getByText('Login');
    const usernameInput = getByLabelText('Nutzername:');
    const passwordInput = getByLabelText('Passwort:');
    const loginButton = getByText('Login');
    
    expect(loginHeader).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

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

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://localhost:5001/api/login', {
        username: 'testUser',
        password: 'testPassword',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

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

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://localhost:5001/api/login', {
        username: 'testUser',
        password: 'testPassword',
      });
      const errorElement = getByText('Login failed: Invalid status code');
      expect(errorElement).toBeInTheDocument();
    });
  });
});
