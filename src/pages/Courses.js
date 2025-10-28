import React, { useState, useEffect } from 'react';
import './pages.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for courses
    const mockCourses = [
      {
        id: 1,
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        department: 'Computer Science',
        credits: 3,
        semester: 'Fall 2024',
        lecturer: 'Mr latios',
        enrolledStudents: 45,
        status: 'Active'
      },
      {
        id: 2,
        courseCode: 'MATH201',
        courseName: 'Calculus II',
        department: 'Mathematics',
        credits: 4,
        semester: 'Fall 2024',
        lecturer: 'Mrs nkhahle',
        enrolledStudents: 38,
        status: 'Active'
      },
      {
        id: 3,
        courseCode: 'PHY101',
        courseName: 'Physics Fundamentals',
        department: 'Physics',
        credits: 3,
        semester: 'Fall 2024',
        lecturer: 'Dr. Mike Wilson',
        enrolledStudents: 42,
        status: 'Active'
      },
      {
        id: 4,
        courseCode: 'ENG101',
        courseName: 'English Composition',
        department: 'English',
        credits: 3,
        semester: 'Fall 2024',
        lecturer: 'Dr. Sam',
        enrolledStudents: 35,
        status: 'Active'
      },
      {
        id: 5,
        courseCode: 'BIO101',
        courseName: 'Biology Fundamentals',
        department: 'Biology',
        credits: 4,
        semester: 'Spring 2024',
        lecturer: 'Mrs molefi',
        enrolledStudents: 28,
        status: 'Completed'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, color: '#2c3e50' }}>Courses</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>Manage and view all courses</p>
          </div>
          <button
            style={{
              padding: '10px 20px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ➕ Add New Course
          </button>
        </div>

        {/* Courses Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: 'white',
            border: '1px solid #dee2e6'
          }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Course Code
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Course Name
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Department
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Lecturer
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Credits
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Students
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Status
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td style={{ 
                    padding: '12px 16px', 
                    fontWeight: '600', 
                    color: '#2c3e50',
                    border: '1px solid #dee2e6'
                  }}>
                    {course.courseCode}
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    border: '1px solid #dee2e6'
                  }}>
                    {course.courseName}
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    border: '1px solid #dee2e6'
                  }}>
                    {course.department}
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    border: '1px solid #dee2e6'
                  }}>
                    {course.lecturer}
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    textAlign: 'center',
                    border: '1px solid #dee2e6'
                  }}>
                    {course.credits}
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    textAlign: 'center',
                    border: '1px solid #dee2e6'
                  }}>
                    {course.enrolledStudents}
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    textAlign: 'center',
                    border: '1px solid #dee2e6'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      background: course.status === 'Active' ? '#d4edda' : '#f8d7da',
                      color: course.status === 'Active' ? '#155724' : '#721c24'
                    }}>
                      {course.status}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    textAlign: 'center',
                    border: '1px solid #dee2e6'
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          background: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        View
                      </button>
                      <button
                        style={{
                          padding: '6px 12px',
                          background: '#27ae60',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {courses.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
            <p>No courses found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;