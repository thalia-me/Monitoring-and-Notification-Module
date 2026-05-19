-- E-Defense Database Schema
-- Adviser Acceptance Request Prototype

-- Create database
CREATE DATABASE IF NOT EXISTS e_defense CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE e_defense;

-- Users table
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student_researcher', 'adviser', 'admin') NOT NULL DEFAULT 'student_researcher',
    department VARCHAR(255) NOT NULL,
    college VARCHAR(255) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Adviser acceptance requests table
CREATE TABLE adviser_acceptance_requests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    research_title VARCHAR(255) NOT NULL,
    research_abstract TEXT NOT NULL,
    research_area VARCHAR(255) NOT NULL,
    proposed_timeline VARCHAR(255) NOT NULL,
    adviser_name VARCHAR(255) NOT NULL,
    adviser_email VARCHAR(255) NOT NULL,
    adviser_department VARCHAR(255) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    status_updated_at TIMESTAMP NULL,
    status_updated_by BIGINT UNSIGNED NULL,
    rejection_reason TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (status_updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_student_status (student_id, status),
    INDEX idx_status (status),
    INDEX idx_adviser_email (adviser_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications table
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    type ENUM('status_change', 'reminder', 'deadline') NOT NULL DEFAULT 'status_change',
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read),
    INDEX idx_user_created (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Personal access tokens table (Laravel Sanctum)
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    abilities TEXT NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_tokenable (tokenable_type, tokenable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Password reset tokens table
CREATE TABLE password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions table
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT NOT NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_last_activity (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample users
INSERT INTO users (first_name, last_name, email, password, role, department, college, created_at, updated_at) VALUES
('Admin', 'User', 'admin@unc.edu.ph', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Administration', 'University Administration', NOW(), NOW()),
('Dr. Maria', 'Santos', 'maria.santos@unc.edu.ph', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'adviser', 'Computer Science', 'College of Engineering', NOW(), NOW()),
('Juan', 'Dela Cruz', 'juan.delacruz@student.unc.edu.ph', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student_researcher', 'Computer Science', 'College of Engineering', NOW(), NOW()),
('Maria', 'Garcia', 'maria.garcia@student.unc.edu.ph', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student_researcher', 'Information Technology', 'College of Engineering', NOW(), NOW()),
('Pedro', 'Reyes', 'pedro.reyes@student.unc.edu.ph', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student_researcher', 'Computer Science', 'College of Engineering', NOW(), NOW());

-- Note: All passwords are 'password123' (hashed with bcrypt)

-- Insert sample adviser acceptance requests
INSERT INTO adviser_acceptance_requests (student_id, research_title, research_abstract, research_area, proposed_timeline, adviser_name, adviser_email, adviser_department, status, created_at, updated_at) VALUES
(3, 'Machine Learning Applications in Healthcare Diagnostics', 'This research explores the application of machine learning algorithms in improving the accuracy and efficiency of healthcare diagnostic systems. The study focuses on developing predictive models for early disease detection.', 'Artificial Intelligence', '12 months (January 2025 - December 2025)', 'Dr. Maria Santos', 'maria.santos@unc.edu.ph', 'Computer Science', 'pending', NOW(), NOW()),
(4, 'Blockchain Technology for Secure Academic Records Management', 'This study investigates the implementation of blockchain technology to create a secure, transparent, and tamper-proof system for managing academic records in educational institutions.', 'Blockchain & Security', '10 months (February 2025 - November 2025)', 'Dr. Maria Santos', 'maria.santos@unc.edu.ph', 'Computer Science', 'approved', DATE_SUB(NOW(), INTERVAL 5 DAY), NOW()),
(5, 'IoT-Based Smart Campus Monitoring System', 'Development of an Internet of Things (IoT) based monitoring system for campus facilities, including energy consumption tracking, security monitoring, and environmental condition management.', 'Internet of Things', '14 months (March 2025 - April 2026)', 'Dr. Maria Santos', 'maria.santos@unc.edu.ph', 'Computer Science', 'rejected', DATE_SUB(NOW(), INTERVAL 10 DAY), NOW());

-- Update status fields for approved and rejected requests
UPDATE adviser_acceptance_requests 
SET status_updated_at = DATE_SUB(NOW(), INTERVAL 5 DAY), status_updated_by = 2 
WHERE id = 2;

UPDATE adviser_acceptance_requests 
SET status_updated_at = DATE_SUB(NOW(), INTERVAL 10 DAY), 
    status_updated_by = 2,
    rejection_reason = 'The proposed scope is too broad for the given timeline. Please narrow down the focus to specific aspects of campus monitoring.'
WHERE id = 3;
