import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const UserDashboard = () => {
  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>User Dashboard</h1>
          <Row>
            {/* Profile Summary Card */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Profile Summary</Card.Title>
                  <Card.Text>
                    View and update your profile information.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Recent Orders Card */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Recent Orders</Card.Title>
                  <Card.Text>Check the status of your recent orders.</Card.Text>
                  {/* Mock data */}
                  <ul>
                    <li>Order #123: Shipped</li>
                    <li>Order #124: Delivered</li>
                    <li>Order #125: In Transit</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            {/* Feedback Card */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Feedback</Card.Title>
                  <Card.Text>
                    Provide feedback on your recent experiences.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Wishlist Card */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Wishlist</Card.Title>
                  <Card.Text>View your saved items and wishlist.</Card.Text>
                  {/* Mock data */}
                  <ul>
                    <li>Item 1: Product A</li>
                    <li>Item 2: Product B</li>
                    <li>Item 3: Product C</li>
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

export default UserDashboard;
