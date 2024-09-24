// src/components/ProductPost.jsx
import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container,Row,Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const ProductPost = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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
    console.log(config);
    try {
      await axios.post(
        "https://crm3-h8hk.onrender.com/api/products",
        { name, price, description },
        config
      );
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>Post Product</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Post Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPost;
