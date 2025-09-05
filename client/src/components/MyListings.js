import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardLists.css';

const MyListings = () => {
    const [listings, setListings] = useState([]);
    // ... loading and error state ...

    useEffect(() => {
        const fetchListings = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            try {
                const res = await axios.get('http://localhost:5001/api/products/my-listings', config);
                setListings(res.data);
            } catch (err) { /* ... handle error ... */ }
        };
        fetchListings();
    }, []);

    if (listings.length === 0) return <p>You have not listed any items yet.</p>;

    return (
        <div className="list-container">
            {listings.map(product => (
                <div key={product._id} className="list-item">
                    <img src={product.images[0] || 'https://via.placeholder.com/150x100'} alt={product.name} />
                    <div className="item-details">
                        <h3>{product.name}</h3>
                        <p>Price: {product.price ? `₹${product.price}` : `₹${product.pricePerDay}/day`}</p>
                        <p>Status: {product.isAvailable ? 'Available' : 'Sold/Borrowed'}</p>
                    </div>
                    {/* In a future sprint, these would be functional */}
                    <button className="btn btn-secondary">Edit</button>
                </div>
            ))}
        </div>
    );
};
export default MyListings;