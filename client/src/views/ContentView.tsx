import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { IconType } from 'react-icons';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { ContentModel, IContent } from '../models/ContentModel';
import { ContentPresenter } from '../presenters/ContentPresenter';
import { IContentView } from '../interfaces/IContentView';
import './ContentView.css';

interface ModuleTab {
  id: string;
  label: string;
  sections: string[];
}

const modules: ModuleTab[] = [
  {
    id: 'home',
    label: 'Ana Sayfa',
    sections: ['hero', 'services', 'features', 'contact']
  },
  {
    id: 'about',
    label: 'Hakkımızda',
    sections: ['mission', 'vision', 'team', 'history']
  },
  {
    id: 'contact',
    label: 'İletişim',
    sections: ['info', 'form', 'map', 'social']
  }
];

const ContentView: React.FC = () => {
  const [contents, setContents] = useState<IContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState<IContent | null>(null);
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    section: '',
    page: modules[0].id
  });

  const contentModel = new ContentModel();
  const contentPresenter = new ContentPresenter(contentModel, {
    displayContents: (newContents: IContent[]) => {
      setContents(newContents);
      setError(null);
    },
    showError: (message: string) => {
      setError(message);
    },
    showLoading: () => {
      setLoading(true);
    },
    hideLoading: () => {
      setLoading(false);
    },
    onEditContent: (content: IContent) => {
      setEditingContent(content);
      setFormData({
        title: content.title,
        content: content.content,
        section: content.section,
        page: content.page
      });
      setIsEditing(true);
    },
    onDeleteContent: async (id: string) => {
      if (window.confirm('Bu içeriği silmek istediğinizden emin misiniz?')) {
        await contentPresenter.handleDeleteContent(id);
      }
    },
    onCreateContent: async (content: Omit<IContent, 'id'>) => {
      await contentPresenter.handleCreateContent(content);
      setIsEditing(false);
      resetForm();
    }
  });

  useEffect(() => {
    contentPresenter.loadContents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContent) {
        await contentPresenter.handleUpdateContent(editingContent.id, {
          ...formData,
          page: activeModule
        });
      } else {
        await contentPresenter.handleCreateContent({
          ...formData,
          page: activeModule
        });
      }
      setIsEditing(false);
      resetForm();
    } catch (err) {
      setError('İçerik kaydedilirken bir hata oluştu.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      section: '',
      page: activeModule
    });
    setEditingContent(null);
  };

  const filteredContents = contents.filter(content => content.page === activeModule);

  const Icon = ({ icon: IconComponent }: { icon: IconType }) => {
    return <IconComponent className="button-icon" />;
  };

  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <div className="content-view">
        <h2>İçerik Yönetimi</h2>

        <div className="module-tabs">
          {modules.map(module => (
            <button
              key={module.id}
              className={`module-tab ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => setActiveModule(module.id)}
            >
              {module.label}
            </button>
          ))}
        </div>

        <div className="content-actions">
          <button className="new-content-button" onClick={() => setIsEditing(true)}>
            <Icon icon={FiPlus} /> Yeni İçerik Ekle
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="content-list">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner" />
              <p>Yükleniyor...</p>
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="empty-state">
              <p>Bu modül için henüz içerik bulunmuyor.</p>
              <button className="new-content-button" onClick={() => setIsEditing(true)}>
                <Icon icon={FiPlus} /> İlk İçeriği Ekle
              </button>
            </div>
          ) : (
            <table className="content-table">
              <thead>
                <tr>
                  <th>Başlık</th>
                  <th>Bölüm</th>
                  <th>Son Güncelleme</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredContents.map(content => (
                  <tr key={content.id}>
                    <td>{content.title}</td>
                    <td>{content.section}</td>
                    <td>{content.updatedAt ? new Date(content.updatedAt).toLocaleDateString('tr-TR') : '-'}</td>
                    <td>
                      <div className="button-group">
                        <button
                          className="edit-button"
                          onClick={() => contentPresenter.view.onEditContent(content)}
                        >
                          <Icon icon={FiEdit2} /> Düzenle
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => contentPresenter.view.onDeleteContent(content.id)}
                        >
                          <Icon icon={FiTrash2} /> Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isEditing && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{editingContent ? 'İçeriği Düzenle' : 'Yeni İçerik'}</h3>
                <button className="close-button" onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}>
                  <Icon icon={FiX} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="title">Başlık</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="section">Bölüm</label>
                  <select
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bölüm Seçin</option>
                    {modules
                      .find(m => m.id === activeModule)
                      ?.sections.map(section => (
                        <option key={section} value={section}>
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="content">İçerik</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setIsEditing(false);
                      resetForm();
                    }}
                  >
                    İptal
                  </button>
                  <button type="submit" className="save-button">
                    {editingContent ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </IconContext.Provider>
  );
};

export default ContentView; 