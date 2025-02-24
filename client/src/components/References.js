import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function References() {
  const references = [
    {
      name: "ABC Şirketi",
      project: "Merkez Ofis Isıtma Sistemi",
      description: "Tüm ofis binasının ısıtma sisteminin yenilenmesi ve bakımı",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "XYZ Hastanesi",
      project: "Hastane İklimlendirme",
      description: "Hastane genelinde iklimlendirme sistemlerinin kurulumu",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "123 Otel",
      project: "Otel Soğutma Sistemi",
      description: "200 odalı otelin merkezi soğutma sistemi kurulumu",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "DEF Alışveriş Merkezi",
      project: "AVM İklimlendirme",
      description: "Alışveriş merkezi komple ısıtma ve soğutma sistemleri",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div>
      <h1 className="text-center mb-5">Referanslarımız</h1>
      <p className="text-center lead mb-5">
        Yıllar içinde birçok büyük projeye imza attık. İşte bazı referanslarımız:
      </p>
      <Row className="g-4">
        {references.map((reference, index) => (
          <Col md={6} key={index}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={reference.image} />
              <Card.Body>
                <Card.Title>{reference.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{reference.project}</Card.Subtitle>
                <Card.Text>{reference.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default References; 