-- For Oracle, we don't use CREATE DATABASE
-- Instead, create tables directly:

-- Create Users table
CREATE TABLE users (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    password VARCHAR2(255) NOT NULL,
    user_type VARCHAR2(50) NOT NULL CHECK (user_type IN ('student', 'lecturer', 'admin')),
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Courses table
CREATE TABLE courses (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_code VARCHAR2(50) UNIQUE NOT NULL,
    course_name VARCHAR2(255) NOT NULL,
    description CLOB,
    program_leader_id NUMBER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_leader_id) REFERENCES users(id)
);

-- Create Classes table
CREATE TABLE classes (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_id NUMBER NOT NULL,
    lecturer_id NUMBER NOT NULL,
    class_name VARCHAR2(255) NOT NULL,
    class_date DATE NOT NULL,
    start_time VARCHAR2(10) NOT NULL,
    end_time VARCHAR2(10) NOT NULL,
    room VARCHAR2(100),
    schedule_time VARCHAR2(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (lecturer_id) REFERENCES users(id)
);

-- Create Reports table
CREATE TABLE reports (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id NUMBER NOT NULL,
    title VARCHAR2(255) NOT NULL,
    description CLOB,
    report_type VARCHAR2(100) NOT NULL,
    status VARCHAR2(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (email, password, user_type, first_name, last_name) VALUES
('student@luct.com', 'password123', 'student', 'John', 'Student'),
('lecturer@luct.com', 'password123', 'lecturer', 'Dr. Smith', 'Lecturer'),
('admin@luct.com', 'password123', 'admin', 'System', 'Administrator');

-- Insert sample courses
INSERT INTO courses (course_code, course_name, description, program_leader_id) VALUES
('CS101', 'Introduction to Computer Science', 'Basic programming concepts', 2),
('MATH201', 'Advanced Mathematics', 'Calculus and linear algebra', 2);

-- Insert sample classes
INSERT INTO classes (course_id, lecturer_id, class_name, class_date, start_time, end_time, room, schedule_time) VALUES
(1, 2, 'CS101 Lecture 1', TO_DATE('2024-01-15', 'YYYY-MM-DD'), '09:00', '11:00', 'Room 101', 'Monday 9:00 AM - 11:00 AM'),
(1, 2, 'CS101 Lab 1', TO_DATE('2024-01-16', 'YYYY-MM-DD'), '14:00', '16:00', 'Lab 201', 'Tuesday 2:00 PM - 4:00 PM'),
(2, 2, 'MATH201 Lecture 1', TO_DATE('2024-01-17', 'YYYY-MM-DD'), '10:00', '12:00', 'Room 102', 'Wednesday 10:00 AM - 12:00 PM');
