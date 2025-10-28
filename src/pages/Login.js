import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const mockUsers = [
    {
      id: 1,
      email: 'lecturer@luct.com',
      password: 'password123',
      role: 'lecturer',
      first_name: 'John',
      last_name: 'Smith',
      department: 'Computer Science'
    },
    {
      id: 2,
      email: 'admin@luct.com',
      password: 'password123',
      role: 'admin',
      first_name: 'System',
      last_name: 'Administrator',
      department: 'IT'
    },
    {
      id: 3,
      email: 'student@luct.com',
      password: 'password123',
      role: 'student',
      first_name: 'Test',
      last_name: 'Student',
      department: 'Computer Science'
    },
    {
      id: 4,
      email: 'principal_lecturer@luct.com',
      password: 'password123',
      role: 'principal_lecturer',
      first_name: 'Jane',
      last_name: 'Doe',
      department: 'Computer Science'
    },
    {
      id: 5,
      email: 'program_leader@luct.com',
      password: 'password123',
      role: 'program_leader',
      first_name: 'Bob',
      last_name: 'Wilson',
      department: 'Computer Science'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === email);

      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = user;
      login(userWithoutPassword);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>
          LUCT Reporting System
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Academic Reporting Platform
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <h4 style={{ marginBottom: '15px', textAlign: 'center' }}>Demo Accounts:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => handleDemoLogin('lecturer@luct.com')}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Lecturer Account
            </button>
            <button
              onClick={() => handleDemoLogin('principal_lecturer@luct.com')}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Principal Lecturer Account
            </button>
            <button
              onClick={() => handleDemoLogin('program_leader@luct.com')}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Program Leader Account
            </button>
            <button
              onClick={() => handleDemoLogin('admin@luct.com')}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Admin Account
            </button>
            <button
              onClick={() => handleDemoLogin('student@luct.com')}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Student Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;