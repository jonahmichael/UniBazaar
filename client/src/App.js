import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 

// Import the new Navbar component
import Navbar from './components/Navbar';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      {/* Replace the old nav with our new Navbar component */}
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* We will add the SellerDashboard route soon */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;