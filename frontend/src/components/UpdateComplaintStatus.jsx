import React, { useState, useEffect } from "react";
import { Form, Button, Container,Row,Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const UpdateComplaintStatus = () => {
  const [complaintId, setComplaintId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [complaints, setComplaints] = useState([]); // Initialize complaints as an empty array
  const [loading, setLoading] = useState(false);
  // Fetch complaints when the component mounts
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
        setComplaints(response.data); // Ensure response.data is an array
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setComplaints([]); // In case of an error, set complaints to an empty array
      }
    };

    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://127.0.0.1:5000/api/complaints/${complaintId}`,
        { status },
        config
      );
      alert("Complaint status updated successfully!");
    } catch (error) {
      console.error("Error updating complaint status:", error);
      alert("Failed to update complaint status");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>Update Complaint Status</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Complaint ID</Form.Label>
              <Form.Control
                as="select"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                required
              >
                <option value="">Select a Complaint ID</option>
                {complaints.map((complaint) => (
                  <option key={complaint._id} value={complaint._id}>
                    {complaint.product?.name || "No Product Name"} -{" "}
                    {complaint.description}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>Resolved</option>
                <option>In Progress</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update Status
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateComplaintStatus;
