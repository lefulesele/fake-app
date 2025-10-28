import React, { useState } from 'react';
import './Rating.css';

const Rating = () => {
  const [ratings, setRatings] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = [
    {
      id: 1,
      name: 'Web Development',
      code: 'CS101',
      lecturer: 'Dr. John Smith'
    },
    {
      id: 2,
      name: 'Database Systems',
      code: 'CS201',
      lecturer: 'Prof. Sarah Johnson'
    },
    {
      id: 3,
      name: 'Business Information Technology',
      code: 'BIT301',
      lecturer: 'Dr. Michael Brown'
    },
    {
      id: 4,
      name: 'Software Engineering',
      code: 'SE401',
      lecturer: 'Dr. Emily Davis'
    }
  ];

  const handleRatingChange = (courseId, rating) => {
    setRatings(prev => ({
      ...prev,
      [courseId]: rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getRatingText = (rating) => {
    const texts = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return texts[rating] || '';
  };

  const ratedCourses = Object.keys(ratings).length;

  return (
    <div className="rating">
      <div className="rating-header">
        <h1>Rate Courses</h1>
        <p>Provide feedback and ratings for courses</p>
      </div>

      {submitted && (
        <div className="success-message">
          <h2>Thank you for your feedback!</h2>
          <p>Your ratings have been submitted successfully.</p>
        </div>
      )}

      {!submitted && (
        <>
          <div className="rating-instructions">
            <div className="instruction-card">
              <h3>Rating Instructions</h3>
              <ul>
                <li>Rate each course based on your learning experience</li>
                <li>Consider course content, teaching quality, and overall value</li>
                <li>You can rate multiple courses in one session</li>
                <li>All ratings are anonymous and help improve course quality</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="courses-rating">
              {courses.map(course => (
                <div key={course.id} className="course-rating-card">
                  <div className="course-info">
                    <h3>{course.name}</h3>
                    <p><strong>Code:</strong> {course.code}</p>
                    <p><strong>Lecturer:</strong> {course.lecturer}</p>
                  </div>
                  <div className="rating-section">
                    <label>Rate this course:</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star ${star <= (ratings[course.id] || 0) ? 'active' : ''}`}
                          onClick={() => handleRatingChange(course.id, star)}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                    {ratings[course.id] && (
                      <div className="rating-text">
                        {getRatingText(ratings[course.id])} ({ratings[course.id]} star{ratings[course.id] !== 1 ? 's' : ''})
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rating-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={ratedCourses === 0}
              >
                Submit Ratings
              </button>
              {ratedCourses > 0 && (
                <div className="rating-count">
                  You have rated {ratedCourses} course{ratedCourses !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Rating;