import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import Global Context
import { UserContext } from './context/UserContext';

// Import Components
import Navbar from './components/Navbar'; // You will create this component

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // You will create this page
import SellerDashboard from './pages/SellerDashboard'; // You will create this page
import ProductDetailsPage from './pages/ProductDetailsPage'; // You will create this page

// We can remove the default logo and App.css as we'll style components individually
// import './App.css';

function App() {
  // Access the user from your global context
  // This will let you protect routes and customize the UI
  const { user, role } = useContext(UserContext);

  return (
    <Router>
      {/* The Navbar will be displayed on every page */}
      <Navbar />

      {/* The main content of the page will change based on the route */}
      <main className="main-container">
        <Routes>
          {/* Public Routes: Accessible to everyone */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          
          {/* 
            Protected Seller Route:
            - This route is for the seller's dashboard.
            - We check if a 'user' is logged in. 
            - If they are, we show them the SellerDashboard.
            - If not, we use the <Navigate> component from react-router-dom to redirect them to the login page.
          */}
          <Route 
            path="/dashboard" 
            element={user ? <SellerDashboard /> : <Navigate to="/login" />} 
          />

          {/* Fallback Route for any other path */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;