import React from 'react';
import './About.css';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Teknik Servis Müdürü',
      image: '/images/team/manager.jpg',
      description: '15 yıllık sektör deneyimi'
    },
    {
      name: 'Mehmet Demir',
      role: 'Baş Teknisyen',
      image: '/images/team/technician.jpg',
      description: '10 yıllık kombi bakım uzmanı'
    },
    {
      name: 'Ayşe Kaya',
      role: 'Müşteri İlişkileri',
      image: '/images/team/customer-service.jpg',
      description: 'Müşteri memnuniyeti odaklı yaklaşım'
    }
  ];

  const services = [
    {
      icon: '🔧',
      title: 'Kombi Bakımı',
      description: 'Yıllık periyodik bakım ve kontrol hizmetleri'
    },
    {
      icon: '⚡',
      title: 'Arıza Tespiti',
      description: 'Profesyonel cihazlarla hızlı ve doğru arıza tespiti'
    },
    {
      icon: '🛠️',
      title: 'Tamir Servisi',
      description: 'Orijinal parça garantili onarım hizmetleri'
    },
    {
      icon: '📱',
      title: '7/24 Destek',
      description: 'Acil durumlarda kesintisiz teknik destek'
    }
  ];

  const stats = [
    { number: '15+', label: 'Yıllık Deneyim' },
    { number: '10000+', label: 'Mutlu Müşteri' },
    { number: '24/7', label: 'Teknik Destek' },
    { number: '50+', label: 'Uzman Teknisyen' }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Gazi Teknik</h1>
          <p className="hero-text">
            2008'den beri İstanbul'da kaliteli ve güvenilir kombi servis hizmetleri sunuyoruz.
            Uzman ekibimiz ve modern ekipmanlarımızla hizmetinizdeyiz.
          </p>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="mission-vision">
        <div className="mission">
          <h2>Misyonumuz</h2>
          <p>
            Müşterilerimize en kaliteli kombi servis hizmetini, uygun fiyatlarla ve 
            profesyonel ekibimizle sunmak. Müşteri memnuniyeti ve güvenliği bizim 
            önceliğimizdir.
          </p>
        </div>
        <div className="vision">
          <h2>Vizyonumuz</h2>
          <p>
            İstanbul'un lider kombi servis şirketi olmak ve müşteri memnuniyetinde 
            sektörün standardını belirlemek. Sürekli gelişim ve yenilikçi çözümlerle 
            hizmet kalitemizi artırmak.
          </p>
        </div>
      </section>

      {/* Hizmetlerimiz */}
      <section className="services-section">
        <h2>Hizmetlerimiz</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ekibimiz */}
      <section className="team-section">
        <h2>Profesyonel Ekibimiz</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-description">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* İstatistikler */}
      <section className="stats-section">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About; 