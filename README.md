# Issueflow

Issueflow is a modern, real-time issue tracking and project workflow management platform built for agile development teams. Engineered with the MERN stack (MongoDB, Express, React, Node.js) with TypeScript and powered by Socket.IO for instant live issue status synchronization.

---

## 🚀 Key Features

### 📋 Project & Issue Management
*   **Structured Projects:** Organize sprint deliverables into focused project workspaces with priorities, deadlines, and milestones.
*   **Issue Lifecycle:** Seamless status workflow transitions (`Open` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`).
*   **Priority & Filtering:** Filter issues by status, priority (`High`, `Medium`, `Low`), assigned team member, or project.
*   **Issue Codes:** Unique, readable issue identifiers (e.g., `#IF-104`) for fast team discussions.

### 👥 Role-Based Governance
*   **Admin:** Full control over project creation, issue assignment, user roles, and team administration.
*   **Team Member:** Manage assigned deliverables, transition tasks from `In Progress` to `Resolved`, and earn attendance credits.
*   **Viewer:** Read-only access to inspect project roadmaps and issue status.

### ⏱️ Automated Attendance & Performance Ledger
*   **Merit-Driven Credits:** Automatically logs verified attendance entries when Admins delegate tasks and Team Members resolve deliverables.
*   **Delivery Metrics:** Computes resolution durations and on-time completion rates visible on the personal performance dashboard.

### ⚡ Real-Time Collaboration
*   **Live Updates:** Socket.IO synchronization keeps team boards up to date across active browser tabs without manual page refreshes.

---

## 🛠️ Tech Stack

### Frontend
*   **React** (Vite)
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Fluid animations)
*   **Socket.IO Client** (Real-time events)
*   **Lucide React** (Icons)
*   **React Router DOM** (Client-side routing)

### Backend
*   **Node.js** & **Express**
*   **MongoDB** & **Mongoose** (Database)
*   **Socket.IO** (Real-time WebSocket server)
*   **JWT** (JSON Web Tokens for secure authentication)
*   **Bcryptjs** (Password hashing)

---

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v16+ recommended)
*   MongoDB (Local instance or MongoDB Atlas URI)
*   npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/hunter87ff/issueflow.git
cd issueflow
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/issueflow
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

---

## 🖥️ Usage

1. Ensure both backend (`port 5000`) and frontend (`port 5173`) are running.
2. Open `http://localhost:5173` in your browser.
3. Sign up for an account (Admins can create projects & assign issues; Team members resolve issues to earn attendance).
4. Track your team's deliverables seamlessly!
