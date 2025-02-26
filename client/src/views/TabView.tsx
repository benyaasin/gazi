import React, { Suspense, lazy, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TabView.css';

// Lazy loading ile bileşenleri import ediyoruz
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

// Loading komponenti
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner-border" />
    <span className="loading-text">Yükleniyor...</span>
  </div>
);

const TabView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL'den aktif tab'ı al veya varsayılan olarak 'home' kullan
  const activeTab = location.hash.replace('#', '') || 'home';

  const tabs = [
    { 
      id: 'home', 
      label: 'Anasayfa', 
      component: Home,
      icon: '🏠'
    },
    { 
      id: 'about', 
      label: 'Hakkımızda', 
      component: About,
      icon: 'ℹ️'
    },
    { 
      id: 'contact', 
      label: 'İletişim', 
      component: Contact,
      icon: '📞'
    }
  ];

  // Sayfa yüklendiğinde hash yoksa home'a yönlendir
  useEffect(() => {
    if (!location.hash) {
      navigate('#home', { replace: true });
    }
  }, [location.hash, navigate]);

  // Tab değiştiğinde URL'yi güncelle
  const handleTabChange = (tabId: string) => {
    navigate(`#${tabId}`);
  };

  // Aktif tab'ın bileşenini bul
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Home;

  return (
    <div className="tab-container">
      <nav className="tab-header" role="navigation" aria-label="Ana navigasyon">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
            aria-controls={`panel-${tab.id}`}
            title={tab.label}
          >
            <span className="icon" role="img" aria-label={tab.label}>
              {tab.icon}
            </span>
            <span className="label">{tab.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="tab-content">
        <Suspense fallback={<LoadingSpinner />}>
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="tab-pane active"
          >
            <ActiveComponent />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default TabView; 