import React, { createContext, useContext, useState } from 'react';

// Create a context for user information
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => {
    return useContext(UserContext);
};
