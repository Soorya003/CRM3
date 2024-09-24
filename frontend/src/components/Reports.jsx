import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Reports = () => {
  const [salesReport, setSalesReport] = useState({});
  const [conversionReport, setConversionReport] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      const salesData = await axios.get(`${import.meta.env.VITE_API_URL}/reports/sales-performance?month=9&year=2024`);
      const conversionData = await axios.get(`${import.meta.env.VITE_API_URL}/reports/lead-conversion`);

      setSalesReport(salesData.data);
      setConversionReport(conversionData.data);
    };

    fetchReports();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Sales Report</Card.Title>
              <Card.Text>Total Sales: ${salesReport.totalSales}</Card.Text>
              <Card.Text>Total Transactions: {salesReport.totalTransactions}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Lead Conversion Report</Card.Title>
              <Card.Text>Total Leads: {conversionReport.totalLeads}</Card.Text>
              <Card.Text>Total Customers: {conversionReport.totalCustomers}</Card.Text>
              <Card.Text>Conversion Rate: {conversionReport.conversionRate}%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
