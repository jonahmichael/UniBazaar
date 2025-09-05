import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 

import { UserContext } from './context/UserContext'; 

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerDashboard from './pages/SellerDashboard';
import ProductDetailsPage from './pages/ProductDetailsPage'; 
import CartPage from './pages/CartPage'; // <-- 1. Import the new page
import SearchResultsPage from './pages/SearchResultsPage';
import DashboardPage from './pages/DashboardPage'; // <-- 1. Import the new page


function App() {
  const { user, role } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={user && role === 'seller' ? <SellerDashboard /> : <HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={user && role === 'seller' ? <SellerDashboard /> : <HomePage />} />
          
          {/* This is the new dynamic route for product details */}
          <Route path="/product/:id" element={<ProductDetailsPage />} /> {/* <-- ADD THIS LINE */}

          <Route path="/product/:id" element={<ProductDetailsPage />} />
  
          <Route path="/cart" element={<CartPage />} /> {/* <-- 2. ADD THIS NEW ROUTE */}
        
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/search" element={<SearchResultsPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        
        </Routes>
      </main>
    </Router>
  );
}

export default App;