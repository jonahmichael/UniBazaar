import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // We need to install this library

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('buyer'); // Default role is 'buyer'

    // This function runs when the app first loads
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // For now, we'll just set a placeholder user object
                // In a future sprint, you'd fetch full user data from an API
                setUser({ id: decodedToken.user.id, name: 'Student' });
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const switchRole = () => {
        setRole(prevRole => (prevRole === 'buyer' ? 'seller' : 'buyer'));
    };

    return (
        <UserContext.Provider value={{ user, setUser, role, switchRole }}>
            {children}
        </UserContext.Provider>
    );
};