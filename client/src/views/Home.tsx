import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Gazi Teknik Kombi Servisi</h1>
          <p className="hero-subtitle">
            Profesyonel kombi bakım ve onarım hizmetleri
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Hemen Başvur</a>
            <a href="tel:+902122222222" className="btn btn-outline">Bizi Arayın</a>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Hizmetler */}
      <section className="featured-services">
        <h2>Hizmetlerimiz</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Kombi Bakımı</h3>
            <p>Yıllık periyodik bakım ile kombilerinizin ömrünü uzatın</p>
          </div>
          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3>Arıza Tespiti</h3>
            <p>Profesyonel ekipmanlarla hızlı ve doğru arıza tespiti</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🛠️</div>
            <h3>Onarım</h3>
            <p>Orijinal parça garantili kombi onarım hizmeti</p>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="why-us">
        <h2>Neden Bizi Seçmelisiniz?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>15+ Yıl Deneyim</h3>
            <p>Sektörde uzun yıllara dayanan tecrübe</p>
          </div>
          <div className="feature">
            <h3>7/24 Hizmet</h3>
            <p>Acil durumlar için kesintisiz teknik destek</p>
          </div>
          <div className="feature">
            <h3>Garantili Hizmet</h3>
            <p>Tüm bakım ve onarım işlemlerinde garanti</p>
          </div>
          <div className="feature">
            <h3>Uygun Fiyat</h3>
            <p>Rekabetçi fiyatlar ve şeffaf fiyatlandırma</p>
          </div>
        </div>
      </section>

      {/* Hızlı İletişim */}
      <section className="quick-contact" id="contact">
        <h2>Hızlı İletişim</h2>
        <div className="contact-options">
          <a href="tel:+902122222222" className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Bizi Arayın</h3>
            <p>(0212) XXX XX XX</p>
          </a>
          <a href="https://wa.me/902122222222" className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>Hemen Mesaj Gönderin</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home; 