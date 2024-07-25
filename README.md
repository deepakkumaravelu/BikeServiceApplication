# Bike Service Booking Application

## Overview

This project is a service booking platform where users can register, view available services, and make bookings. Admins have the ability to manage services, including adding, updating, and deleting them. Notifications are sent via email to both users and service owners regarding the status of bookings and service updates.

## Technologies Used

- **Frontend:** React with Bootstrap
- **Backend:** Node.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** Bcrypt
- **Email Service:** Nodemailer

## Features

- **User Functionality:**

  - Register and log in.
  - View a list of services.
  - Select a service to book.
  - View the location and status of the booked service.
  - Receive email notifications about the status of the booking.

- **Admin Functionality:**
  - Register and log in.
  - Add, update, and delete services.
  - View and update the status of services selected by users.
  - Receive email notifications when a service status is updated.

## Project Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- npm or Yarn (for managing JavaScript packages)

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   cd backend
   npm install
   ```

## create .env
- JWT_SECRET=your_jwt_secret
- MONGO_URI=your_mongodb_uri
- EMAIL_USER=your_email@example.com
- EMAIL_PASS=your_email_password



## Frontend Setup
- Navigate to the Frontend Directory
- cd frontend
- npm install
  Or, if you prefer Yarn:
- yarn install

## Run the React Development Server:
- npm start
Or, if you prefer Yarn:
- yarn start
The React development server will start and open the application in your default web browser, typically at http://localhost:5173 as it is an vite project.

## Usage
## User Registration and Login:
- Navigate to the registration page to create an account.
- Log in using your credentials to access the service listing and booking functionalities.

## Admin Dashboard:
- Admins can log in to access service management features.
- Add, update, and delete services from the admin panel.

## Booking Services:
- Users can select a service to book and view its status and location.
- Email Notifications
- Service Selection: An email will be sent to the service owner when a user selects their service.
- Service Status Updates: Users will receive emails when the service status is updated (e.g., pending, canceled, or completed).
