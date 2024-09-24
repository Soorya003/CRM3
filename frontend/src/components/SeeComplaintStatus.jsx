import React, { useEffect, useState } from "react";
import { Container, Table,Row, Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const SeeComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const response = await axios.get(
          "http://127.0.0.1:5000/api/complaints",
          config
        );
        setComplaints(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>See Complaint Status</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>{" "}
                {/* Changed from "Issue" to "Product Name" */}
                <th>Issue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint._id}</td>
                  <td>{complaint.product.name}</td>{" "}
                  {/* Display the product name */}
                  <td>{complaint.description}</td> {/* Description */}
                  <td>{complaint.status}</td> {/* Status */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SeeComplaintStatus;
