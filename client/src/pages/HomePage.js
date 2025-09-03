import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // We will create this file

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // This is the line that makes the API call we just tested in Postman
                const res = await axios.get('http://localhost:5001/api/products');
                setProducts(res.data);
            } catch (err) {
                setError('Could not fetch products. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // The empty array means this effect runs only once when the component mounts

    if (loading) return <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '3rem' }}>Loading products...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

    return (
        <div className="homepage-container">
            <h2>Fresh Finds on UniBazaar</h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products have been listed yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;