import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <div>
      <h1 className="text-center mb-5">Hakkımızda</h1>
      <Row className="mb-5">
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Our Team"
            className="img-fluid rounded shadow-lg"
          />
        </Col>
        <Col md={6}>
          <h2>Biz Kimiz?</h2>
          <p className="lead">
            20 yılı aşkın tecrübemizle, ısıtma ve soğutma sistemleri alanında lider firma olarak hizmet vermekteyiz.
          </p>
          <p>
            Uzman ekibimiz ve modern teknolojimizle, müşterilerimize en iyi hizmeti sunmayı hedefliyoruz. 
            Kaliteli ürünler ve profesyonel servis anlayışımızla sektörde öncü konumdayız.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>Misyonumuz</Card.Title>
              <Card.Text>
                Müşterilerimize en kaliteli hizmeti sunarak, konfor ve memnuniyeti en üst düzeyde tutmak.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>Vizyonumuz</Card.Title>
              <Card.Text>
                Sektörde lider konumumuzu koruyarak, yenilikçi çözümlerle müşterilerimizin hayatını kolaylaştırmak.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>Değerlerimiz</Card.Title>
              <Card.Text>
                Dürüstlük, şeffaflık ve müşteri memnuniyeti önceliklerimiz arasındadır.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default About; 