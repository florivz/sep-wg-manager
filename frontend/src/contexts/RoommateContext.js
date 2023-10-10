import React, { createContext, useContext, useState } from 'react';

// Erstellen des Contexts
export const RoommateContext = createContext();

// Custom Hook für einfachen Zugriff
export const useRoommates = () => {
    return useContext(RoommateContext);
};

// Der Provider
export const RoommateProvider = ({ children }) => {
    const [roommates, setRoommates] = useState([]);

    const value = {
        roommates,
        setRoommates
    };

    return (
        <RoommateContext.Provider value={value}>
            {children}
        </RoommateContext.Provider>
    );
};
