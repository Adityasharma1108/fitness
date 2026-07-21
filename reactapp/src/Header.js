import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Logout hote hi landing page par bhej do
  };

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 4%', background: '#000', borderBottom: '1px solid #222' }}>
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#fff' }}>
        ELITE<span style={{ color: '#ccff00' }}>FIT</span>
      </div>

      <ul className="nav__list" style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0 }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
        <li><Link to="/nutrition" style={{ color: '#fff', textDecoration: 'none' }}>Nutrition</Link></li>
        <li><Link to="/bmi" style={{ color: '#fff', textDecoration: 'none' }}>BMI</Link></li>
      </ul>

      <div className="nav__right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {isAuthenticated ? (
          // AGAR USER LOGGED IN HAI: Profile Avatar aur Logout Button dikhao
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="profile__wrapper" style={{ position: 'relative', width: '40px', height: '40px' }}>
              <img 
                src="https://img.icons8.com/bubbles/100/user-male-circle.png" 
                alt="User Profile" 
                className="user__avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
              <div className="online__status" style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: '#00ff00', borderRadius: '50%', border: '2px solid #000' }}></div>
            </div>
            <button 
              onClick={handleLogoutClick}
              style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
              onMouseOver={(e) => e.target.style.background = '#ff4d4d11'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          // AGAR USER LOGGED IN NHI HAI: Login Button dikhao
          <Link 
            to="/login" 
            style={{ background: '#ccff00', color: '#000', padding: '8px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            LOGIN
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;