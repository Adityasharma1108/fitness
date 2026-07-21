import React, { useState } from 'react';

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const goal = 8; 

  const addGlass = () => {
    if (glasses < goal) setGlasses(glasses + 1);
  };

  const resetTracker = () => setGlasses(0);

  const progressWidth = (glasses / goal) * 100;

  return (
    <div className="water-tracker" data-aos="fade-up">
      <h3>Daily <span className="highlight">Hydration</span></h3>
      <div className="water__card">
        <div className="water__info">
          <i className="ri-drop-fill blue-icon"></i>
          <span>{glasses} / {goal} Glasses</span>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressWidth}%` }}></div>
        </div>

        <div className="water__btns">
          <button onClick={addGlass} className="btn-small">Add Glass</button>
          <button onClick={resetTracker} className="btn-reset">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;