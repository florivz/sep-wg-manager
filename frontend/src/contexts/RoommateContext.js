import React, { createContext, useContext, useState } from 'react';

export const RoommateContext = createContext();

export const useRoommates = () => {
    return useContext(RoommateContext);
};

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
