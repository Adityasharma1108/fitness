import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Double-click crash check toggle state

  // Dynamic Script Loader Function for Razorpay
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (planType, planName) => {
    if (loading) return;
    const token = localStorage.getItem('user_token');

    if (!token) {
      alert("Premium plans kharidne ke liye pehle login karein!");
      navigate('/login');
      return;
    }

    // 1. Force Load Razorpay Script Dynamically
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK load nahi ho paya. Apna internet connection check karein!");
      return;
    }

    try {
      setLoading(true);

      // 2. Backend se Razorpay Order ID generate karwana
      // Custom Authorization pattern standardization applied
      const response = await axios.post(
        'http://localhost:5000/api/subscription/upgrade',
        { planType: planType },
        { 
          headers: { 
            'x-auth-token': token,
            'Authorization': `Bearer ${token}` 
          } 
        }
      );

      const { order, key_id, isMock } = response.data;

      // =======================================================
      // 🚀 FRONTEND BYPASS SIMULATOR LOGIC (Working Smoothly)
      // =======================================================
      if (isMock) {
        const confirmPayment = window.confirm(
          `🏋️‍♂️ EliteFit Payment Simulator 🏋️‍♂️\n\nPlan: ${planName}\nAmount: ₹${order.amount / 100}\n\nKya aap mock payment success simulate karna chahte hain?`
        );

        if (confirmPayment) {
          await axios.post(
            'http://localhost:5000/api/subscription/verify',
            {
              razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 9)}`,
              planType: planType
            },
            { 
              headers: { 
                'x-auth-token': token,
                'Authorization': `Bearer ${token}` 
              } 
            }
          );

          alert("🎉 Mock Payment Successful! Your Elite status is active.");
          navigate('/dashboard');
        } else {
          alert("❌ Payment simulator canceled.");
        }
        setLoading(false);
        return; 
      }
      // =======================================================

      // 3. Razorpay standard window configurations setup
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "EliteFit Premium",
        description: `Upgrade to ${planName}`,
        order_id: order.id,
        handler: async function (paymentResponse) {
          try {
            await axios.post(
              'http://localhost:5000/api/subscription/verify',
              {
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                planType: planType
              },
              { 
                headers: { 
                  'x-auth-token': token,
                  'Authorization': `Bearer ${token}`
                } 
              }
            );

            alert("🎉 Payment Successful! Your Elite status is active.");
            navigate('/dashboard'); 
          } catch (err) {
            console.error(err);
            alert("Verification layer error. Contact support.");
          }
        },
        prefill: {
          name: localStorage.getItem('user_name') || "Athlete",
          email: "athlete@elitefit.com"
        },
        theme: {
          color: "#ccff00" 
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Order initialization failed:", error);
      alert(error.response?.data?.message || "Payment gateway trigger errors or session expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section pricing-section" id="pricing" style={{ background: '#0a0a0a', color: '#fff', padding: '100px 4%' }}>
      <div className="container">
        <h2 className="section__title center" style={{ textAlign: 'center', fontSize: '2.5rem' }}>CHOOSE YOUR <span className="highlight" style={{ color: '#ccff00' }}>PLAN</span></h2>
        
        <div className="pricing-grid" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '50px' }}>
          
          {/* Plan: Free */}
          <div className="pricing-card stat-card" style={{ background: '#111', padding: '30px', textAlign: 'center', width: '300px', borderRadius: '12px', border: '1px solid #222' }}>
            <h3>Free Plan</h3>
            <h2 style={{ fontSize: '2.5rem', color: '#ccff00', margin: '20px 0' }}>₹0<span style={{ fontSize: '1rem', color: '#aaa' }}>/mo</span></h2>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>Basic fitness tips and 1 free strength training video.</p>
            <button className="btn-primary" style={{ width: '100%', background: 'transparent', border: '1px solid #ccff00', color: '#ccff00', padding: '12px', borderRadius: '6px', cursor: 'default' }} disabled>
              CURRENT PLAN
            </button>
          </div>

          {/* Plan: Elite Starter (₹149) */}
          <div className="pricing-card stat-card" style={{ background: '#111', padding: '30px', textAlign: 'center', width: '300px', borderRadius: '12px', border: '2px solid #ccff00', transform: 'scale(1.05)' }}>
            <div style={{ background: '#ccff00', color: '#000', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', marginBottom: '15px', display: 'inline-block' }}>BEST VALUE</div>
            <h3>Elite Starter</h3>
            <h2 style={{ fontSize: '2.5rem', color: '#ccff00', margin: '20px 0' }}>₹149<span style={{ fontSize: '1rem', color: '#aaa' }}>/mo</span></h2>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>Unlock full body premium workout videos and guides.</p>
            <button 
              className="btn-primary" 
              style={{ width: '100%', background: loading ? '#555' : '#ccff00', color: '#000', fontWeight: 'bold', padding: '12px', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
              onClick={() => handleUpgrade('basic_149', 'Elite Starter')}
              disabled={loading}
            >
              {loading ? "PROCESSING..." : "UPGRADE NOW"}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;