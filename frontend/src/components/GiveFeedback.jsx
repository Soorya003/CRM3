import React, { useState } from "react";
import { Container, Form, Row, Col,Button } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const GiveFeedback = () => {
  const [comments, setcomments] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(
      "https://crm3-h8hk.onrender.com/api/feedback",
      { comments, rating },
      config
    );
    alert("Thanks for you feedback");
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>Give Feedback</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comments}
                onChange={(e) => setcomments(e.target.value)}
                placeholder="Enter your feedback"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Enter rating (e.g., 5/5)"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit Feedback
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GiveFeedback;
