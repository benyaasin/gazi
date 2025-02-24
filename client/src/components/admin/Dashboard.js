import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContentEditor from './ContentEditor';

function Dashboard() {
  const [contents, setContents] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/content', {
        headers: { 'x-auth-token': token }
      });
      setContents(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  const handleEdit = (content) => {
    setSelectedContent(content);
    setShowEditor(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu içeriği silmek istediğinizden emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/content/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchContents();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <Container fluid>
      <Row className="mb-4 mt-4">
        <Col>
          <h2>Admin Panel</h2>
          <Button variant="danger" onClick={handleLogout} className="float-end">
            Çıkış Yap
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">İçerik Yönetimi</h5>
              <Button variant="primary" onClick={() => {
                setSelectedContent(null);
                setShowEditor(true);
              }}>
                Yeni İçerik Ekle
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Sayfa</th>
                    <th>Bölüm</th>
                    <th>Başlık</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((content) => (
                    <tr key={content.id}>
                      <td>{content.page}</td>
                      <td>{content.section}</td>
                      <td>{content.title}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(content)}
                        >
                          Düzenle
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(content.id)}
                        >
                          Sil
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showEditor && (
        <ContentEditor
          content={selectedContent}
          onClose={() => {
            setShowEditor(false);
            setSelectedContent(null);
            fetchContents();
          }}
        />
      )}
    </Container>
  );
}

export default Dashboard; 