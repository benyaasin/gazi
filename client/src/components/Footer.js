import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <h3>Şirketimiz Hakkında</h3>
          <p>Gazi Teknik olarak ısıtma ve soğutma sistemleri konusunda profesyonel çözümler sunuyoruz.</p>
        </div>
        <div className="developer-info">
          <h3>İletişim</h3>
          <p>7/24 Teknik Destek Hattı</p>
          <p>© 2024 Gazi Teknik - Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 