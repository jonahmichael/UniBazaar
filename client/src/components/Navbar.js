import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    // --- STATE AND CONTEXT HOOKS ---
    // User context for user data, role, and switching
    const { user, role, switchRole } = useContext(UserContext);
    // Cart context for getting cart items
    const { cartItems } = useContext(CartContext);
    // State for managing the search input field
    const [searchQuery, setSearchQuery] = useState('');
    // Hook for programmatic navigation
    const navigate = useNavigate();

    // --- CALCULATED VALUES ---
    // Calculate total items in cart for the badge
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    // --- EVENT HANDLERS ---
    // Handler for submitting the search form
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevents the browser from doing a full page reload
        if (searchQuery.trim()) { // Only search if the query isn't empty
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(''); // Optional: clear the search bar after searching
        }
    };

    // Handler for logging the user out
    const handleLogout = () => {
        localStorage.removeItem('token');
        // A more robust solution would be to also clear the user state in context
        // and let a useEffect handle the redirect. For now, this is fine.
        window.location.href = '/login'; 
    };

    // --- RENDER METHOD ---
    return (
        <header className="navbar-header">
            <div className="navbar-container">
                {/* === LEFT SECTION: LOGO === */}
                <div className="navbar-left">
                    <a href="/" className="navbar-logo">UniBazaar</a>
                </div>
                
                {/* === CENTER SECTION: SEARCH BAR === */}
                <form className="navbar-center" onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search for stationery, equipment, suits..." 
                        className="search-bar"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* === RIGHT SECTION: ACTIONS & USER INFO === */}
                <div className="navbar-right">
                    <a href="/orders" className="nav-link">Returns & Orders</a>
                    
                    <div className="nav-account">
                        {user ? (
                            <>
                                <span>Hello, {user.name}</span>
                                <a href="#!" onClick={handleLogout} className="nav-link-small">Logout</a>
                            </>
                        ) : (
                            <a href="/login" className="nav-link">Login</a>
                        )}
                    </div>
                    
                    <a href="/cart" className="nav-link nav-cart">
                        Cart
                        {totalItemsInCart > 0 && <span className="cart-badge">{totalItemsInCart}</span>}
                    </a>

                    {user && (
                         <div className="role-switch-container">
                            <span className={role === 'buyer' ? 'active' : ''}>Buyer</span>
                            <label className="switch">
                                <input type="checkbox" checked={role === 'seller'} onChange={switchRole} />
                                <span className="slider round"></span>
                            </label>
                            <span className={role === 'seller' ? 'active' : ''}>Seller</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;