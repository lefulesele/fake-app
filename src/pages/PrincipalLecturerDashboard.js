import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

const PrincipalLecturerDashboard = () => {
  const { user } = useAuth();

  const modules = [
    {
      title: 'Courses',
      description: 'Manage course information and curriculum',
      path: '/courses',
      icon: '📚'
    },
    {
      title: 'Classes',
      description: 'View and manage class schedules',
      path: '/classes',
      icon: '👥'
    },
    {
      title: 'Reports',
      description: 'Review and manage lecture reports',
      path: '/reports',
      icon: '📋'
    },
    {
      title: 'Monitoring',
      description: 'Monitor student progress and performance',
      path: '/monitoring',
      icon: '📊'
    },
    {
      title: 'Rating',
      description: 'Rate and review courses and lecturers',
      path: '/rating',
      icon: '⭐'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || 'Principal Lecturer'}</h1>
        <p>Principal Lecturer Dashboard - Manage courses, classes, and reports</p>
      </div>

      <div className="dashboard-grid">
        {modules.map((module, index) => (
          <Link key={index} to={module.path} className="dashboard-card">
            <div className="card-icon">{module.icon}</div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </Link>
        ))}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Courses</h4>
          <span className="stat-number">12</span>
        </div>
        <div className="stat-card">
          <h4>Active Classes</h4>
          <span className="stat-number">8</span>
        </div>
        <div className="stat-card">
          <h4>Pending Reports</h4>
          <span className="stat-number">5</span>
        </div>
        <div className="stat-card">
          <h4>Student Ratings</h4>
          <span className="stat-number">4.2</span>
        </div>
      </div>
    </div>
  );
};

export default PrincipalLecturerDashboard;
