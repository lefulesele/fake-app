import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const API_BASE_URL = '';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Registration attempt:', formData);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        faculty: 'Faculty of Information Communication Technology'
      });

      console.log('Registration response:', response.data);

      if (response.data.success) {
        console.log('Registration successful!');
        
        // FIXED: Handle different response structures
        const userData = response.data.user || response.data.data;
        const token = response.data.token || response.data.data?.token;
        
        if (userData && token) {
          login(userData, token);
          navigate('/dashboard');
        } else {
          // If the structure is different, log it and try direct access
          console.log('Full response structure:', response.data);
          login(response.data, response.data.token);
          navigate('/dashboard');
        }
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        setError(error.response.data.message || error.response.data.error || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response from server. Check if backend is running on port 5002');
      } else {
        setError('Request failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    console.log('Testing backend connection...');
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      console.log('Health check response:', response.data);
      alert(`✅ Backend is running: ${response.data.message}\nPort: 5002`);
    } catch (error) {
      console.error('Health check failed:', error);
      alert('❌ Backend connection failed! Check if server is running on port 5002.');
    }
  };

  const fillSampleData = () => {
    setFormData({
      name: 'Matseliso Molefi',
      email: `student${Date.now()}@luct.com`,
      password: 'password123',
      role: 'student'
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>LUCT Register</h2>
        
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Check browser console for detailed logs
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
              disabled={loading}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="principal_lecturer">Principal Lecturer</option>
              <option value="program_leader">Program Leader</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
              disabled={loading}
              placeholder="Enter your password (min 6 characters)"
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span className="loading-spinner"></span>
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="action-buttons">
          <button 
            type="button"
            className="test-btn"
            onClick={testBackendConnection}
            disabled={loading}
          >
            Test Backend Connection
          </button>
          <button 
            type="button"
            className="test-btn"
            onClick={fillSampleData}
            disabled={loading}
          >
            Fill Sample Data
          </button>
        </div>

        <div className="toggle-auth">
          <Link to="/login" className="toggle-btn">
            Already have an account? Login
          </Link>
        </div>

        <div className="test-credentials">
          <h4>Backend Status:</h4>
          <p><strong>URL:</strong> </p>
          <p><strong>Test Accounts:</strong> lecturer@luct.com / password123</p>
          <p><strong>Note:</strong> Use unique email for registration</p>
        </div>
      </div>
    </div>
  );
};

export default Register;