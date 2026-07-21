import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content" data-aos="fade-up">
          <div className="footer__logo">
            ELITE<span>FIT</span>
          </div>
          <p className="footer__description">
            Take your fitness to the next level with our world-class trainers and state-of-the-art facilities.
          </p>
          <div className="footer__socials">
            <a href="#"><i className="ri-facebook-fill"></i></a>
            <a href="#"><i className="ri-instagram-line"></i></a>
            <a href="#"><i className="ri-twitter-fill"></i></a>
            <a href="#"><i className="ri-youtube-fill"></i></a>
          </div>
        </div>

        <div className="footer__content" data-aos="fade-up" data-aos-delay="100">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
            <li><Link to="/bmi">BMI</Link></li>
          </ul>
        </div>

        <div className="footer__content" data-aos="fade-up" data-aos-delay="200">
          <h4>Contact Us</h4>
          <ul className="footer__contact">
            <li><i className="ri-map-pin-line"></i> 123 Elite St, Fitness City</li>
            <li><i className="ri-mail-line"></i> support@elitefit.com</li>
            <li><i className="ri-phone-line"></i> +91 98765 43210</li>
          </ul>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>&copy; 2026 ELITEFIT. Powering Your Progress.</p>
      </div>
    </footer>
  );
};

export default Footer;