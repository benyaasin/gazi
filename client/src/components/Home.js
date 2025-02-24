import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <div className="hero-section text-center mb-5">
        <h1>Profesyonel Isıtma ve Soğutma Çözümleri</h1>
        <p className="lead">Uzman ekibimizle size en iyi hizmeti sunuyoruz</p>
        <img 
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
          alt="HVAC Systems"
          className="img-fluid rounded shadow-lg mb-4"
          style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
        />
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <Card.Body>
              <Card.Title>Isıtma Sistemleri</Card.Title>
              <Card.Text>
                En son teknoloji ısıtma sistemleri ile evinizi ve işyerinizi ısıtıyoruz.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1586179253019-ac8a2522535f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <Card.Body>
              <Card.Title>Soğutma Sistemleri</Card.Title>
              <Card.Text>
                Modern ve enerji tasarruflu soğutma çözümleri sunuyoruz.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <Card.Body>
              <Card.Title>Bakım Hizmetleri</Card.Title>
              <Card.Text>
                Düzenli bakım ve onarım hizmetleri ile sistemlerinizin ömrünü uzatıyoruz.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home; 