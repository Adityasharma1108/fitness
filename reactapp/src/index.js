import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 🚀 EXCLUSIVE DEVELOPER EASTER EGG
console.log(
  "%c💪 ELITEFIT IS RUNNING! \n%cPowered by React & Node.js | Ready for the heavy lifting.",
  "font-size: 22px; font-weight: 900; color: #ccff00; background: #111; padding: 15px; border-radius: 8px; border: 2px solid #ccff00;",
  "font-size: 14px; color: #aaa; font-weight: bold; margin-top: 5px;"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);