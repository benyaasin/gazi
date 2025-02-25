import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPostEdit.css';

const AdminPostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    isPublished: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Yazı yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/posts/${id}`, post);
      navigate('/admin/posts');
    } catch (err) {
      setError('Yazı güncellenirken bir hata oluştu');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`/api/admin/posts/${id}`);
        navigate('/admin/posts');
      } catch (err) {
        setError('Yazı silinirken bir hata oluştu');
      }
    }
  };

  const togglePublish = async () => {
    try {
      const response = await axios.patch(`/api/admin/posts/${id}/publish`);
      setPost(response.data);
    } catch (err) {
      setError('Yayın durumu değiştirilirken bir hata oluştu');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-post-edit">
      <h2>Yazı Düzenle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Başlık:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>İçerik:</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={post.isPublished}
              onChange={handleChange}
            />
            Yayında
          </label>
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Kaydet</button>
          <button type="button" onClick={togglePublish} className="publish-btn">
            {post.isPublished ? 'Yayından Kaldır' : 'Yayınla'}
          </button>
          <button type="button" onClick={handleDelete} className="delete-btn">
            Sil
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPostEdit; 