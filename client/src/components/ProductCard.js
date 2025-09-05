import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        // Wrap the entire card in a Link component
        <Link to={`/product/${product._id}`} className="product-card-link">
            <div className="product-card">
                <div className="product-image-container">
                            <img 
            src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/300x200"} 
            alt={product.name} 
            className="product-image" 
        />
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <div className="product-price">
                        {product.listingType === 'sell' ? `₹${product.price}` : `₹${product.pricePerDay}/day`}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;