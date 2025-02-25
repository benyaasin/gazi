import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Hakkımızda</h1>
        <div className="about-text">
          <p>
            Gazi Teknik olarak, 20 yılı aşkın tecrübemizle ısıtma ve soğutma sistemleri alanında
            İstanbul'un önde gelen teknik servis firmalarından biri olarak hizmet vermekteyiz.
          </p>
          <p>
            Kombi bakım ve onarım, klima montaj ve servis, merkezi sistem bakım hizmetleri başta olmak üzere,
            tüm ısıtma ve soğutma sistemleriniz için profesyonel çözümler sunuyoruz.
          </p>
          <p>
            Deneyimli teknik ekibimiz ve kaliteli hizmet anlayışımızla müşteri memnuniyetini
            her zaman ön planda tutuyoruz.
          </p>
        </div>
        
        <div className="map-container">
          <h2>Konum</h2>
          <iframe
            title="Gazi Teknik"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.654290027665!2d28.901439999999997!3d40.990037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb7a8ac8de99%3A0x7e7c8200af11c37f!2zR8O2a2FscCwgMzkvMy4gU2suIDEzL0EsIDM0MDIwIFpleXRpbmJ1cm51L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1708866500000!5m2!1str!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="contact-info">
          <h2>İletişim Bilgileri</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>Adres</h3>
              <p>Gökalp Mahallesi</p>
              <p>39/3. Sokak No: 13/A</p>
              <p>34020 Zeytinburnu/İstanbul</p>
            </div>
            <div className="info-item">
              <h3>Telefon</h3>
              <p>+90 (212) XXX XX XX</p>
              <p>7/24 Teknik Destek</p>
            </div>
            <div className="info-item">
              <h3>Hizmetlerimiz</h3>
              <p>Kombi Satış ve Servis</p>
              <p>Klima Satış ve Montaj</p>
              <p>Isıtma-Soğutma Sistemleri</p>
              <p>7/24 Teknik Destek</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 