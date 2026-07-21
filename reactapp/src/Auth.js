import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Purani errors clear karein

    const BASE_URL = 'http://localhost:5000';

    try {
      if (isLogin) {
        // 1. Localhost Login API Request
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });

        // Safe Response Handling Matrix
        if (response.data && response.data.token) {
          localStorage.setItem('elitefit_token', 'true'); // App.js trigger ke liye
          localStorage.setItem('user_token', response.data.token);
          
          // Safety check: Fallback validation values applied
          const userName = response.data.user?.name || response.data.name || 'Athlete';
          localStorage.setItem('user_name', userName);
          
          onAuthSuccess(); // Success hone par direct navigate/callback trigger
        } else {
          setErrorMessage('Server authentication tokens are missing. Please recheck schema.');
        }
      } else {
        // 2. Localhost Signup API Request
        const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        alert(response.data.message || 'Registration Successful! Ab login kijiye.');
        setIsLogin(true); // Direct switcher to login window
      }
    } catch (err) {
      // Internal system console debugging helper hook
      console.error('🔥 Auth request transaction error trace:', err.response?.data || err.message);
      
      // Screen notifications validation interface
      setErrorMessage(
        err.response?.data?.message || 
        err.response?.data || 
        'Something went wrong! Please check VS Code backend terminal terminal for 500 error logs.'
      );
    }
  };

  return (
    <section className="page-section" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a' }}>
      <div className="auth-container stat-card" style={{ maxWidth: '400px', width: '100%', padding: '40px', borderRadius: '15px', border: '1px solid #333', background: '#111' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', margin: '0' }}>
            {isLogin ? 'WELCOME ' : 'JOIN '} 
            <span className="highlight" style={{ color: '#ccff00' }}>ELITEFIT</span>
          </h2>
          <p style={{ color: '#aaa', marginTop: '10px' }}>
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start your fitness journey today.'}
          </p>
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <div style={{ background: '#ff4d4d22', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '15px', fontSize: '0.9rem', wordBreak: 'break-word' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {!isLogin && (
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
              style={inputStyle}
            />
          )}

          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '10px', background: '#ccff00', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            {isLogin ? 'SECURE LOGIN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', color: '#aaa' }}>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMessage('');
              }} 
              style={{ color: '#ccff00', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isLogin ? 'Sign up here' : 'Login here'}
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%', 
  padding: '15px', 
  background: '#1d1d1d', 
  color: '#fff', 
  border: '1px solid #333', 
  borderRadius: '8px',
  outline: 'none',
  fontSize: '1rem'
};

export default Auth;