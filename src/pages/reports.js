import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data for reports
    const mockReports = [
      {
        id: 1,
        faculty_name: 'Faculty of Information Communication Technology',
        course_code: 'CS101',
        course_name: 'Introduction to Programming',
        lecturer_name: 'Mrs lebokose',
        class_name: 'CS101-A',
        date_of_lecture: '2024-01-15',
        topic_taught: 'Introduction to React Hooks',
        actual_students_present: 42,
        total_registered_students: 50,
        status: 'approved',
        submitted_date: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        faculty_name: 'Faculty of Information Communication Technology',
        course_code: 'MATH201',
        course_name: 'Calculus II',
        lecturer_name: 'Mr kolobe',
        class_name: 'MATH201-B',
        date_of_lecture: '2024-01-16',
        topic_taught: 'Integration Techniques',
        actual_students_present: 38,
        total_registered_students: 45,
        status: 'pending',
        submitted_date: '2024-01-16T14:20:00Z'
      },
      {
        id: 3,
        faculty_name: 'Faculty of Science',
        course_code: 'PHY101',
        course_name: 'Physics Fundamentals',
        lecturer_name: 'Mr Michael ',
        class_name: 'PHY101-A',
        date_of_lecture: '2024-01-17',
        topic_taught: 'Newton\'s Laws of Motion',
        actual_students_present: 35,
        total_registered_students: 40,
        status: 'rejected',
        submitted_date: '2024-01-17T11:15:00Z'
      }
    ];

    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: { background: '#fff3cd', color: '#856404' },
      approved: { background: '#d4edda', color: '#155724' },
      rejected: { background: '#f8d7da', color: '#721c24' }
    };

    return (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
        ...statusStyles[status]
      }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const canCreateReport = user?.role === 'lecturer';
  const canApproveReports = ['principal_lecturer', 'program_leader'].includes(user?.role);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        Loading reports...
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Lecture Reports</h1>
            <p>View and manage all lecture reports</p>
          </div>
          {canCreateReport && (
            <Link to="/reports/new" className="btn-primary">
              Create New Report
            </Link>
          )}
        </div>
      </div>

      <div className="content-card">
        <div className="table-controls">
          <div className="filter-controls">
            <label>Filter by Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value="all">All Reports</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Lecturer</th>
                <th>Class</th>
                <th>Date</th>
                <th>Topic</th>
                <th>Attendance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id}>
                  <td>
                    <div>
                      <strong>{report.course_code}</strong>
                      <br />
                      <small style={{ color: '#666' }}>{report.course_name}</small>
                    </div>
                  </td>
                  <td>{report.lecturer_name}</td>
                  <td>{report.class_name}</td>
                  <td>{report.date_of_lecture}</td>
                  <td>{report.topic_taught}</td>
                  <td>{report.actual_students_present}/{report.total_registered_students}</td>
                  <td>{getStatusBadge(report.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Link
                        to={`/reports/${report.id}`}
                        className="btn-small btn-primary"
                      >
                        View
                      </Link>
                      {canApproveReports && report.status === 'pending' && (
                        <>
                          <button className="btn-small btn-success">
                            Approve
                          </button>
                          <button className="btn-small btn-danger">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="no-data">
            <p>No reports found matching the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
