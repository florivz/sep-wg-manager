import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CleaningPlan from './pages/CleaningPlan';
import HousePlan from './pages/HousePlan';
import RoomManagement from './pages/RoomManagement';
import ShoppingList from './pages/ShoppingList';
import { RoommateProvider } from './contexts/RoommateContext';  // Pfad zu deinem RoommateContext

function App() {
    return (
        <Router>
            <RoommateProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cleaningplan" element={<CleaningPlan />} />
                    <Route path="/houseplan" element={<HousePlan />} />
                    <Route path="/roommanagement" element={<RoomManagement />} />
                    <Route path="/shoppinglist" element={<ShoppingList />} />
                </Routes>
            </RoommateProvider>
        </Router>
    );
}

export default App;
