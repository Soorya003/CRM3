// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../redux/authSlice'; // Import the action
import authService from '../services/authService';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login({ email, password });
      
      if (data.token) {
        // Store user data (token and role) in localStorage
        const userData = { token: data.token, role: data.role };
        localStorage.setItem('user', JSON.stringify(userData));

        // Dispatch action to update user role and token in Redux store
        dispatch(setUserRole({ role: data.role, token: data.token }));

        // Navigate to the dashboard or any protected route
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Invalid credentials, please try again.');
      }
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col md={12}>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
