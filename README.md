# NexKind - Comprehensive Educational & Community Platform

**NexKind** is a robust, full-stack web application designed to bridge the gap between educational resources, community engagement, and philanthropic initiatives. It serves as a centralized hub for students, teachers, and donors, facilitating meaningful interactions through course management, event organization, job listings, scholarship programs, and secure donation processing.

Built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), NexKind emphasizes performance, scalability, and a premium user experience with modern UI/UX principles.

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Directory Structure](#-directory-structure)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🔭 Project Overview

NexKind aims to democratize access to education and community support. It solves the fragmentation of educational tools by offering a single platform where:
- **Students** can learn, apply for scholarships, and find jobs.
- **Teachers** can manage their courses and track student progress.
- **Admins** can oversee the entire ecosystem.
- **Donors** can contribute to causes transparently.

The application leverages **Socket.io** for real-time capabilities and **Tailwind CSS** with **Framer Motion** for a fluid, responsive interface.

---

## ✨ Key Features

### 🌍 Public & General
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
- **Modern UI**: Glassmorphism, smooth transitions, and dark/light mode capable components.
- **Secure Authentication**: JWT-based login and registration system.
- **Chatbot Integration**: automated assistance for visitors.
- **Donation System**: Secure gateway for philanthropic contributions.

### 🎓 Student Portal
- **Dashboard**: personalized view of enrolled courses and upcoming events.
- **Course Player**: Interactive video player and content viewer for enrolled courses.
- **Applications**: Track status of scholarship and job applications.
- **Enrollment**: Easy one-click enrollment in courses and events.

### 👨‍🏫 Teacher Portal
- **Dashboard**: Analytics on course performance and student engagement.
- **Course Management**: Tools to create and update educational content. (Future Scope)

### 🛡️ Admin Portal
- **Global Dashboard**: detailed analytics on users, revenue, and platform activity.
- **User Management**: Control over student and teacher accounts.
- **Content Management**: Full CRUD capabilities for Courses, Events, Jobs, and Scholarships.
- **Message Center**: Centralized view of contact form submissions and internal messages.

---

## 💻 Technology Stack

### Frontend (Client)
| Technology | information |
| :--- | :--- |
| **React.js (v19)** | Component-based UI library. |
| **Vite** | Next-generation frontend build tool for speed. |
| **Tailwind CSS** | Utility-first CSS framework for rapid styling. |
| **Framer Motion** | Library for production-ready animations. |
| **Axios** | Promise-based HTTP client for API requests. |
| **React Router DOM** | Client-side routing for SPA feel. |
| **Lucide React** | Modern, consistent icon set. |
| **React Hot Toast** | Elegant toast notifications for user feedback. |

### Backend (Server)
| Technology | Information |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment. |
| **Express.js** | Minimalist web framework for API routes. |
| **Socket.io** | Real-time bidirectional event-based communication. |
| **Mongoose** | ODM for MongoDB interactions. |
| **JWT** | JSON Web Tokens for stateless authentication. |
| **Bcrypt.js** | Password hashing for security. |
| **Dotenv** | Environmental variable management. |
| **Cors** | Middleware for Cross-Origin Resource Sharing. |

### Database
- **MongoDB**: NoSQL database used for its flexibility with JSON-like documents.

---

## 🏗 System Architecture

The project follows a **Client-Server Architecture**:

1.  **Client**: A Single Page Application (SPA) built with React that consumes RESTful APIs. It handles all UI rendering and user interactions.
2.  **Server**: A Node.js/Express REST API that handles business logic, database operations, and authentication.
3.  **Database**: MongoDB stores all persistent data (users, courses, etc.).

---

## 📂 Directory Structure

```bash
nexKind/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets (favicons, manifest)
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── hook/               # Custom React hooks
│   │   ├── pages/              # Page components
│   │   │   ├── admin/          # Admin-specific pages (Dashboard)
│   │   │   ├── auth/           # Login/Register pages
│   │   │   ├── public/         # Public pages (Home, About, Courses, etc.)
│   │   │   ├── student/        # Student-specific pages (Dashboard, Player)
│   │   │   └── teacher/        # Teacher-specific pages
│   │   ├── App.jsx             # Main App component with Routes
│   │   └── main.jsx            # Application entry point
│   ├── .env                    # Frontend environment variables
│   └── package.json            # Frontend dependencies
│
├── server/                     # Backend Application
│   ├── config/                 # Configurations (DB connection)
│   ├── controllers/            # Logic for handling API requests
│   ├── middleware/             # Auth and Error handling middleware
│   ├── models/                 # Mongoose Database Schemas
│   ├── routes/                 # API Route definitions
│   ├── utils/                  # Helper functions (Seeder)
│   ├── .env                    # Backend environment variables
│   ├── server.js               # Server entry point
│   └── package.json            # Backend dependencies
│
└── README.md                   # Project Documentation
```

---

## 🗄 Database Schema

The comprehensive data model includes the following Mongoose collections:

-   **Users**: Stores user credentials, roles (admin, student, teacher), and profile info.
-   **Courses**: Contains course details, syllabus, instructor info, and enrollment data.
-   **Events**: Details about upcoming events, dates, locations, and registrations.
-   **Jobs**: Job listings with descriptions, requirements, and application links.
-   **Scholarships**: Scholarship criteria, amounts, and deadlines.
-   **Donations**: Records of donations made to the platform.
-   **Messages**: Contact form submissions and internal system messages.

---

## 🔗 API Documentation

Base URL: `http://localhost:5000/api`

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/auth/register` | Register a new user |
| | POST | `/auth/login` | Login user & get Token |
| **Users** | GET | `/users` | Get all users (Admin only) |
| **Courses** | GET | `/courses` | Get all courses |
| | POST | `/courses` | Create a new course (Admin/Teacher) |
| **Events** | GET | `/events` | Get all events |
| **Jobs** | GET | `/jobs` | Get job listings |
| **Scholarships** | GET | `/scholarships` | Get scholarship opportunities |

*(Note: full CRUD endpoints exist for most resources)*

---

## ⚙ Installation & Setup

### Prerequisites
-   **Node.js**: v18+ recommended.
-   **MongoDB**: Local installation or MongoDB Atlas URI.
-   **Git**: Version control system.

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd nexKind
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in `server/` with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/edurise_db
JWT_SECRET=your_super_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
```
Create a `.env` file in `client/` with:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the client:
```bash
npm run dev
```

---

## 🔐 Environment Variables

### Server (`server/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for the backend server | `5000` |
| `MONGO_URI` | Connection string for MongoDB | `mongodb://localhost...` |
| `JWT_SECRET` | Secret key for signing tokens | `secret123` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `FRONTEND_URL`| URL of the frontend (for CORS) | `http://localhost:5173` |

### Client (`client/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL for backend API calls | `http://localhost:5000/api` |

---

## 🚀 Deployment

The project is ready for deployment.

-   **Frontend**: Can be deployed to **Vercel**, **Netlify**, or **GitHub Pages**. Content of `vercel.json` is included for Vercel configuration.
-   **Backend**: Can be deployed to **Render**, **Heroku**, or **Railway**.

---

## 📄 License

This project is licensed under the **ISC License**.

---

*Verified and Documented for Final Year Project (FYP)*
