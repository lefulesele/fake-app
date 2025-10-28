import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import axios from 'axios';

const API_BASE_URL = '';

const ReportForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    // Basic info
    faculty_name: 'Faculty of Information Communication Technology',
    class_name: '',
    week_of_reporting: '',
    date_of_lecture: '',
    course_name: '',
    course_code: '',
    lecturer_name: '',
    // Attendance
    actual_students_present: '',
    total_registered_students: '',
    // Location & Time
    venue: '',
    scheduled_lecture_time: '',
    // Content
    topic_taught: '',
    learning_outcomes: '',
    lecturer_recommendations: ''
  });

  // Define fetchReport with useCallback
  const fetchReport = useCallback(async () => {
    if (!isEdit) {
      // Pre-fill lecturer name for new reports
      setFormData(prev => ({
        ...prev,
        lecturer_name: user?.name || user?.email || ''
      }));
      return;
    }

    try {
      setLoading(true);
      // Mock API call for existing report
      const mockReport = {
        id: parseInt(id),
        faculty_name: 'Faculty of Information Communication Technology',
        class_name: 'CS101-A',
        week_of_reporting: 'Week 5',
        date_of_lecture: '2024-01-15',
        course_name: 'Introduction to Programming',
        course_code: 'CS101',
        lecturer_name: user?.name || 'Dr. John Smith',
        actual_students_present: 42,
        total_registered_students: 50,
        venue: 'Room 201, ICT Building',
        scheduled_lecture_time: '10:00 AM - 12:00 PM',
        topic_taught: 'Introduction to React Hooks and State Management',
        learning_outcomes: 'Students should understand basic React hooks usage and state management concepts',
        lecturer_recommendations: 'Good participation from students. Need to cover more examples in next class.'
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData(mockReport);
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  }, [id, isEdit, user]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.faculty_name.trim()) {
      errors.faculty_name = 'Faculty name is required';
    }

    if (!formData.class_name.trim()) {
      errors.class_name = 'Class name is required';
    }

    if (!formData.week_of_reporting.trim()) {
      errors.week_of_reporting = 'Week of reporting is required';
    }

    if (!formData.date_of_lecture) {
      errors.date_of_lecture = 'Date of lecture is required';
    }

    if (!formData.course_name.trim()) {
      errors.course_name = 'Course name is required';
    }

    if (!formData.course_code.trim()) {
      errors.course_code = 'Course code is required';
    }

    if (!formData.lecturer_name.trim()) {
      errors.lecturer_name = 'Lecturer name is required';
    }

    if (!formData.actual_students_present || formData.actual_students_present < 0) {
      errors.actual_students_present = 'Actual students present is required and must be non-negative';
    }

    if (!formData.total_registered_students || formData.total_registered_students < 0) {
      errors.total_registered_students = 'Total registered students is required and must be non-negative';
    }

    if (!formData.venue.trim()) {
      errors.venue = 'Venue is required';
    }

    if (!formData.scheduled_lecture_time.trim()) {
      errors.scheduled_lecture_time = 'Scheduled lecture time is required';
    }

    if (!formData.topic_taught.trim()) {
      errors.topic_taught = 'Topic taught is required';
    }

    if (!formData.learning_outcomes.trim()) {
      errors.learning_outcomes = 'Learning outcomes is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFieldErrors({});

    if (!validateForm()) {
      setError('Please fix the form errors below');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEdit ? `${API_BASE_URL}/reports/${id}` : `${API_BASE_URL}/reports`;
      const method = isEdit ? 'put' : 'post';

      const payload = {
        ...formData,
        user_id: user?.id,
        submitted_by: user?.name || user?.email || 'Anonymous',
        status: isEdit ? undefined : 'pending'
      };

      // For frontend-only, store in localStorage
      if (!API_BASE_URL) {
        const reports = JSON.parse(localStorage.getItem('reports') || '[]');
        if (isEdit) {
          const index = reports.findIndex(r => r.id === parseInt(id));
          if (index !== -1) {
            reports[index] = { ...payload, id: parseInt(id) };
          }
        } else {
          const newId = Math.max(...reports.map(r => r.id || 0), 0) + 1;
          reports.push({ ...payload, id: newId });
        }
        localStorage.setItem('reports', JSON.stringify(reports));
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        const response = await axios[method](url, payload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.data.success) {
          throw new Error(response.data.message || `Failed to ${isEdit ? 'update' : 'create'} report`);
        }
      }

      const successMessage = isEdit ? 'Report updated successfully!' : 'Report created successfully!';
      setSuccess(successMessage);

      setTimeout(() => {
        navigate('/reports');
      }, 1500);
    } catch (error) {
      console.error('Error submitting report:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error submitting report. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const courses = [
    { value: 'CS101', label: 'CS101 - Introduction to Programming' },
    { value: 'MATH201', label: 'MATH201 - Calculus II' },
    { value: 'PHY101', label: 'PHY101 - Physics Fundamentals' },
    { value: 'ENG101', label: 'ENG101 - English Composition' }
  ];

  if (loading && isEdit) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading report data...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Lecture Report Form</h1>
        <p>Submit your weekly lecture report with all required details</p>
      </div>

      {error && (
        <div className="alert-error" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {success && (
        <div className="alert-success" style={{ marginBottom: '1rem' }}>
          {success}
        </div>
      )}

      <div className="content-card">
        {loading && isEdit ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            Loading report data...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Faculty Name *</label>
                  <input
                    type="text"
                    name="faculty_name"
                    value={formData.faculty_name}
                    onChange={handleChange}
                    className={fieldErrors.faculty_name ? 'error' : ''}
                    placeholder="Enter faculty name"
                  />
                  {fieldErrors.faculty_name && <span className="error-text">{fieldErrors.faculty_name}</span>}
                </div>

                <div className="form-group">
                  <label>Class Name *</label>
                  <input
                    type="text"
                    name="class_name"
                    value={formData.class_name}
                    onChange={handleChange}
                    className={fieldErrors.class_name ? 'error' : ''}
                    placeholder="e.g., CS101-A"
                  />
                  {fieldErrors.class_name && <span className="error-text">{fieldErrors.class_name}</span>}
                </div>

                <div className="form-group">
                  <label>Week of Reporting *</label>
                  <input
                    type="text"
                    name="week_of_reporting"
                    value={formData.week_of_reporting}
                    onChange={handleChange}
                    className={fieldErrors.week_of_reporting ? 'error' : ''}
                    placeholder="e.g., Week 5"
                  />
                  {fieldErrors.week_of_reporting && <span className="error-text">{fieldErrors.week_of_reporting}</span>}
                </div>

                <div className="form-group">
                  <label>Date of Lecture *</label>
                  <input
                    type="date"
                    name="date_of_lecture"
                    value={formData.date_of_lecture}
                    onChange={handleChange}
                    className={fieldErrors.date_of_lecture ? 'error' : ''}
                  />
                  {fieldErrors.date_of_lecture && <span className="error-text">{fieldErrors.date_of_lecture}</span>}
                </div>

                <div className="form-group">
                  <label>Course Name *</label>
                  <input
                    type="text"
                    name="course_name"
                    value={formData.course_name}
                    onChange={handleChange}
                    className={fieldErrors.course_name ? 'error' : ''}
                    placeholder="e.g., Introduction to Programming"
                  />
                  {fieldErrors.course_name && <span className="error-text">{fieldErrors.course_name}</span>}
                </div>

                <div className="form-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    name="course_code"
                    value={formData.course_code}
                    onChange={handleChange}
                    className={fieldErrors.course_code ? 'error' : ''}
                    placeholder="e.g., CS101"
                  />
                  {fieldErrors.course_code && <span className="error-text">{fieldErrors.course_code}</span>}
                </div>

                <div className="form-group">
                  <label>Lecturer's Name *</label>
                  <input
                    type="text"
                    name="lecturer_name"
                    value={formData.lecturer_name}
                    onChange={handleChange}
                    className={fieldErrors.lecturer_name ? 'error' : ''}
                    placeholder="Enter lecturer's name"
                  />
                  {fieldErrors.lecturer_name && <span className="error-text">{fieldErrors.lecturer_name}</span>}
                </div>
              </div>
            </div>

            {/* Attendance Section */}
            <div className="form-section">
              <h3>Attendance Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Actual Number of Students Present *</label>
                  <input
                    type="number"
                    name="actual_students_present"
                    value={formData.actual_students_present}
                    onChange={handleChange}
                    min="0"
                    className={fieldErrors.actual_students_present ? 'error' : ''}
                    placeholder="Enter number of students present"
                  />
                  {fieldErrors.actual_students_present && <span className="error-text">{fieldErrors.actual_students_present}</span>}
                </div>

                <div className="form-group">
                  <label>Total Number of Registered Students *</label>
                  <input
                    type="number"
                    name="total_registered_students"
                    value={formData.total_registered_students}
                    onChange={handleChange}
                    min="0"
                    className={fieldErrors.total_registered_students ? 'error' : ''}
                    placeholder="Enter total registered students"
                  />
                  {fieldErrors.total_registered_students && <span className="error-text">{fieldErrors.total_registered_students}</span>}
                </div>
              </div>
            </div>

            {/* Location & Time Section */}
            <div className="form-section">
              <h3>Location & Time</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Venue *</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className={fieldErrors.venue ? 'error' : ''}
                    placeholder="e.g., Room 201, ICT Building"
                  />
                  {fieldErrors.venue && <span className="error-text">{fieldErrors.venue}</span>}
                </div>

                <div className="form-group">
                  <label>Scheduled Lecture Time *</label>
                  <input
                    type="text"
                    name="scheduled_lecture_time"
                    value={formData.scheduled_lecture_time}
                    onChange={handleChange}
                    className={fieldErrors.scheduled_lecture_time ? 'error' : ''}
                    placeholder="e.g., 10:00 AM - 12:00 PM"
                  />
                  {fieldErrors.scheduled_lecture_time && <span className="error-text">{fieldErrors.scheduled_lecture_time}</span>}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="form-section">
              <h3>Lecture Content</h3>
              <div className="form-group">
                <label>Topic Taught *</label>
                <textarea
                  name="topic_taught"
                  value={formData.topic_taught}
                  onChange={handleChange}
                  rows="4"
                  className={fieldErrors.topic_taught ? 'error' : ''}
                  placeholder="Describe the main topic(s) covered in this lecture"
                />
                {fieldErrors.topic_taught && <span className="error-text">{fieldErrors.topic_taught}</span>}
              </div>

              <div className="form-group">
                <label>Learning Outcomes of the Topic *</label>
                <textarea
                  name="learning_outcomes"
                  value={formData.learning_outcomes}
                  onChange={handleChange}
                  rows="4"
                  className={fieldErrors.learning_outcomes ? 'error' : ''}
                  placeholder="Describe what students should learn from this topic"
                />
                {fieldErrors.learning_outcomes && <span className="error-text">{fieldErrors.learning_outcomes}</span>}
              </div>

              <div className="form-group">
                <label>Lecturer's Recommendations</label>
                <textarea
                  name="lecturer_recommendations"
                  value={formData.lecturer_recommendations}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any recommendations for future lectures or student improvement"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/reports')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Report' : 'Submit Report')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportForm;