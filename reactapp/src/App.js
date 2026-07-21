import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Header from './Header';
import Hero from './Hero';
import Pricing from './Pricing';
import TrialModal from './TrialModal';
import Dashboard from './Dashboard';
import Nutrition from './Nutrition';
import BmiCalculator from './BmiCalculator';
import MealDetail from './MealDetail';
import Gallery from './Gallery';
import Footer from './Footer'; 
import Auth from './Auth'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('elitefit_token') === 'true';
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Login Handle Function
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('elitefit_token', 'true');
  };

  // NAYA: Logout Handle Function
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('elitefit_token');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
  };

  return (
    <Router>
      <div className="app-container">
        {/* NAYA: Header ko onLogout function pass kiya */}
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <TrialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={
            <>
              <Hero onStartTrial={() => setIsModalOpen(true)} />
              <Pricing onGetStarted={() => setIsModalOpen(true)} />
              <Gallery /> 
            </>
          } />

          {/* Login/Signup Page Route */}
          <Route path="/login" element={
            !isAuthenticated ? (
              <Auth onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Navigate to="/dashboard" />
            )
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } />
          
          <Route path="/nutrition" element={
            isAuthenticated ? <Nutrition /> : <Navigate to="/login" />
          } />
          
          <Route path="/bmi" element={
            isAuthenticated ? <BmiCalculator /> : <Navigate to="/login" />
          } />
          
          <Route path="/nutrition/:mealId" element={
            isAuthenticated ? <MealDetail /> : <Navigate to="/login" />
          } />
        </Routes>
        
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;