import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Yazılar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Paneli</h1>
        <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>
      </div>

      <div className="dashboard-content">
        <div className="actions">
          <Link to="/admin/posts/new" className="new-post-btn">
            Yeni Yazı Ekle
          </Link>
        </div>

        <div className="posts-list">
          <h2>Yazılar</h2>
          {posts.length === 0 ? (
            <p className="no-posts">Henüz yazı bulunmuyor.</p>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post._id} className="post-card">
                  <h3>{post.title}</h3>
                  <p>{post.content.substring(0, 100)}...</p>
                  <div className="post-meta">
                    <span className={`status ${post.isPublished ? 'published' : 'draft'}`}>
                      {post.isPublished ? 'Yayında' : 'Taslak'}
                    </span>
                    <span className="date">
                      {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <div className="post-actions">
                    <Link to={`/admin/posts/${post._id}/edit`} className="edit-btn">
                      Düzenle
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 