import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // <-- Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // <-- Import its CSS
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // State for borrowing
    const [returnDate, setReturnDate] = useState(new Date());
    const [borrowDays, setBorrowDays] = useState(1);
    
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

    // Effect to calculate borrow days whenever the return date changes
    useEffect(() => {
        const today = new Date();
        const duration = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));
        setBorrowDays(duration > 0 ? duration : 1);
    }, [returnDate]);

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


    if (loading) return <p>Loading...</p>;
    if (error && !success) return <p style={{ color: 'red' }}>{error}</p>;
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
                        <button className="btn btn-primary">Add to Cart</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleBorrowRequest} disabled={!product.isAvailable}>
                            {product.isAvailable ? 'Request to Borrow' : 'Unavailable'}
                        </button>
                    )}
                </div>
                {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </div>
        </div>
    );
};

export default ProductDetailsPage;