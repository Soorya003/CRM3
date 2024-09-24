import React, { useState, useEffect } from "react";
import { Form, Button, Container,Row,Col,Table } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]); // State to store complaints data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch complaints from the API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          "https://crm3-h8hk.onrender.com/api/complaints",
          config
        ); 
        console.log(data);
        setComplaints(data);
      } catch (err) {
        setError("Failed to fetch complaints");
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Loading state handling
  if (loading) return <div>Loading...</div>;

  // Error state handling
  if (error) return <div>{error}</div>;

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>View Complaints</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Issue</th>
                <th>Status</th>
                {/* <th>Actions</th>   */}
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint._id}</td>
                  <td>{complaint.product.name}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.status}</td>
                  {/* <td>
                <Button variant="info">View</Button>
              </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewComplaints;
