# E-Defense Backend — Adviser Acceptance Request Prototype

Laravel 11 REST API for the Adviser Acceptance Request workflow.

## Features

- ✅ User Authentication (Register, Login, Logout)
- ✅ Adviser Acceptance Request CRUD
- ✅ Status Management (Pending, Approved, Rejected)
- ✅ Dashboard Statistics
- ✅ Notifications System
- ✅ Role-based Access Control

## Requirements

- PHP 8.2 or higher
- Composer
- MySQL 8.0 or higher
- Laravel 11

## Installation

### 1. Install Dependencies

```bash
composer install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
copy .env.example .env
```

Update the `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_defense
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Run Migrations

```bash
php artisan migrate
```

### 5. Seed Database (Optional)

```bash
php artisan db:seed
```

This will create sample users and adviser acceptance requests:

**Admin:**
- Email: `admin@unc.edu.ph`
- Password: `password123`

**Adviser:**
- Email: `maria.santos@unc.edu.ph`
- Password: `password123`

**Students:**
- Email: `juan.delacruz@student.unc.edu.ph`
- Password: `password123`
- Email: `maria.garcia@student.unc.edu.ph`
- Password: `password123`
- Email: `pedro.reyes@student.unc.edu.ph`
- Password: `password123`

### 6. Start Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout (requires auth) |
| GET | `/api/auth/me` | Get authenticated user (requires auth) |

### Adviser Acceptance Requests

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/adviser-requests` | List all requests |
| POST | `/api/adviser-requests` | Create new request |
| GET | `/api/adviser-requests/{id}` | Get single request |
| PUT | `/api/adviser-requests/{id}` | Update request details |
| PUT | `/api/adviser-requests/{id}/status` | Update request status |
| DELETE | `/api/adviser-requests/{id}` | Delete request |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics |
| GET | `/api/dashboard/recent-requests` | Get recent requests |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | List notifications |
| GET | `/api/notifications/unread-count` | Get unread count |
| PUT | `/api/notifications/{id}/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |

## Database Schema

### Users Table
- id, first_name, last_name, email, password, role, department, college, is_active, timestamps

### Adviser Acceptance Requests Table
- id, student_id, research_title, research_abstract, research_area, proposed_timeline
- adviser_name, adviser_email, adviser_department
- status, status_updated_at, status_updated_by, rejection_reason, timestamps

### Notifications Table
- id, user_id, type, title, message, is_read, timestamps

## User Roles

- **student_researcher**: Can create and manage own requests
- **adviser**: Can view and update status of requests where they are listed as adviser
- **admin**: Can view and manage all requests

## Testing with Postman/Insomnia

1. **Register/Login** to get authentication token
2. **Add token** to Authorization header: `Bearer {your_token}`
3. **Make requests** to protected endpoints

Example login request:

```json
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "juan.delacruz@student.unc.edu.ph",
  "password": "password123"
}
```

Example create request:

```json
POST http://localhost:8000/api/adviser-requests
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "research_title": "My Research Title",
  "research_abstract": "Detailed abstract...",
  "research_area": "Computer Science",
  "proposed_timeline": "12 months",
  "adviser_name": "Dr. Maria Santos",
  "adviser_email": "maria.santos@unc.edu.ph",
  "adviser_department": "Computer Science"
}
```

## CORS Configuration

The API is configured to accept requests from:
- `localhost:8081` (Expo Metro bundler)
- `127.0.0.1:8081`

Update `config/cors.php` if you need to add more origins.

## License

MIT License
