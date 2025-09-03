import React, { useContext } from 'react';
import './Navbar.css'; // We will create this CSS file next
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    // We will use these later to show/hide elements and make the toggle work
    const { user, role, switchRole } = useContext(UserContext);

    // Placeholder function for logging out
    const handleLogout = () => {
        localStorage.removeItem('token');
        // In a real app, you would also clear the user state
        window.location.href = '/login'; // Simple redirect for now
    };

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                <div className="navbar-left">
                    <a href="/" className="navbar-logo">UniBazaar</a>
                </div>
                
                <div className="navbar-center">
                    <input type="text" placeholder="Search for stationery, equipment, etc..." className="search-bar" />
                </div>

                <div className="navbar-right">
                    <a href="/orders" className="nav-link">Returns & Orders</a>
                    
                    {/* This is a placeholder. In a future sprint, this would be a dropdown menu. */}
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
                    
                    <a href="/cart" className="nav-link">Cart</a>

                    {/* The Buyer/Seller toggle switch, only shown if logged in */}
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