import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import './Dashboard.css';

const LecturerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalReports: 0,
    myClasses: 0,
    pendingReviews: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use hardcoded data instead of API calls
    setStats({
      totalReports: 15,
      myClasses: 3,
      pendingReviews: 5,
      averageRating: 4.2
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading-container">Loading your dashboard...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Lecturer Dashboard</h1>
        <p>Welcome back, {user?.first_name || 'Lecturer'}! Manage your classes and reports.</p>
      </div>

      {/* User Welcome Card */}
      <div className="welcome-card">
        <div className="user-welcome">
          <div className="user-avatar-large">
            {user?.first_name?.charAt(0) || 'L'}
          </div>
          <div className="welcome-text">
            <h2>Hello, {user?.first_name || 'Lecturer'}!</h2>
            <p>Monitor your classes, review reports, and track student progress.</p>
          </div>
        </div>
      </div>

      {/* Lecturer Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalReports}</h3>
            <p>Total Reports</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.myClasses}</h3>
            <p>My Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendingReviews}</h3>
            <p>Pending Reviews</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.averageRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Lecturer Features Grid */}
      <div className="features-grid">
        <div className="feature-card" onClick={() => navigate('/reports')}>
          <div className="feature-icon">📊</div>
          <h3>Report Management</h3>
          <p>Review and manage student reports and submissions.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/classes')}>
          <div className="feature-icon">👥</div>
          <h3>My Classes</h3>
          <p>View and manage your scheduled classes and attendance.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/courses')}>
          <div className="feature-icon">📚</div>
          <h3>Course Overview</h3>
          <p>Monitor course performance and student engagement.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/feedback')}>
          <div className="feature-icon">⭐</div>
          <h3>Feedback & Ratings</h3>
          <p>View student feedback and teaching evaluations.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => navigate('/reports')}>
            <span className="action-icon">📊</span>
            <span>Review Reports</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/classes')}>
            <span className="action-icon">👥</span>
            <span>View Classes</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/courses')}>
            <span className="action-icon">📚</span>
            <span>Course Stats</span>
          </button>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="recent-activity">
        <h2>Upcoming Classes</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📚</div>
            <div className="activity-content">
              <p>CS101 - Introduction to Programming</p>
              <span className="activity-time">Today, 2:00 PM - Room 101</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📐</div>
            <div className="activity-content">
              <p>MATH201 - Advanced Calculus</p>
              <span className="activity-time">Tomorrow, 10:00 AM - Room 205</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">💻</div>
            <div className="activity-content">
              <p>DATA202 - Data Structures</p>
              <span className="activity-time">Friday, 9:00 AM - Lab 301</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
