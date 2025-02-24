import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  page: Yup.string().required('Sayfa seçimi zorunludur'),
  section: Yup.string().required('Bölüm seçimi zorunludur'),
  title: Yup.string().required('Başlık zorunludur'),
  description: Yup.string(),
  imageUrl: Yup.string().url('Geçerli bir URL giriniz'),
  order: Yup.number()
});

function ContentEditor({ content, onClose }) {
  const initialValues = content || {
    page: '',
    section: '',
    title: '',
    description: '',
    imageUrl: '',
    order: 0
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const token = localStorage.getItem('token');
      if (content) {
        await axios.put(`http://localhost:5000/api/content/${content.id}`, values, {
          headers: { 'x-auth-token': token }
        });
      } else {
        await axios.post('http://localhost:5000/api/content', values, {
          headers: { 'x-auth-token': token }
        });
      }
      onClose();
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Bir hata oluştu' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {content ? 'İçerik Düzenle' : 'Yeni İçerik Ekle'}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Sayfa</Form.Label>
                <Form.Select
                  name="page"
                  value={values.page}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.page && errors.page}
                >
                  <option value="">Seçiniz</option>
                  <option value="home">Anasayfa</option>
                  <option value="about">Hakkımızda</option>
                  <option value="services">Hizmetlerimiz</option>
                  <option value="references">Referanslar</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.page}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bölüm</Form.Label>
                <Form.Control
                  type="text"
                  name="section"
                  value={values.section}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.section && errors.section}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.section}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Başlık</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Açıklama</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resim URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={values.imageUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.imageUrl && errors.imageUrl}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imageUrl}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sıralama</Form.Label>
                <Form.Control
                  type="number"
                  name="order"
                  value={values.order}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.order && errors.order}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.order}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                İptal
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default ContentEditor; 