import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import LecturerDashboard from './pages/LecturerDashboard';
import PrincipalLecturerDashboard from './pages/PrincipalLecturerDashboard';
import ProgramLeaderDashboard from './pages/ProgramLeaderDashboard';
import Courses from './pages/Courses';
import Classes from './pages/Classes';
import Reports from './pages/reports';
import ReportForm from './pages/ReportForm';
import ReportDetails from './pages/ReportDetails';
import Monitoring from './pages/Monitoring';
import Rating from './pages/Rating';
import Feedback from './pages/Feedback';
import Lectures from './pages/Lectures';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import './App.css';

// Role-based Dashboard component
const RoleBasedDashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'lecturer':
      return <LecturerDashboard />;
    case 'principal_lecturer':
      return <PrincipalLecturerDashboard />;
    case 'program_leader':
      return <ProgramLeaderDashboard />;
    default:
      return <Dashboard />;
  }
};

// Protected Route component
const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, loading, isAuthenticated, hasAnyRole } = useAuth();

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Public Route component
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/dashboard" replace />;
};

// Unauthorized component
const Unauthorized = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column',
    textAlign: 'center'
  }}>
    <h1>Access Denied</h1>
    <p>You don't have permission to access this page.</p>
    <button 
      onClick={() => window.history.back()} 
      style={{
        padding: '10px 20px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Go Back
    </button>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            {/* Protected routes with Layout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RoleBasedDashboard />
                </ProtectedRoute>
              }
            />

            {/* Role-specific dashboard routes */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute requiredRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer-dashboard"
              element={
                <ProtectedRoute requiredRoles={['lecturer']}>
                  <LecturerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/principal-lecturer-dashboard"
              element={
                <ProtectedRoute requiredRoles={['principal_lecturer']}>
                  <PrincipalLecturerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/program-leader-dashboard"
              element={
                <ProtectedRoute requiredRoles={['program_leader']}>
                  <ProgramLeaderDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Common modules */}
            <Route 
              path="/courses" 
              element={
                <ProtectedRoute requiredRoles={['student', 'lecturer', 'principal_lecturer', 'program_leader']}>
                  <Courses />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/classes" 
              element={
                <ProtectedRoute requiredRoles={['student', 'lecturer', 'principal_lecturer', 'program_leader']}>
                  <Classes />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute requiredRoles={['lecturer', 'principal_lecturer', 'program_leader']}>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/reports/new" 
              element={
                <ProtectedRoute requiredRoles={['lecturer']}>
                  <ReportForm />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/reports/:id" 
              element={
                <ProtectedRoute requiredRoles={['lecturer', 'principal_lecturer', 'program_leader']}>
                  <ReportDetails />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/monitoring" 
              element={
                <ProtectedRoute requiredRoles={['principal_lecturer', 'program_leader']}>
                  <Monitoring />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/rating" 
              element={
                <ProtectedRoute requiredRoles={['student', 'lecturer']}>
                  <Rating />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/feedback" 
              element={
                <ProtectedRoute requiredRoles={['student', 'lecturer', 'principal_lecturer', 'program_leader']}>
                  <Feedback />
                </ProtectedRoute>
              } 
            />
            
            <Route
              path="/lectures"
              element={
                <ProtectedRoute requiredRoles={['program_leader']}>
                  <Lectures />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Unauthorized route */}
            <Route 
              path="/unauthorized" 
              element={<Unauthorized />} 
            />
            
            {/* Default redirect */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />
            
            {/* 404 route */}
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;