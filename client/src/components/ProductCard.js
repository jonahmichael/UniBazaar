import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Framer Motion is already correctly imported
import './ProductCard.css';

// The animation variants are correctly defined here.
const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut" // Adds a nice easing effect
        }
    }
};

const ProductCard = ({ product }) => {
    return (
        // --- THIS IS THE MAIN CHANGE ---
        // 1. The outermost element is now the `motion.div` to control the animation.
        // 2. We apply the `cardVariants` to it. The parent component (`HomePage.js`) will
        //    trigger the animation from "hidden" to "visible".
        <motion.div variants={cardVariants} className="motion-wrapper">
            
            {/* The Link component is now inside the motion.div. */}
            {/* ALL PRE-EXISTING FEATURES ARE PRESERVED BELOW THIS LINE */}
            <Link to={`/product/${product._id}`} className="product-card-link">
                
                {/* The visual card itself remains unchanged. */}
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
        </motion.div>
    );
};

export default ProductCard;