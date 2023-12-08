import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home'; // Import the Home component for testing

describe('Home Component Tests', () => {
  // Mock useAuth and useRoommates for testing
  jest.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
      user: {
        user: {
          username: 'testUser'
        }
      }
    })
  }));

  jest.mock('../contexts/RoommateContext', () => ({
    useRoommates: () => ({
      roommates: []
    })
  }));

  // Test to check if the Home component renders without errors
  test('renders Home component without errors', () => {
    const { getByText } = render(
      // Render the Home component wrapped in a MemoryRouter
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    // Get elements by text content
    const welcomeText = getByText('Herzlich willkommen testUser!'); // Welcome message
    const cleaningPlanButton = getByText('Putzplan'); // Cleaning plan button
    const shoppingListButton = getByText('Einkaufsliste'); // Shopping list button
    const budgetButton = getByText('Haushaltsplan'); // Budget button
    const roomManagementButton = getByText('Mitbewohnerverwaltung'); // Room management button
    
    // Assert that the elements are in the document
    expect(welcomeText).toBeInTheDocument();
    expect(cleaningPlanButton).toBeInTheDocument();
    expect(shoppingListButton).toBeInTheDocument();
    expect(budgetButton).toBeInTheDocument();
    expect(roomManagementButton).toBeInTheDocument();
  });
});
