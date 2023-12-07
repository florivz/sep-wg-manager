import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter für React Router Tests
import Home from './Home';

describe('Home Component Tests', () => {
  // Mock useAuth und useRoommates
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
      roommates: [] // Hier können Sie Ihre eigenen Mock-Daten für Mitbewohner einfügen
    })
  }));

  test('renders Home component without errors', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    const welcomeText = getByText('Herzlichwillkommen testUser!');
    const cleaningPlanButton = getByText('Putzplan');
    const shoppingListButton = getByText('Einkaufsliste');
    const budgetButton = getByText('Haushaltsplan');
    const roomManagementButton = getByText('Mitbewohnerverwaltung');
    
    expect(welcomeText).toBeInTheDocument();
    expect(cleaningPlanButton).toBeInTheDocument();
    expect(shoppingListButton).toBeInTheDocument();
    expect(budgetButton).toBeInTheDocument();
    expect(roomManagementButton).toBeInTheDocument();
  });
});
