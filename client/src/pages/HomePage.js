import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CategoriesBar from '../components/CategoriesBar'; // <-- 1. Import the new component
import './HomePage.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // 2. Add state for the selected category
    const [selectedCategory, setSelectedCategory] = useState('All');

    // 3. Update the data fetching logic to include the category
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:5001/api/products';
                // If the selected category is not 'All', add it to the URL as a query parameter
                if (selectedCategory !== 'All') {
                    url += `?category=${encodeURIComponent(selectedCategory)}`;
                }
                const res = await axios.get(url);
                setProducts(res.data);
            } catch (err) {
                setError('Could not fetch products. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]); // 4. VERY IMPORTANT: Re-run the effect whenever selectedCategory changes!

    return (
        <div className="homepage-container">
            {/* 5. Add the CategoriesBar component */}
            <CategoriesBar 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />

            <h2>{selectedCategory === 'All' ? 'Fresh Finds' : selectedCategory} on UniBazaar</h2>
            
            <div className="product-grid">
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;