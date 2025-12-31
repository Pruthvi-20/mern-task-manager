# 📋 MERN Task Manager

A full-stack **Task Management System** built using the **MERN Stack (MongoDB, Express, React, Node.js)** that allows users to register, login securely, and manage their daily tasks with priorities, due dates, and progress tracking.

> 🎯 **Goal:** Help users organize work efficiently and visualize task completion with a modern, interactive UI.

---

## ✨ Features

- 🔐 Secure authentication (Register & Login using JWT)
- 👤 Personalized dashboard for each user
- 📝 Create, update, delete tasks
- ✅ Mark tasks as completed / pending
- 🎯 Priority levels (Low / Medium / High)
- 📅 Due date support & overdue detection
- 📊 Visual task analytics using charts
- 📱 Responsive & modern UI using Tailwind CSS

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
Frontend | React, Tailwind CSS, Axios |
Backend | Node.js, Express.js |
Database | MongoDB (Mongoose) |
Auth | JWT (JSON Web Token), bcrypt |
Charts | Recharts / Chart.js |
Routing | React Router DOM |

---
# Folder Structure
mern-task-manager/
│
├── Backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── server.js
│
├── form/ (Frontend)
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ └── App.jsx
│ └── main.jsx
│
└── README.md

---

## 🚀 How to Run the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Pruthvi-20/MERN-Task-Manager.git
cd MERN-Task-Manager

```
### 2️⃣ Backend Setup
```
cd Backend
npm install
```
### Create a .env file inside Backend:
```
PORT=2500
MONGO_URI=mongodb://localhost:27017/TaskManager
JWT_SECRET=your_secret_key_here
```
### Go to JWT Secret Key Generator Website 
https://jwtsecrets.com/
And Generate Key
### Run backend:
npm start
Backend will run on:
👉 http://localhost:2500
### 3️⃣ Frontend Setup
Open a new terminal:
```
cd form
npm install
npm run dev
```
### Frontend will run on:
👉 http://localhost:5173

## 🔐 Authentication Flow

User registers via /register
User logs in via /login
JWT token is stored in localStorage
Dashboard and task APIs are protected using middleware

## 🧩 API Endpoints
### Authentication

| Method | Route | Description |
|--------|-------|-------------|
| POST   | /api/register | Register a new user |
| POST   | /api/login    | Login user and return JWT token |

### Tasks

| Method | Route | Description |
|--------|-------|-------------|
| GET    | /api/tasks      | Fetch all tasks for logged-in user |
| POST   | /api/tasks      | Create a new task |
| PUT    | /api/tasks/:id  | Update an existing task |
| DELETE | /api/tasks/:id  | Delete a task |



