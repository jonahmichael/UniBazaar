import React from 'react';
import './ProductCard.css'; // We will create this file next

// This component takes a single `product` object as a prop
const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                {/* We'll use a placeholder for now. In a future sprint, this will be product.images[0] */}
                <img src="https://via.placeholder.com/300x200" alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-price">
                    {product.listingType === 'sell' ? `₹${product.price}` : `₹${product.pricePerDay}/day`}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;