import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // We can reuse the homepage grid styles

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query'); // Get the 'query' from the URL

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // This effect runs whenever the 'query' from the URL changes
        if (!query) return;

        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5001/api/products?search=${encodeURIComponent(query)}`);
                setProducts(res.data);
            } catch (err) {
                setError('Could not fetch search results.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="homepage-container">
            {/* Display a dynamic title */}
            <h2>Search Results for "{query}"</h2>
            
            <div className="product-grid">
                {loading ? (
                    <p>Searching...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products found matching your search. Try another term!</p>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;