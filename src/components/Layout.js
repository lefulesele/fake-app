import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/classes', label: 'Classes', icon: '🏫' },
    { path: '/reports', label: 'Reports', icon: '📋' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: '#2c3e50',
        color: 'white',
        padding: '0'
      }}>
        {/* Logo */}
        <div style={{
          padding: '1.5rem 1rem',
          borderBottom: '1px solid #34495e',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>LUCT SYSTEM</h2>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#bdc3c7' }}>
            {user?.role?.toUpperCase()}
          </p>
        </div>

        {/* Navigation Menu */}
        <nav style={{ padding: '1rem 0' }}>
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: location.pathname === item.path ? '#3498db' : 'transparent',
                color: 'white',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '250px',
          padding: '1rem',
          background: '#34495e',
          borderTop: '1px solid #2c3e50'
        }}>
          <p style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '0.8rem',
            color: '#bdc3c7'
          }}>
            {user?.first_name} {user?.last_name}
          </p>
          <button
            onClick={() => navigate('/profile')}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: 'transparent',
              color: 'white',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginBottom: '0.5rem'
            }}
          >
            👤 Profile
          </button>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        padding: '2rem',
        overflow: 'auto'
      }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;