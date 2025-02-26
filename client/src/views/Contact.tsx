import React, { useState } from 'react';
import './Contact.css';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="contact-container">
      <section className="contact-info">
        <h2>İletişim Bilgileri</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Adres</h3>
            <p>İstanbul, Türkiye</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Telefon</h3>
            <p>
              <a href="tel:+902122222222">(0212) XXX XX XX</a>
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>E-posta</h3>
            <p>
              <a href="mailto:info@gaziteknik.com">info@gaziteknik.com</a>
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Çalışma Saatleri</h3>
            <p>7/24 Hizmet</p>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <h2>İletişim Formu</h2>
        {isSubmitted ? (
          <div className="success-message">
            <h3>Teşekkürler!</h3>
            <p>Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Ad Soyad</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Konu</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Seçiniz</option>
                <option value="bakim">Kombi Bakımı</option>
                <option value="ariza">Kombi Arızası</option>
                <option value="montaj">Kombi Montaj</option>
                <option value="diger">Diğer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Mesajınız</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Gönder
            </button>
          </form>
        )}
      </section>

      <section className="map-section">
        <h2>Konum</h2>
        <div className="map-container">
          {/* Google Maps iframe buraya eklenecek */}
          <div className="map-placeholder">
            Harita burada görüntülenecek
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 