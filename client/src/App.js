import React, { useContext } from 'react'; // <-- Import useContext
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 

// Import the UserContext to check the current role
import { UserContext } from './context/UserContext'; 

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerDashboard from './pages/SellerDashboard'; // <-- Import the new page

function App() {
  const { user, role } = useContext(UserContext); // <-- Get the user and role

  return (
    <Router>
      <Navbar />
      
      <main>
        <Routes>
          {/* If the user is a seller, the homepage route leads to the dashboard */}
          <Route path="/" element={user && role === 'seller' ? <SellerDashboard /> : <HomePage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Add a direct route to the dashboard for sellers */}
          <Route path="/dashboard" element={user && role === 'seller' ? <SellerDashboard /> : <HomePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;