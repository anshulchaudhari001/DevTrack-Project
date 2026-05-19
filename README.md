🚀 DevTrack - Developer Productivity Dashboard

<div align="center">
  <img src="./screenshots/dashboard.png" alt="DevTrack Dashboard" width="900"/>
</div>

<br/>

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 📌 Overview

DevTrack is a modern full-stack MERN application designed to help developers manage tasks, track deep-work sessions, analyze productivity metrics, and monitor GitHub activity — all within a clean and responsive dashboard.

---

## 🌟 Live Demo

- **Frontend (Vercel):** https://dev-track-project.vercel.app
- **Backend (Render):** https://devtrack-project.onrender.com

---

# ✨ Features

- 🔐 Secure JWT Authentication with bcrypt password hashing
- 📋 Kanban Task Management System
- ⏱️ Deep Work Productivity Timer
- 📊 Interactive Productivity Analytics Dashboard
- 🐙 GitHub Profile & Repository Integration
- 🎨 Modern Responsive UI with Tailwind CSS
- ⚡ Fast Frontend Build using Vite

---

# 📸 Screenshots

## Dashboard Overview

<div align="center">
  <img src="./screenshots/dashboard.png" alt="Dashboard" width="90%" />
</div>

---

## Task Management & Productivity Timer

<p align="center">
  <img src="./screenshots/new-task.png" alt="Task Board" width="45%" />
  <img src="./screenshots/productivity-timer.png" alt="Productivity Timer" width="45%" />
</p>

---

## Analytics & GitHub Integration

<p align="center">
  <img src="./screenshots/analytics.png" alt="Analytics" width="45%" />
  <img src="./screenshots/github.png" alt="GitHub Integration" width="45%" />
</p>


## 🛠️ Tech Stack

**Client (Frontend)**
- React.js (Vite)
- Tailwind CSS v4
- Axios
- Recharts (Data Visualization)
- Lucide React (Icons)
- React Toastify

**Server (Backend)**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js

---

## 🚀 Getting Started (Local Development)

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (or local MongoDB server)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/devtrack.git
cd devtrack
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GITHUB_TOKEN=your_github_personal_access_token (optional, for higher rate limits)
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

The application will now be running at `http://localhost:5173`.

---

## 🏗️ Deployment

- **Frontend:** Designed to be deployed on [Vercel](https://vercel.com/). Ensure you set the `VITE_API_URL` environment variable to your live backend URL.
- **Backend:** Designed to be deployed on platforms like [Render](https://render.com/) or Railway. Ensure you add `0.0.0.0/0` to your MongoDB Network Access whitelist.

---

## 📄 License

This project is licensed under the MIT License.
