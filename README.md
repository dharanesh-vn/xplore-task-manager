# Xplore Task Manager

**A simple and clean Admin & Employee Task Management System**

Built by **Dharanesh** for **Xplore Intellects** — a digital marketing company based in Coimbatore.

---

## Overview

Xplore Task Manager is a full-stack web application designed to streamline how tasks are assigned and tracked within the team at Xplore Intellects. It removes the clutter of generic project management tools by focusing strictly on what matters: registering employees, approving access, assigning tasks, and tracking progress.

Built entirely from scratch using the MERN stack (MongoDB, Express, React, Node.js), this project demonstrates a strong understanding of full-stack architecture, REST API design, secure authentication, and practical functional UI design.

## Key Features

### Role-Based Access Control
The application operates on a strict separation of concerns between two roles:
- **Admin**: Can approve/revoke employee access, assign specific tasks to individuals, and maintain a global overview of all assigned duties and their completion status.
- **Employee**: Can view their personalized task dashboard and update the status of their assigned tasks (`Pending`, `In Progress`, `Completed`).

### Secure Authentication & Approval Workflow
- Uses JSON Web Tokens (JWT) for secure session management.
- Custom authentication middleware guarantees that API routes are strictly protected based on user roles.
- **Employee Approval System**: New employees must register and wait for Admin verification before they can access the company dashboard, preventing unauthorized system entry.

### Practical UI Design
- Features a clean, straightforward, and highly functional user interface developed using standard CSS—without relying on heavy component libraries. 
- Designed with clarity in mind so users can navigate the platform naturally without any learning curve.

## Tech Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Axios
- Vanilla CSS 

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (Password Hashing)

## Installation & Setup

To run this project locally, follow these steps:

### Prerequisites
- Node.js installed on your machine
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Clone the repository
```bash
git clone https://github.com/your-username/xplore-task-manager.git
cd xplore-task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/xplore-task-manager
JWT_SECRET=your_super_secret_key
```
Start the backend server:
```bash
npm start
```
*(Note: On the very first run, the server will automatically seed a default Admin account: `admin@xplore.com` / `admin123`)*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`. 
Log in with the default admin credentials to start approving employee accounts and assigning tasks!

---

*Designed and Developed by Dharanesh.*
