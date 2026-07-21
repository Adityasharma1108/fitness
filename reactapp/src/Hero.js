import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  // --- RAZORPAY PAYMENT HANDLER ---
  const handlePayment = (planName, amount) => {
    // Agar Free plan hai toh direct dashboard bhej do
    if (amount === 0) {
      alert("Welcome to Starter Pass! Redirecting to Dashboard...");
      navigate('/dashboard');
      return;
    }

    // Checking if Razorpay SDK loaded properly
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_TE5LhivwWGjdXh", // Aapki Razorpay Test Key
      amount: amount * 100, // Amount in paise (e.g. 499 INR = 49900 paise)
      currency: "INR",
      name: "ELITEFIT MEMBERSHIP",
      description: `Payment for ${planName} (${billingCycle.toUpperCase()})`,
      image: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png", // Gym Logo
      handler: function (response) {
        // Payment successful callback
        alert(`🎉 Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
        // Save subscription status locally
        localStorage.setItem('user_plan', planName);
        navigate('/dashboard');
      },
      prefill: {
        name: localStorage.getItem('user_name') || "Athlete",
        email: "athlete@elitefit.com",
        contact: "9999999999",
      },
      theme: {
        color: "#ccff00", // Matching our neon gym theme
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      
      {/* =======================================
          1. HERO BANNER
      ======================================== */}
      <section style={{ 
        position: 'relative', 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 20px',
        background: 'radial-gradient(circle at 50% 30%, #1a2900 0%, #0a0a0a 70%)',
        textAlign: 'center'
      }}>
        {/* Decorative Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '350px',
          height: '350px',
          background: '#ccff00',
          filter: 'blur(160px)',
          opacity: '0.15',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '900px', zIndex: 1 }}>
          <span style={{ 
            background: 'rgba(204, 255, 0, 0.1)', 
            color: '#ccff00', 
            border: '1px solid #ccff00', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '0.85rem', 
            fontWeight: 'bold', 
            letterSpacing: '1.5px', 
            textTransform: 'uppercase' 
          }}>
            ⚡ YOUR ULTIMATE GYM WORKOUT & DIET GUIDE
          </span>

          <h1 style={{ 
            fontSize: '3.8rem', 
            fontWeight: '900', 
            margin: '25px 0 15px 0', 
            lineHeight: '1.1', 
            letterSpacing: '-1px' 
          }}>
            TRANSFORM YOUR BODY WITH <br />
            <span style={{ 
              color: '#ccff00', 
              textShadow: '0 0 25px rgba(204, 255, 0, 0.4)' 
            }}>
              EXPERT WORKOUTS & DIET
            </span>
          </h1>

          <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 35px auto', lineHeight: '1.6' }}>
            Target specific muscle groups with detailed exercise guides and align your goals with custom Veg and Non-Veg diet plans.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '16px 36px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#000',
                background: '#ccff00',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(204, 255, 0, 0.4)',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              EXPLORE WORKOUTS 🏋️‍♂️
            </button>

            <button 
              onClick={() => navigate('/nutrition')}
              style={{
                padding: '16px 36px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#fff',
                background: 'transparent',
                border: '2px solid #333',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#ccff00'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#333'}
            >
              VIEW DIET PLANS 🥗
            </button>
          </div>
        </div>
      </section>

      {/* =======================================
          2. CORE FEATURES
      ======================================== */}
      <section style={{ padding: '80px 4%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: '800', marginBottom: '50px' }}>
          EVERYTHING YOU NEED TO <span style={{ color: '#ccff00' }}>LEVEL UP</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { icon: '💪', title: 'Targeted Exercises', desc: 'Isolate muscle groups like Biceps, Triceps, Chest, and Back with clear form guides.' },
            { icon: '🥗', title: 'Veg & Non-Veg Diets', desc: 'Custom high-protein meal plans mapped specifically for Vegetarian and Non-Vegetarian lifters.' },
            { icon: '📊', title: 'Smart BMI Tracking', desc: 'Calculate your exact body mass index with our interactive visual gauge meter.' }
          ].map((feature, idx) => (
            <div key={idx} style={{
              background: '#111',
              padding: '35px 25px',
              borderRadius: '20px',
              border: '1px solid #222',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#ccff00';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#222';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.5' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =======================================
          3. MEMBERSHIP & PAYMENT SECTION
      ======================================== */}
      <section style={{ padding: '80px 4%', background: '#0d0d0d', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '15px' }}>
            CHOOSE YOUR <span style={{ color: '#ccff00' }}>MEMBERSHIP</span>
          </h2>
          <p style={{ color: '#777', marginBottom: '35px' }}>Get full access to all workout modules and diet guides.</p>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', background: '#181818', padding: '5px', borderRadius: '30px', border: '1px solid #333', marginBottom: '50px' }}>
            <button 
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '10px 24px',
                borderRadius: '25px',
                border: 'none',
                background: billingCycle === 'monthly' ? '#ccff00' : 'transparent',
                color: billingCycle === 'monthly' ? '#000' : '#fff',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '10px 24px',
                borderRadius: '25px',
                border: 'none',
                background: billingCycle === 'yearly' ? '#ccff00' : 'transparent',
                color: billingCycle === 'yearly' ? '#000' : '#fff',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Yearly (Save 20%)
            </button>
          </div>

          {/* Pricing Cards */}
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            
            {/* Free Tier */}
            <div style={{
              background: '#111',
              padding: '40px 30px',
              borderRadius: '20px',
              border: '1px solid #222',
              width: '320px',
              textAlign: 'left'
            }}>
              <h3 style={{ fontSize: '1.4rem', color: '#aaa' }}>Starter Pass</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹0</div>
              <ul style={{ color: '#888', lineHeight: '2', paddingLeft: '20px', marginBottom: '30px' }}>
                <li>Basic Exercise Guides</li>
                <li>Sample Diet View</li>
                <li>Standard BMI Calculator</li>
              </ul>
              <button 
                onClick={() => handlePayment('Starter Pass', 0)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #444',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                GET STARTED
              </button>
            </div>

            {/* Pro Tier (WITH RAZORPAY INTEGRATION) */}
            <div style={{
              background: '#141a00',
              padding: '40px 30px',
              borderRadius: '20px',
              border: '2px solid #ccff00',
              width: '320px',
              textAlign: 'left',
              position: 'relative',
              boxShadow: '0 0 30px rgba(204, 255, 0, 0.15)'
            }}>
              <span style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                background: '#ccff00',
                color: '#000',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: '10px'
              }}>
                MOST POPULAR
              </span>
              <h3 style={{ fontSize: '1.4rem', color: '#ccff00' }}>Elite Member</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>
                {billingCycle === 'monthly' ? '₹499' : '₹4,799'}
                <span style={{ fontSize: '1rem', color: '#888' }}>{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>
              </div>
              <ul style={{ color: '#ccc', lineHeight: '2', paddingLeft: '20px', marginBottom: '30px' }}>
                <li>Full Muscle Exercises Guide</li>
                <li>Veg & Non-Veg Diet Plans</li>
                <li>BMI Gauge & Recommendations</li>
                <li>24/7 Elite Fitness Support</li>
              </ul>
              <button 
                onClick={() => handlePayment('Elite Member', billingCycle === 'monthly' ? 499 : 4799)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#ccff00',
                  color: '#000',
                  fontWeight: '900',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(204,255,0,0.3)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                PAY & UPGRADE NOW 💳
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;