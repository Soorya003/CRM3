import React, { useEffect, useState } from "react";
import { Container,Row,Col,Table } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
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
          "http://127.0.0.1:5000/api/feedback",
          config
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Container fluid className="my-4">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <h1>View Feedback</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Comment</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  {/* <td>{feedback._id}</td> */}
                  <td>{feedback.comments}</td>
                  <td>{feedback.rating}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewFeedback;
