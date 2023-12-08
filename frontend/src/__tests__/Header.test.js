import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { AuthProvider } from '../contexts/AuthContext';
import Header from './Header'; // Import the Header component for testing

describe('Header Component Tests', () => {
  // Test to check if the Header component renders without errors
  test('renders Header component without errors', () => {
    const { getByAltText } = render(
      // Render the Header component wrapped in necessary providers and Router
      <MemoryRouter>
        <AuthProvider value={{ user: {} }}>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    // Get the logo image element by alt text
    const logoImage = getByAltText('Responsive image');
    
    // Assert that the logo image is in the document
    expect(logoImage).toBeInTheDocument();
  });
});
