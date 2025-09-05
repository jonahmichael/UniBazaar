import React, { useState, useEffect } from 'react';
import axios from 'axios';
// We'll create a shared CSS file for the dashboard lists
import './DashboardLists.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    // ... loading and error state ...

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            try {
                const res = await axios.get('http://localhost:5001/api/orders/my-orders', config);
                setOrders(res.data);
            } catch (err) { /* ... handle error ... */ }
        };
        fetchOrders();
    }, []);

    if (orders.length === 0) return <p>You have not placed any orders yet.</p>;

    return (
        <div className="list-container">
            {orders.map(order => (
                <div key={order._id} className="list-item">
                    <img src={order.product.images[0] || 'https://via.placeholder.com/150x100'} alt={order.product.name} />
                    <div className="item-details">
                        <h3>{order.product.name}</h3>
                        <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Total: ₹{order.totalAmount}</p>
                        <p>Status: {order.status}</p>
                    </div>
                    {/* In a future sprint, this button would open a rating modal */}
                    <button className="btn btn-secondary">Rate Seller</button>
                </div>
            ))}
        </div>
    );
};
export default MyOrders;