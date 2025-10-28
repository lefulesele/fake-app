import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1>Welcome to LUCT Reporting System</h1>
        <p>Role: {user?.role}</p>
        <p>Department: {user?.department}</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Quick Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: '#e7f3ff', padding: '1rem', borderRadius: '4px' }}>
              <h3>5</h3>
              <p>My Courses</p>
            </div>
            <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '4px' }}>
              <h3>12</h3>
              <p>Reports</p>
            </div>
            <div style={{ background: '#d4edda', padding: '1rem', borderRadius: '4px' }}>
              <h3>3</h3>
              <p>Upcoming Classes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;