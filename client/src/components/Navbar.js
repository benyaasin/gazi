import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Gazi Teknik
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Anasayfa</Link>
          <Link to="/about" className="nav-link">Hakkımızda</Link>
          <Link to="/contact" className="nav-link">İletişim</Link>
          <Link to="/login" className="nav-link">Admin Girişi</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 