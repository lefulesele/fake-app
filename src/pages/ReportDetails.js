import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Define fetchReportDetails with useCallback to avoid infinite re-renders
  const fetchReportDetails = useCallback(async () => {
    try {
      setLoading(true);
      // Mock API call - replace with actual API
      const mockReport = {
        id: parseInt(id),
        title: 'Weekly Progress Report',
        course: 'CS101 - Introduction to Programming',
        lecturer: 'Dr. John Smith',
        date: '2024-01-15',
        attendance: 42,
        topicCovered: 'Introduction to React Hooks and State Management',
        assignmentsGiven: 'Build a simple todo app using React hooks',
        learningOutcomes: 'Students should understand basic React hooks usage and state management concepts',
        notes: 'Good participation from students. Need to cover more examples in next class.',
        status: 'Submitted'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mockReport.id === parseInt(id)) {
        setReport(mockReport);
      } else {
        setError('Report not found');
      }
    } catch (err) {
      setError('Failed to fetch report details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReportDetails();
  }, [fetchReportDetails]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading report details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#e74c3c' }}>{error}</p>
        <button
          onClick={() => navigate('/reports')}
          style={{
            padding: '10px 20px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Back to Reports
        </button>
      </div>
    );
  }

  if (!report) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Report not found</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, color: '#2c3e50' }}>{report.title}</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>
              Report ID: {report.id} • {report.date}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => navigate('/reports')}
              style={{
                padding: '8px 16px',
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
            <button
              onClick={() => navigate(`/reports/edit/${report.id}`)}
              style={{
                padding: '8px 16px',
                background: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Basic Information */}
          <div>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Basic Information</h3>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Course:</strong> {report.course}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Lecturer:</strong> {report.lecturer}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Date:</strong> {report.date}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Attendance:</strong> {report.attendence} students
              </div>
              <div>
                <strong>Status:</strong> 
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  background: '#d4edda',
                  color: '#155724',
                  marginLeft: '0.5rem'
                }}>
                  {report.status}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Content</h3>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <strong>Topic Covered:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#2c3e50' }}>{report.topicCovered}</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <strong>Assignments Given:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#2c3e50' }}>{report.assignmentsGiven}</p>
              </div>
              <div>
                <strong>Learning Outcomes:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#2c3e50' }}>{report.learningOutcomes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Additional Notes</h3>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '8px',
            borderLeft: '4px solid #3498db'
          }}>
            <p style={{ margin: 0, color: '#2c3e50' }}>{report.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;