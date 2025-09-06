import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Framer Motion is correctly imported
import ProductCard from '../components/ProductCard';
import CategoriesBar from '../components/CategoriesBar';
import './HomePage.css';

// The animation variants for the container are correctly defined here.
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1 // This creates the nice delay effect between cards
        }
    }
};

const HomePage = () => {
    // All your state management for products and categories is correct.
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Your data fetching logic is perfect. It correctly refetches when the category changes.
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:5001/api/products';
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
    }, [selectedCategory]);

    return (
        <div className="homepage-container">
            <CategoriesBar 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />

            <h2>{selectedCategory === 'All' ? 'Fresh Finds' : selectedCategory} on UniBazaar</h2>
            
            {/* --- THIS IS THE MAIN CORRECTION --- */}
            {/* 1. The div is now a `motion.div`. */}
            {/* 2. It's connected to our variants and set to animate on load. */}
            <motion.div 
                className="product-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Your conditional rendering logic is perfect and goes inside the motion.div */}
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
            </motion.div>
        </div>
    );
};

export default HomePage;