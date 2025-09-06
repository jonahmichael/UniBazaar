import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion'; // Motion is already imported
import { CartContext } from '../context/CartContext';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
    // All existing state and context hooks are preserved
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { addToCart } = useContext(CartContext);
    const [returnDate, setReturnDate] = useState(new Date());
    const [borrowDays, setBorrowDays] = useState(1);
    
    // All existing useEffect hooks for data fetching and calculations are preserved
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
    }, [id]);

    useEffect(() => {
        const today = new Date();
        const duration = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));
        setBorrowDays(duration > 0 ? duration : 1);
    }, [returnDate]);

    // The handleBorrowRequest function is preserved
    const handleBorrowRequest = async () => {
        setError('');
        setSuccess('');
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to borrow an item.');
            return;
        }
        try {
            const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
            const body = {
                productId: product._id,
                orderType: 'borrow',
                tentativeReturnDate: returnDate,
            };
            const res = await axios.post('http://localhost:5001/api/orders', body, config);
            setSuccess('Borrow request successful! You will be contacted by the seller.');
            console.log(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        }
    };

    // Loading and error states are preserved
    if (loading) return <p>Loading...</p>;
    if (error && !success) return <p style={{ color: 'red' }}>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        // --- THIS IS THE MAIN CHANGE ---
        // 1. The main container is now a `motion.div` for the page-load animation.
        <motion.div 
            className="details-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* ALL PRE-EXISTING FEATURES ARE PRESERVED BELOW */}
            <div className="details-image-section">
                {/* Fallback for the image source is added for robustness */}
                <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/600x400"} 
                    alt={product.name} 
                    className="main-product-image"
                />
            </div>

            <div className="details-info-section">
                <h1 className="product-title">{product.name}</h1>
                
                {/* --- SYNTAX CORRECTION --- 
                    The seller info block was missing curly braces `{}` to render it as JavaScript.
                    This is now fixed. */}
                {product.seller && (
                    <div className="seller-info">
                        <span>Sold by: {product.seller.name}</span>
                        {product.seller.averageRating > 0 && (
                            <span className="seller-rating">
                                ⭐ {product.seller.averageRating.toFixed(1)}
                            </span>
                        )}
                    </div>
                )}
                
                <p className="product-category-detail">{product.category}</p>
                <div className="product-price-detail">
                    {product.listingType === 'sell' ? `₹${product.price}` : `₹${product.pricePerDay} per day`}
                </div>
                
                {product.listingType === 'borrow' && (
                    <div className="borrow-section">
                        <h3 className="section-title">Borrow Details</h3>
                        <div className="date-picker-container">
                            <label>Select a return date:</label>
                            <DatePicker selected={returnDate} onChange={(date) => setReturnDate(date)} minDate={new Date()} />
                        </div>
                        <div className="cost-calculation">
                            <h4>Total Cost: ₹{borrowDays * product.pricePerDay}</h4>
                            <span>({borrowDays} day{borrowDays > 1 ? 's' : ''} x ₹{product.pricePerDay}/day)</span>
                        </div>
                    </div>
                )}
                
                <h3 className="section-title">Description</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="action-buttons">
                    {product.listingType === 'sell' ? (
                        // --- ANIMATION CHANGE ---
                        // 2. The button is now a `motion.button` with a tap animation.
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary" 
                            onClick={() => {
                                addToCart(product);
                                setSuccess(`${product.name} has been added to your cart!`);
                            }}
                        >
                            Add to Cart
                        </motion.button>
                    ) : (
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary" 
                            onClick={handleBorrowRequest} 
                            disabled={!product.isAvailable}
                        >
                            {product.isAvailable ? 'Request to Borrow' : 'Unavailable'}
                        </motion.button>
                    )}
                    <motion.button whileTap={{ scale: 0.95 }} className="btn btn-secondary">
                        Add to Wishlist
                    </motion.button>
                </div>
                {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </div>
        </motion.div>
    );
};

export default ProductDetailsPage;