import React, { useEffect, useState } from "react";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const PostComplaint = () => {
  const [issue, setIssue] = useState("");
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://127.0.0.1:5000/api/products",
          config
        );
        setProducts(response.data); // Assuming the response contains an array of products
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

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

    const complaintData = {
      product,
      description: issue, // Ensure this is mapped correctly
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/complaints",
        complaintData,
        config
      );
      alert(`Successfully submitted complaint`);
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>Post Complaint</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control
                as="select"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
              >
                <option value="">Select a product</option>
                {products.map((prod) => (
                  <option key={prod._id} value={prod._id}>
                    {prod.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Describe your issue"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit Complaint
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostComplaint;
