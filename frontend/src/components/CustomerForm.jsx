import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import customerService from '../services/customerService';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
    preferences: '',
    status: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // for editing an existing customer

  useEffect(() => {
    if (id) {
      // Fetch customer data for editing
      const fetchCustomer = async () => {
        try {
          const data = await customerService.getCustomer(id);
          setCustomer(data);
        } catch (error) {
          setError('Failed to load customer details.');
        }
      };
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await customerService.updateCustomer(id, customer);
      } else {
        await customerService.addCustomer(customer);
      }
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      setError('Failed to save customer.');
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <h2>{id ? 'Edit Customer' : 'Add Customer'}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Customer saved successfully!</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Enter customer email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={customer.address}
                onChange={handleChange}
                placeholder="Enter customer address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preferences</Form.Label>
              <Form.Control
                type="text"
                name="preferences"
                value={customer.preferences}
                onChange={handleChange}
                placeholder="Enter customer preferences (e.g., colors, fabric)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={customer.status}
                onChange={handleChange}
                placeholder="Enter customer status (e.g., Active, Inactive)"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              {id ? 'Update Customer' : 'Add Customer'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerForm;
