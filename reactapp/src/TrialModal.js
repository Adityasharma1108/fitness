import React, { useState } from 'react';

const TrialModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plan: '', name: '', contact: '', payment: 'Cash'
  });

  if (!isOpen) return null;

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" data-aos="zoom-in">
        <button className="close-btn" onClick={resetAndClose}>&times;</button>

        {step === 1 && (
          <div className="modal-step">
            <h2>Select Your <span className="highlight">Trial Plan</span></h2>
            <div className="modal-grid">
              {['Basic', 'Elite', 'Pro'].map((p) => (
                <div key={p} className="plan-box" onClick={() => { setFormData({...formData, plan: p}); setStep(2); }}>
                  <h3>{p}</h3>
                  <p>Free 3-Day Trial</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form className="modal-step" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <h2>User <span className="highlight">Details</span></h2>
            <p>Plan: <b className="highlight">{formData.plan}</b></p>
            <input type="text" placeholder="Name" required onChange={(e)=>setFormData({...formData, name: e.target.value})} />
            <input type="tel" placeholder="Contact Number" required onChange={(e)=>setFormData({...formData, contact: e.target.value})} />
            <select onChange={(e)=>setFormData({...formData, payment: e.target.value})}>
              <option value="Cash">Mode: Cash at Gym</option>
              <option value="Online">Mode: Online / UPI</option>
            </select>
            <button type="submit" className="btn-primary">View Gym Timings</button>
          </form>
        )}

        {step === 3 && (
          <div className="modal-step text-center">
            <h2 className="highlight">Welcome to the Club!</h2>
            <p>Registration complete for {formData.name}.</p>
            <div className="schedule-card">
              <h4>Available Free Slots:</h4>
              <p>🟢 06:00 AM - 11:00 AM (Free Access)</p>
              <p>🟢 01:00 PM - 04:00 PM (Free Access)</p>
              <p>🔴 05:00 PM - 09:00 PM (Busy/Members Only)</p>
            </div>
            <button className="btn-primary" onClick={resetAndClose}>Perfect, See You There!</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrialModal;