import React, { useEffect, useState } from "react";
import { Container, Button, Table, Alert,Row,Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const BuyProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/products",
          config
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = async (productId) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/products/buy`,
        { productId },
        config
      );
      alert(`Successfully purchased ${response.data.name}`);
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Failed to purchase product");
    }
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>Buy Products</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleBuy(product._id)}
                    >
                      Buy
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyProduct;
