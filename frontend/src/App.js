// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; 
import Home from './pages/Home';
import CleaningPlan from './pages/CleaningPlan';
import HousePlan from './pages/HousePlan';
import RoomManagement from './pages/RoomManagement';
import ShoppingList from './pages/ShoppingList';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { RoommateProvider } from './contexts/RoommateContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <RoommateProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Login />} />
                        <Route 
                          path="/home" 
                          element={
                            <ProtectedRoute>
                              <Home />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/cleaningplan" 
                          element={
                            <ProtectedRoute>
                              <CleaningPlan />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/houseplan" 
                          element={
                            <ProtectedRoute>
                              <HousePlan />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/roommanagement" 
                          element={
                            <ProtectedRoute>
                              <RoomManagement />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/shoppinglist" 
                          element={
                            <ProtectedRoute>
                              <ShoppingList />
                            </ProtectedRoute>
                          } 
                        />
                    </Routes>
                </RoommateProvider>
            </Router>
        </AuthProvider>
    );
}

export default App;
