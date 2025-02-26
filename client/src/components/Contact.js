import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada geri bildirimi backend'e gönderme işlemi yapılabilir
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>İletişim</h1>
        
        <div className="contact-info">
          <div className="contact-section">
            <h2>Adres</h2>
            <p>Gökalp Mahallesi</p>
            <p>39/3. Sokak No: 13/A</p>
            <p>34020 Zeytinburnu/İSTANBUL</p>
          </div>

          <div className="contact-section">
            <h2>İletişim Bilgileri</h2>
            <p>Telefon: (0212) XXX XX XX</p>
            <p>WhatsApp: 0212 XXX XX XX</p>
            <p>7/24 Teknik Destek</p>
          </div>

          <div className="contact-section">
            <h2>Çalışma Saatleri</h2>
            <p>Hafta içi: 08:00 - 18:00</p>
            <p>Cumartesi: 09:00 - 15:00</p>
            <p>Acil Servis: 7/24</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Bize Ulaşın</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Ad Soyad</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input type="tel" id="phone" name="phone" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Konu</label>
              <select id="subject" name="subject" required>
                <option value="">Seçiniz</option>
                <option value="bakim">Kombi Bakımı</option>
                <option value="ariza">Kombi Arızası</option>
                <option value="montaj">Kombi Montaj</option>
                <option value="diger">Diğer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Mesajınız</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>

            <button type="submit" className="submit-btn">Gönder</button>
          </form>
        </div>

        <div className="feedback-form">
          <h3>Geri Bildirim</h3>
          {submitted ? (
            <div className="alert alert-success">
              Geri bildiriminiz için teşekkür ederiz!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Görüş ve önerilerinizi bizimle paylaşın..."
                required
              />
              <button type="submit" className="btn btn-primary">
                Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact; 