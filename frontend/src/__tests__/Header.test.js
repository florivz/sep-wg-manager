import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { AuthProvider } from '../contexts/AuthContext';
import Header from './Header';

describe('Header Component Tests', () => {
  test('renders Header component without errors', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <AuthProvider value={{ user: {} }}>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    const logoImage = getByAltText('Responsive image');
    expect(logoImage).toBeInTheDocument();
  });
});
