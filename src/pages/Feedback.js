import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pages.css';

const API_BASE_URL = '';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    message: '',
    type: 'general'
  });

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/feedback`);
      if (response.data.success) {
        setFeedbacks(response.data.data || response.data.feedback);
      }
    } catch (error) {
      setError('Failed to fetch feedback');
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/feedback`, newFeedback);
      if (response.data.success) {
        setNewFeedback({ title: '', message: '', type: 'general' });
        fetchFeedbacks(); // Refresh list
        alert('Feedback submitted successfully!');
      }
    } catch (error) {
      setError('Failed to submit feedback');
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Feedback & Reports</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="content-grid">
        {/* Feedback Form */}
        <div className="content-card">
          <h2>Submit Feedback</h2>
          <form onSubmit={submitFeedback}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newFeedback.title}
                onChange={(e) => setNewFeedback({...newFeedback, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={newFeedback.type}
                onChange={(e) => setNewFeedback({...newFeedback, type: e.target.value})}
              >
                <option value="general">General</option>
                <option value="technical">Technical</option>
                <option value="suggestion">Suggestion</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={newFeedback.message}
                onChange={(e) => setNewFeedback({...newFeedback, message: e.target.value})}
                required
                rows="4"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="content-card">
          <h2>Recent Feedback</h2>
          {loading ? (
            <div className="loading">Loading feedback...</div>
          ) : (
            <div className="feedback-list">
              {feedbacks.length > 0 ? (
                feedbacks.map(feedback => (
                  <div key={feedback.id} className="feedback-item">
                    <h4>{feedback.title}</h4>
                    <p>{feedback.message}</p>
                    <div className="feedback-meta">
                      <span className={`type-badge ${feedback.type}`}>
                        {feedback.type}
                      </span>
                      <span className="date">
                        {new Date(feedback.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">No feedback submitted yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;