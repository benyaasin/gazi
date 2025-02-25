import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    issueType: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Merhaba, teknik servis hizmeti almak istiyorum.');
    window.open(`https://wa.me/+905XXXXXXXXX?text=${message}`, '_blank');
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Kombi Bakım ve Teknik Servis Hizmetleri</h1>
        <p>Hızlı, Güvenilir ve Uygun Fiyatlı Teknik Destek</p>
        <div className="hero-buttons">
          <button onClick={handleWhatsApp} className="cta-button whatsapp">
            <i className="fab fa-whatsapp"></i> Hemen Servis Çağır
          </button>
          <a href="#contact-form" className="cta-button contact">
            Ücretsiz Danışmanlık Al
          </a>
        </div>
      </div>

      <div className="services-section">
        <h2>Hizmetlerimiz</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Kombi Bakımı</h3>
            <p>Periyodik bakım ve onarım hizmetleri</p>
          </div>
          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3>Arıza Tespit</h3>
            <p>Profesyonel arıza tespit ve çözüm</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔨</div>
            <h3>Parça Değişimi</h3>
            <p>Orijinal yedek parça garantisi</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📱</div>
            <h3>7/24 Destek</h3>
            <p>Kesintisiz teknik servis hizmeti</p>
          </div>
        </div>
      </div>

      <div className="contact-section" id="contact-form">
        <div className="quick-contact">
          <h2>Hızlı İletişim</h2>
          <div className="contact-info">
            <a href="tel:+902122222222" className="phone-button">
              <i className="fas fa-phone"></i> (0212) XXX XX XX
            </a>
            <button onClick={handleWhatsApp} className="whatsapp-button">
              <i className="fab fa-whatsapp"></i> WhatsApp'tan Yaz
            </button>
          </div>
        </div>

        <div className="contact-form">
          <h3>Servis Talebi Oluştur</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Telefon Numaranız"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                required
              >
                <option value="">Arıza Türü Seçin</option>
                <option value="bakim">Kombi Bakımı</option>
                <option value="ariza">Kombi Arızası</option>
                <option value="montaj">Kombi Montaj</option>
                <option value="diger">Diğer</option>
              </select>
            </div>
            <button type="submit" className="submit-button">
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home; 