# 🚀 DevTrack - Developer Productivity Dashboard

<div align="center">
  ![Dashboard](./screenshots/Dashboard.png)
</div>

DevTrack is a modern, full-stack MERN application designed to help developers manage their tasks, track their deep-work time, analyze productivity metrics, and monitor their GitHub activity all in one unified, beautiful interface.

---

## 🌟 Live Demo

- **Frontend (Vercel):** [https://dev-track-project.vercel.app](https://dev-track-project.vercel.app)
- **Backend (Render):** `https://devtrack-project.onrender.com`

---

## ✨ Features

- **🔐 Secure Authentication:** JWT-based login and registration with bcrypt password hashing.
- **📋 Kanban Task Board:** Create, edit, and organize tasks by priority (Low, Medium, High) and status (To Do, In Progress, Done).
- **⏱️ Productivity Timer:** Track deep-work sessions with a built-in stopwatch that logs history automatically.
- **📊 Interactive Analytics:** Visualize task completion rates and time-tracked over the last 7 days using Recharts.
- **🐙 GitHub Integration:** Search any GitHub username to instantly pull profile stats and popular repositories via the GitHub REST API.
- **🎨 Modern UI/UX:** Fully responsive design built with Tailwind CSS, featuring glassmorphism elements and a sleek indigo/violet theme.

---

## 📸 Screenshots

### Task Management (Kanban Board)
![New Task](./screenshots/New%20Task.png)

### Productivity Timer
![Productivity Timer](./screenshots/Productivity%20Timer.png)

### Productivity Analytics
![Analytics](./screenshots/Analytics.png)

### GitHub Integration
![GitHub](./screenshots/Github.png)

---

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
