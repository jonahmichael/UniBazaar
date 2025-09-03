import React, { useState } from 'react';
import axios from 'axios';

const SellerDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        listingType: 'sell',
        price: '',
        pricePerDay: ''
    });
    // Add states for error and success messages

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            // Handle case where user is not logged in
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token // This is how we send the token!
            }
        };

        const body = JSON.stringify(formData);

        try {
            const res = await axios.post('http://localhost:5001/api/products', body, config);
            console.log('Product created:', res.data);
            // Show a success message to the user
        } catch (err) {
            console.error(err.response.data);
            // Show an error message
        }
    };
    
    // The JSX for the form will use the styles from App.css / index.css
    return (
        <div className="form-container">
            <h2>List a New Item</h2>
            {/* The form JSX goes here, similar to the register form */}
            <form onSubmit={onSubmit}>
                {/* Inputs for name, description, etc. */}
                <button type="submit" className="btn btn-primary">List Item</button>
            </form>
        </div>
    );
};

export default SellerDashboard;