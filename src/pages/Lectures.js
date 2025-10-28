import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

const Lectures = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data for lectures
    const mockLectures = [
      {
        id: 1,
        course_code: 'CS101',
        course_name: 'Introduction to Programming',
        lecturer_name: 'Dr. John Smith',
        class_name: 'CS101-A',
        date: '2024-01-15',
        time: '10:00 AM - 12:00 PM',
        venue: 'Room 201, ICT Building',
        status: 'completed',
        attendance: 42
      },
      {
        id: 2,
        course_code: 'MATH201',
        course_name: 'Calculus II',
        lecturer_name: 'Prof. Sarah Johnson',
        class_name: 'MATH201-B',
        date: '2024-01-16',
        time: '2:00 PM - 4:00 PM',
        venue: 'Room 305, Math Building',
        status: 'scheduled',
        attendance: null
      },
      {
        id: 3,
        course_code: 'PHY101',
        course_name: 'Physics Fundamentals',
        lecturer_name: 'Dr. Michael Brown',
        class_name: 'PHY101-A',
        date: '2024-01-17',
        time: '9:00 AM - 11:00 AM',
        venue: 'Lab 101, Science Building',
        status: 'scheduled',
        attendance: null
      }
    ];

    setTimeout(() => {
      setLectures(mockLectures);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLectures = lectures.filter(lecture => {
    if (filter === 'all') return true;
    return lecture.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      scheduled: { background: '#e3f2fd', color: '#1976d2' },
      completed: { background: '#e8f5e8', color: '#2e7d32' },
      cancelled: { background: '#ffebee', color: '#d32f2f' }
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        Loading lectures...
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Lecture Management</h1>
        <p>Manage and monitor all lecture schedules and assignments</p>
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
              <option value="all">All Lectures</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
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
                <th>Date & Time</th>
                <th>Venue</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLectures.map(lecture => (
                <tr key={lecture.id}>
                  <td>
                    <div>
                      <strong>{lecture.course_code}</strong>
                      <br />
                      <small style={{ color: '#666' }}>{lecture.course_name}</small>
                    </div>
                  </td>
                  <td>{lecture.lecturer_name}</td>
                  <td>{lecture.class_name}</td>
                  <td>
                    <div>
                      {lecture.date}
                      <br />
                      <small style={{ color: '#666' }}>{lecture.time}</small>
                    </div>
                  </td>
                  <td>{lecture.venue}</td>
                  <td>{getStatusBadge(lecture.status)}</td>
                  <td>
                    {lecture.attendance ? `${lecture.attendance} students` : '-'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Link
                        to={`/lectures/${lecture.id}`}
                        className="btn-small btn-primary"
                      >
                        View
                      </Link>
                      {lecture.status === 'scheduled' && (
                        <button className="btn-small btn-secondary">
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLectures.length === 0 && (
          <div className="no-data">
            <p>No lectures found matching the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lectures;
