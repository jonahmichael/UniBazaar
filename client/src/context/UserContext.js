import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Will hold user data after login
    const [role, setRole] = useState('buyer'); // 'buyer' or 'seller'

    const switchRole = () => setRole(prevRole => prevRole === 'buyer' ? 'seller' : 'buyer');

    return (
        <UserContext.Provider value={{ user, setUser, role, switchRole }}>
            {children}
        </UserContext.Provider>
    );
};