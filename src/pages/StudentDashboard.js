import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    myReports: 0,
    enrolledCourses: 0,
    pendingFeedback: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use hardcoded data instead of API calls
    setStats({
      myReports: 3,
      enrolledCourses: 2,
      pendingFeedback: 1
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading-container">Loading your dashboard...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back, {user?.first_name || 'Student'}! Here's your academic overview.</p>
      </div>

      {/* User Welcome Card */}
      <div className="welcome-card">
        <div className="user-welcome">
          <div className="user-avatar-large">
            {user?.first_name?.charAt(0) || 'S'}
          </div>
          <div className="welcome-text">
            <h2>Hello, {user?.first_name || 'Student'}!</h2>
            <p>Track your progress, view reports, and stay updated with your courses.</p>
          </div>
        </div>
      </div>

      {/* Student Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.myReports}</h3>
            <p>My Reports</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.enrolledCourses}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.pendingFeedback}</h3>
            <p>Pending Feedback</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>85%</h3>
            <p>Attendance Rate</p>
          </div>
        </div>
      </div>

      {/* Student Features Grid */}
      <div className="features-grid">
        <div className="feature-card" onClick={() => navigate('/reports')}>
          <div className="feature-icon">📊</div>
          <h3>My Reports</h3>
          <p>View and track your submitted reports and their status.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/courses')}>
          <div className="feature-icon">📚</div>
          <h3>My Courses</h3>
          <p>Access course materials, schedules, and assignments.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/classes')}>
          <div className="feature-icon">👁️</div>
          <h3>Class Schedule</h3>
          <p>View your class timetable and attendance records.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/feedback')}>
          <div className="feature-icon">⭐</div>
          <h3>Rate & Feedback</h3>
          <p>Provide feedback on courses and teaching quality.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => navigate('/reports/new')}>
            <span className="action-icon">📝</span>
            <span>Submit Report</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/courses')}>
            <span className="action-icon">📚</span>
            <span>View Courses</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/profile')}>
            <span className="action-icon">👤</span>
            <span>My Profile</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p>Report submitted for CS101</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">⭐</div>
            <div className="activity-content">
              <p>Feedback provided for MATH201</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📚</div>
            <div className="activity-content">
              <p>Enrolled in new course: DATA202</p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
