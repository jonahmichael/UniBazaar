import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailsPage.css'; // We will create this next

const ProductDetailsPage = () => {
    const { id } = useParams(); // This hook gets the 'id' from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError('Could not fetch product details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Re-run the effect if the id changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="details-container">
            <div className="details-image-section">
                <img src="https://via.placeholder.com/600x400" alt={product.name} className="main-product-image" />
            </div>
            <div className="details-info-section">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-category-detail">{product.category}</p>
                <div className="product-price-detail">
                    {product.listingType === 'sell' ? `₹${product.price}` : `₹${product.pricePerDay} per day`}
                </div>
                <h3 className="section-title">Description</h3>
                <p className="product-description">{product.description}</p>
                
                {/* We will add borrow-specific info here in the next sprint */}

                <div className="action-buttons">
                    {product.listingType === 'sell' ? (
                        <button className="btn btn-primary">Add to Cart</button>
                    ) : (
                        <button className="btn btn-primary">Borrow Now</button>
                    )}
                    <button className="btn btn-secondary">Add to Wishlist</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;