import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const CartContext = createContext();

// 2. Create the provider component
export const CartProvider = ({ children }) => {
    // 3. The state that will hold the cart items
    // We initialize it with the value from localStorage, if it exists
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            return [];
        }
    });

    // 4. Persist cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // 5. Function to add an item to the cart
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Check if the item is already in the cart
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                // If it exists, map over the items and increase the quantity of the matching item
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If it's a new item, add it to the cart with a quantity of 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // 6. Function to remove an item from the cart
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    // 7. Clear the entire cart (we'll use this after a successful purchase)
    const clearCart = () => {
        setCartItems([]);
    };

    // 8. Provide the state and functions to all child components
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};