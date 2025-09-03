import React, { useState } from 'react';
import axios from 'axios';
// We can re-use the form styles we already created
import '../App.css'; 

const SellerDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Stationery', // Default category
        listingType: 'sell', // Default listing type
        price: '',
        pricePerDay: '',
        lateFeePerDay: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { name, description, category, listingType, price, pricePerDay, lateFeePerDay } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('You must be logged in to list an item.');
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token // This is how we send the token to the protected route!
            }
        };

        const body = JSON.stringify(formData);

        try {
            const res = await axios.post('http://localhost:5001/api/products', body, config);
            console.log('Product created:', res.data);
            setSuccessMessage('Your item has been listed successfully!');
            // Clear the form
            setFormData({ name: '', description: '', category: 'Stationery', listingType: 'sell', price: '', pricePerDay: '', lateFeePerDay: '' });
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            setErrorMessage(err.response ? err.response.data.msg : 'Server Error. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>List a New Item on UniBazaar</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Item Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} placeholder="e.g., Scientific Calculator FX-991" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={description} onChange={onChange} placeholder="Describe the item, its condition, and any accessories." required></textarea>
                </div>
                
                <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={category} onChange={onChange}>
                        <option value="Stationery">Stationery</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Books">Books</option>
                        <option value="Apparel">Apparel & Suits</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Listing Type</label>
                    <select name="listingType" value={listingType} onChange={onChange}>
                        <option value="sell">Sell</option>
                        <option value="borrow">Borrow</option>
                    </select>
                </div>

                {listingType === 'sell' ? (
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input type="number" name="price" value={price} onChange={onChange} placeholder="e.g., 500" required />
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Price Per Day (₹)</label>
                            <input type="number" name="pricePerDay" value={pricePerDay} onChange={onChange} placeholder="e.g., 20" required />
                        </div>
                        <div className="form-group">
                            <label>Late Fee Per Day (₹)</label>
                            <input type="number" name="lateFeePerDay" value={lateFeePerDay} onChange={onChange} placeholder="e.g., 30" required />
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-primary">List My Item</button>
            </form>
            {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
    );
};

export default SellerDashboard;