import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    totalCourses: 0,
    systemHealth: 'Good'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use hardcoded data instead of API calls
    setStats({
      totalUsers: 25,
      totalReports: 15,
      totalCourses: 8,
      systemHealth: 'Good'
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading-container">Loading admin dashboard...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.first_name || 'Administrator'}! System overview and management.</p>
      </div>

      {/* User Welcome Card */}
      <div className="welcome-card">
        <div className="user-welcome">
          <div className="user-avatar-large">
            {user?.first_name?.charAt(0) || 'A'}
          </div>
          <div className="welcome-text">
            <h2>Hello, {user?.first_name || 'Administrator'}!</h2>
            <p>Monitor system performance, manage users, and oversee all operations.</p>
          </div>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalReports}</h3>
            <p>Total Reports</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.totalCourses}</h3>
            <p>Total Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-content">
            <h3>{stats.systemHealth}</h3>
            <p>System Health</p>
          </div>
        </div>
      </div>

      {/* Admin Features Grid */}
      <div className="features-grid">
        <div className="feature-card" onClick={() => navigate('/reports')}>
          <div className="feature-icon">📊</div>
          <h3>Report Oversight</h3>
          <p>Monitor all reports, review submissions, and manage approvals.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/courses')}>
          <div className="feature-icon">📚</div>
          <h3>Course Management</h3>
          <p>Manage courses, assign lecturers, and track course performance.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/classes')}>
          <div className="feature-icon">👁️</div>
          <h3>System Monitoring</h3>
          <p>Monitor class schedules, attendance, and system usage.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/feedback')}>
          <div className="feature-icon">⭐</div>
          <h3>Analytics & Feedback</h3>
          <p>View system analytics, user feedback, and performance metrics.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => navigate('/reports')}>
            <span className="action-icon">📊</span>
            <span>All Reports</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/courses')}>
            <span className="action-icon">📚</span>
            <span>Manage Courses</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/classes')}>
            <span className="action-icon">👁️</span>
            <span>System Monitor</span>
          </button>
        </div>
      </div>

      {/* System Alerts */}
      <div className="recent-activity">
        <h2>System Alerts & Notifications</h2>
        <div className="activity-list">
          <div className="activity-item alert-success">
            <div className="activity-icon">✅</div>
            <div className="activity-content">
              <p>Database backup completed successfully</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item alert-warning">
            <div className="activity-icon">⚠️</div>
            <div className="activity-content">
              <p>5 reports pending review for more than 7 days</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item alert-info">
            <div className="activity-icon">ℹ️</div>
            <div className="activity-content">
              <p>New user registration: john.doe@luct.com</p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
