import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPost.css';

const AdminPostNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPublished: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/admin');
      } else {
        setError(data.message || 'Gönderi oluşturulurken bir hata oluştu');
      }
    } catch (err) {
      setError('Sunucu hatası oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-post">
      <h1>Yeni Gönderi Oluştur</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Başlık</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">İçerik</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="form-control"
            rows="10"
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="isPublished">
            Yayınla
          </label>
        </div>

        <div className="button-group">
          <button 
            type="button" 
            onClick={() => navigate('/admin')}
            className="btn btn-secondary"
            disabled={loading}
          >
            İptal
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPostNew; 