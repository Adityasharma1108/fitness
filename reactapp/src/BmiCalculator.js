import React, { useState } from 'react';

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus({ 
        category: 'Underweight', 
        color: '#3b82f6', 
        advice: 'Focus on Lean Bulking! Increase daily calories with high protein & heavy compound lifts.' 
      });
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus({ 
        category: 'Normal Weight', 
        color: '#ccff00', 
        advice: 'Optimal Fitness Level! Maintain progressive overload in workouts & balanced nutrition.' 
      });
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus({ 
        category: 'Overweight', 
        color: '#eab308', 
        advice: 'Caloric Deficit Needed! Mix weight training with 20 mins HIIT cardio & high protein.' 
      });
    } else {
      setStatus({ 
        category: 'Obese', 
        color: '#ef4444', 
        advice: 'Action Required! Focus on daily cardio, strict diet tracking, and consistent gym schedule.' 
      });
    }
  };

  return (
    <section style={{ minHeight: '100vh', background: '#050505', color: '#ffffff', padding: '120px 4% 60px 4%', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ background: 'rgba(204, 255, 0, 0.15)', color: '#ccff00', border: '1px solid #ccff00', padding: '6px 18px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
            📊 BODY METRICS ANALYZER
          </span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '900', margin: '15px 0', letterSpacing: '-0.5px' }}>
            INTERACTIVE <span style={{ color: '#ccff00' }}>BMI CALCULATOR</span>
          </h1>
          <p style={{ color: '#cccccc', fontSize: '1.05rem' }}>
            Check your Body Mass Index and get tailored fitness recommendations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* Form Card */}
          <div style={{ background: '#111111', border: '1px solid #2a2a2a', borderRadius: '20px', padding: '30px' }}>
            <form onSubmit={calculateBMI}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#dddddd', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  WEIGHT (in kg)
                </label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder="e.g. 70" 
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    background: '#1c1c1c',
                    border: '1px solid #333333',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', color: '#dddddd', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  HEIGHT (in cm)
                </label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  placeholder="e.g. 175" 
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    background: '#1c1c1c',
                    border: '1px solid #333333',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ccff00',
                  color: '#000000',
                  fontWeight: '900',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}
              >
                CALCULATE BMI 🚀
              </button>
            </form>
          </div>

          {/* Result Display Card */}
          <div style={{
            background: '#111111',
            border: `2px solid ${status ? status.color : '#2a2a2a'}`,
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'center',
            alignItems: 'center',
            transition: 'all 0.4s ease'
          }}>
            {!bmi ? (
              <div style={{ color: '#666666' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚖️</div>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>Enter your details to generate your body index score.</p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.85rem', color: '#aaaaaa', fontWeight: 'bold', letterSpacing: '1px' }}>YOUR BMI SCORE</div>
                <div style={{ fontSize: '4rem', fontWeight: '900', color: status.color, margin: '10px 0' }}>
                  {bmi}
                </div>
                <div style={{ background: status.color, color: status.category === 'Normal Weight' ? '#000' : '#fff', padding: '6px 18px', borderRadius: '20px', fontWeight: '800', fontSize: '0.9rem', display: 'inline-block', marginBottom: '20px', textTransform: 'uppercase' }}>
                  {status.category}
                </div>
                <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '12px', border: '1px solid #333333', textAlign: 'left' }}>
                  <strong style={{ color: status.color, display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>RECOMMENDED ACTION:</strong>
                  <p style={{ margin: 0, color: '#dddddd', fontSize: '0.9rem', lineHeight: '1.5' }}>{status.advice}</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default BmiCalculator;