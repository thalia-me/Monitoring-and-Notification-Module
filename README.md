# Monitoring-and-Notification-Module
The Monitoring and Notification Module is responsible for tracking and managing the progress of research projects throughout the defense process while providing real-time updates, reminders, and notifications to students, advisers, panelists, and administrators. It monitors project statuses such as adviser acceptance requests, proposal submissions, revisions, evaluations, and defense schedules through a centralized dashboard, ensuring that users are informed about important tasks, deadlines, approvals, and project developments from the beginning of the research process up to final completion.


## Tech Stack
Language: PHP / JavaScript / Python
Framework: Laravel (Backend API) / React (Frontend)
Database: MySQL

## Installation Guide

1. Navigate to the Project Directory
```cd Monitoring-and-Notification-Module

Install Backend Dependencies
```composer install

Install Frontend Dependencies
```npm install

Configure the Environment File
Create a .env file and configure the database connection.

```Example:
```DB_CONNECTION=mysql
```DB_HOST=127.0.0.1
```DB_PORT=3306
```DB_DATABASE=monitoring_module
```DB_USERNAME=root
```DB_PASSWORD= " "

Run Database Migration
```php artisan migrate

Start the Laravel Backend Server
```php artisan serve

Start the React Frontend
```npm run dev

Open the Application

```Visit: http://localhost:8081

