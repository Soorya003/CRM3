import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState([]);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const complaintsData = await axios.get('https://crm3-h8hk.onrender.com/api/admin/complaints');
        const feedbackData = await axios.get('https://crm3-h8hk.onrender.com/api/admin/feedback');
        const productData = await axios.get('https://crm3-h8hk.onrender.com/api/admin/products');
        const orderData = await axios.get('https://crm3-h8hk.onrender.com/api/admin/orders');
        const reportData = await axios.get('https://crm3-h8hk.onrender.com/api/admin/reports');

        setComplaints(complaintsData.data);
        setFeedbacks(feedbackData.data);
        setProducts(productData.data);
        setOrders(orderData.data);
        setReports(reportData.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={4}><Sidebar/></Col>
        <Col lg={8}>
          <h1>Admin Dashboard</h1>
          <Row>
            {/* Total Products */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Products</Card.Title>
                  <Card.Text>{products.length}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Total Orders */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text>{orders.length}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Total Complaints */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Complaints</Card.Title>
                  <Card.Text>{complaints.length}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            {/* Sales Overview */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Sales Overview</Card.Title>
                  <ProgressBar now={60} label="60%" />
                </Card.Body>
              </Card>
            </Col>

            {/* Feedback Summary */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Feedback Summary</Card.Title>
                  <ProgressBar now={90} label="90%" />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            {/* Recent Complaints */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Recent Complaints</Card.Title>
                  <ul>
                    {complaints.slice(0, 5).map((complaint) => (
                      <li key={complaint._id}>{complaint.description}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Recent Feedback */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Recent Feedback</Card.Title>
                  <ul>
                    {feedbacks.slice(0, 5).map((feedback) => (
                      <li key={feedback._id}>Rating: {feedback.rating}/5</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
