import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css'; // We will create this file next

const CartPage = () => {
    // Get the cart items and the remove function from our context
    const { cartItems, removeFromCart } = useContext(CartContext);

    // Calculate the total price of all items in the cart
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty.</p>
                    <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item">
                                <img src="https://via.placeholder.com/150x100" alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-category">{item.category}</p>
                                    <p className="cart-item-price">₹{item.price}</p>
                                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                </div>
                                <button onClick={() => removeFromCart(item._id)} className="remove-item-btn">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2 className="summary-title">Order Summary</h2>
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-line">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;