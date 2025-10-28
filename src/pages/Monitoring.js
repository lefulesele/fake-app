import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

const API_BASE_URL = '';

const Monitoring = () => {
  const stats = [
    { label: 'Overall Attendance', value: 85, variant: 'success' },
    { label: 'Report Submission', value: 92, variant: 'info' },
    { label: 'Approval Rate', value: 78, variant: 'warning' },
    { label: 'Student Satisfaction', value: 88, variant: 'primary' }
  ];

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Monitoring</h1>
          <p className="text-muted">Track system performance and metrics</p>
        </Col>
      </Row>

      <Row className="g-4">
        {stats.map((stat, index) => (
          <Col md={6} key={index}>
            <Card>
              <Card.Body>
                <h6 className="card-title">{stat.label}</h6>
                <div className="d-flex align-items-center">
                  <ProgressBar 
                    now={stat.value} 
                    variant={stat.variant}
                    className="flex-grow-1 me-3"
                  />
                  <span className="fw-bold">{stat.value}%</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <div className="timeline">
                <div className="timeline-item">
                  <small className="text-muted">Today, 10:30 AM</small>
                  <p className="mb-1">New report submitted for Web Development</p>
                </div>
                <div className="timeline-item">
                  <small className="text-muted">Yesterday, 3:15 PM</small>
                  <p className="mb-1">Database backup completed</p>
                </div>
                <div className="timeline-item">
                  <small className="text-muted">Jan 14, 2024</small>
                  <p className="mb-1">System maintenance completed</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Monitoring;