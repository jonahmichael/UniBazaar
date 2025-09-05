import React, { useState } from 'react';
// We will create these two components next
import MyOrders from '../components/MyOrders';
import MyListings from '../components/MyListings';
import './DashboardPage.css';

const DashboardPage = () => {
    // This state will control which tab is active
    const [activeTab, setActiveTab] = useState('orders');

    return (
        <div className="dashboard-container">
            <h1>My Account</h1>
            <div className="dashboard-tabs">
                <button 
                    className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    My Orders
                </button>
                <button 
                    className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('listings')}
                >
                    My Listings
                </button>
            </div>
            <div className="dashboard-content">
                {activeTab === 'orders' ? <MyOrders /> : <MyListings />}
            </div>
        </div>
    );
};

export default DashboardPage;