import React, { useState, useEffect } from 'react';
import './pages.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for classes
    const mockClasses = [
      {
        id: 1,
        classCode: 'CS101-LEC01',
        courseCode: 'CS101',
        className: 'Introduction to Programming',
        lecturer: 'Dr. John Smith',
        schedule: 'Mon, Wed 09:00-10:30',
        room: 'Room 101',
        enrolledStudents: 45,
        capacity: 50,
        status: 'Active'
      },
      {
        id: 2,
        classCode: 'MATH201-LEC01',
        courseCode: 'MATH201',
        className: 'Calculus II',
        lecturer: 'Prof. Sarah Johnson',
        schedule: 'Tue, Thu 10:00-11:30',
        room: 'Room 205',
        enrolledStudents: 38,
        capacity: 40,
        status: 'Active'
      },
      {
        id: 3,
        classCode: 'PHY101-LAB01',
        courseCode: 'PHY101',
        className: 'Physics Lab',
        lecturer: 'Dr. Mike Wilson',
        schedule: 'Mon, Fri 13:00-14:30',
        room: 'Physics Lab B',
        enrolledStudents: 20,
        capacity: 25,
        status: 'Active'
      },
      {
        id: 4,
        classCode: 'ENG101-LEC01',
        courseCode: 'ENG101',
        className: 'English Composition',
        lecturer: 'Dr. Emily Brown',
        schedule: 'Wed, Fri 11:00-12:30',
        room: 'Room 302',
        enrolledStudents: 35,
        capacity: 40,
        status: 'Active'
      },
      {
        id: 5,
        classCode: 'BIO101-LAB02',
        courseCode: 'BIO101',
        className: 'Biology Lab',
        lecturer: 'Dr. James Wilson',
        schedule: 'Thu 14:00-17:00',
        room: 'Bio Lab A',
        enrolledStudents: 18,
        capacity: 20,
        status: 'Full'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setClasses(mockClasses);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading classes...</p>
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
            <h1 style={{ margin: 0, color: '#2c3e50' }}>Classes</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>Manage and view all classes</p>
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
            ➕ Add New Class
          </button>
        </div>

        {/* Classes Table */}
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
                  Class Code
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Course
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
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Schedule
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Room
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'center', 
                  border: '1px solid #dee2e6',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  Enrollment
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
              {classes.map(classItem => (
                <tr key={classItem.id}>
                  <td style={{ 
                    padding: '12px 16px', 
                    fontWeight: '600', 
                    color: '#2c3e50',
                    border: '1px solid #dee2e6'
                  }}>
                    {classItem.classCode}
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    border: '1px solid #dee2e6'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{classItem.courseCode}</div>
                      <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>{classItem.className}</div>
                    </div>
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    border: '1px solid #dee2e6'
                  }}>
                    {classItem.lecturer}
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    border: '1px solid #dee2e6'
                  }}>
                    {classItem.schedule}
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    border: '1px solid #dee2e6'
                  }}>
                    {classItem.room}
                  </td>
                  <td style={{ 
                    padding: '12px 16px', 
                    textAlign: 'center',
                    border: '1px solid #dee2e6'
                  }}>
                    <div>
                      <div>{classItem.enrolledStudents}/{classItem.capacity}</div>
                      <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>
                        ({Math.round((classItem.enrolledStudents / classItem.capacity) * 100)}%)
                      </div>
                    </div>
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
                      background: classItem.status === 'Active' ? '#d4edda' : 
                                 classItem.status === 'Full' ? '#fff3cd' : '#f8d7da',
                      color: classItem.status === 'Active' ? '#155724' : 
                            classItem.status === 'Full' ? '#856404' : '#721c24'
                    }}>
                      {classItem.status}
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

        {classes.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
            <p>No classes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;