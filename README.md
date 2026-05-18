# DevTrack

DevTrack is a full-stack MERN application focused on developer productivity. It combines task management, time tracking, and GitHub activity into a single comprehensive dashboard.

## Features
- **Authentication**: Secure user registration and login using JWT and bcrypt.
- **Task Management**: Kanban-style task board (Todo, In Progress, Done) with due dates and priorities.
- **Time Tracking**: Live stopwatch timer to track coding sessions, with a history log.
- **GitHub Integration**: Link your GitHub username to view profile stats and recent repositories.
- **Analytics Dashboard**: Visual charts (via Recharts) displaying tasks completed and hours tracked over the last 7 days.
- **Responsive UI**: Built with React, Vite, and Tailwind CSS (Dark Mode supported).

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS v4, React Router, Recharts, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Deployment Ready**: Fully separated client-server architecture

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas connection string)

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd DevTrack
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`
Create a \`.env\` file in the \`backend\` directory using \`.env.example\` as a template:
\`\`\`env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/devtrack
JWT_SECRET=super_secret_key
GITHUB_TOKEN=your_optional_github_token
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
\`\`\`
Create a \`.env\` file in the \`frontend\` directory using \`.env.example\` as a template:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`
Start the frontend development server:
\`\`\`bash
npm run dev
\`\`\`

## Usage
1. Open \`http://localhost:5173\` in your browser.
2. Create an account or sign in.
3. Manage your tasks in the Tasks tab.
4. Track your coding sessions in the Timer tab.
5. Search for a GitHub user in the GitHub Stats tab.
6. View your productivity trends in the Analytics tab.

## License
MIT License
