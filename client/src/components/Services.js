import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function Services() {
  const services = [
    {
      title: "Isıtma Sistemleri Kurulumu",
      description: "Kombi, kalorifer, yerden ısıtma gibi sistemlerin profesyonel kurulumu",
      image: "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Soğutma Sistemleri",
      description: "Klima, havalandırma ve soğutma sistemlerinin kurulum ve bakımı",
      image: "https://images.unsplash.com/photo-1586179253019-ac8a2522535f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Periyodik Bakım",
      description: "Tüm ısıtma ve soğutma sistemleri için düzenli bakım hizmetleri",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Arıza Tespit ve Onarım",
      description: "Hızlı ve etkili arıza tespit ve onarım hizmetleri",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Yedek Parça Değişimi",
      description: "Orijinal yedek parça ile değişim hizmeti",
      image: "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "7/24 Acil Servis",
      description: "Acil durumlar için 7/24 teknik destek ve servis hizmeti",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div>
      <h1 className="text-center mb-5">Hizmetlerimiz</h1>
      <Row className="g-4">
        {services.map((service, index) => (
          <Col md={4} key={index}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={service.image} />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Services; 